"use server";

import { BookingFormState } from "../contexts/BookingWizardContext";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Common function to send messages to telegram
const sendToTelegram = async (message: string) => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_IDS = ["2128860501", "6416185160"];

  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram credentials not configured");
  }

  try {
    for (const chatId of TELEGRAM_CHAT_IDS) {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send message to Telegram: ${JSON.stringify(errorData)}`);
      }
    }

    return { success: true };
  } catch (error) {
    // No need to log, just re-throw
    throw error;
  }
};

// Helper function to create copiable text blocks
const makeCopiable = (value: string): string => {
  // Use inline code formatting for simple values
  return `\`${value}\``;
};

export async function sendTelegramContactMessage(formData: ContactFormData) {
  // Construct the message with copiable text fields
  const message = `
💬 *New Contact Form Submission*

*Contact Information:*
👤 Name: ${makeCopiable(formData.name)}
📧 Email: ${makeCopiable(formData.email)}

*Message:*
\`\`\`
${formData.message}
\`\`\`
`;

  return sendToTelegram(message);
}

export const sendTelegramBookingMessage = async (formData: BookingFormState) => {
  try {
    // Format date for display
    let formattedDate = "Not specified";
    if (formData.date) {
      const date = new Date(formData.date);
      formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    // Get location names
    const pickupLocation = formData.pickupLocation?.structured_formatting?.main_text || "Not specified";
    const dropoffLocation = formData.dropoffLocation?.structured_formatting?.main_text || "Not specified";

    // Determine if this is a tour booking
    const isTourBooking = !!formData.selectedTour;
    const tourGuideInfo = isTourBooking && formData.includeGuide ? "Yes (Professional licensed guide)" : "No";

    // Create message text in markdown format (compatible with sendToTelegram)
    const messageText = `
🚨 *NEW BOOKING* 🚨

👤 Customer: ${makeCopiable(formData.fullName)}
✉️ Email: ${makeCopiable(formData.email)}
📱 Phone: ${makeCopiable(`${formData.countryCode} ${formData.phone}`)}
${formData.passport ? `🛂 Passport: ${makeCopiable(formData.passport)}` : ""}

📍 From: ${makeCopiable(pickupLocation)}
📍 To: ${makeCopiable(dropoffLocation)}
🗓️ Date: ${makeCopiable(formattedDate)}
⏰ Time: ${makeCopiable(formData.time || "Not specified")}

${isTourBooking ? `🏛️ Tour: ${makeCopiable(formData.selectedTour)}` : ""}
${isTourBooking ? `🎭 Tour Guide: ${makeCopiable(tourGuideInfo)}` : ""}

👥 Passengers: ${makeCopiable(formData.passengers)}
🧳 Luggage: ${makeCopiable(formData.luggage)}
👶 Child Seats: ${makeCopiable(formData.childSeats)}
✈️ Flight: ${makeCopiable(formData.flightNumber || "Not specified")}
🚘 Vehicle: ${makeCopiable(formData.selectedVehicle || "Not specified")}

${formData.notes ? `📝 Notes:\n\`\`\`\n${formData.notes}\n\`\`\`` : ""}
`;

    // Use the existing sendToTelegram function
    await sendToTelegram(messageText);

    return {
      success: true,
      message: "Telegram notification sent successfully",
    };
  } catch (error) {
    console.error("Error sending Telegram booking message:", error);
    return {
      success: false,
      message: "Failed to send Telegram notification",
    };
  }
};
