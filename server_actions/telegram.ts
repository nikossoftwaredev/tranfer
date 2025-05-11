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
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("Telegram bot token or chat ID is missing");
      return {
        success: false,
        message: "Telegram configuration is missing",
      };
    }

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

    // Create message text
    const messageText = `
🚨 NEW BOOKING 🚨

👤 Customer: ${formData.fullName}
✉️ Email: ${formData.email}
📱 Phone: ${formData.countryCode} ${formData.phone}
${formData.passport ? `🛂 Passport: ${formData.passport}` : ""}

📍 From: ${pickupLocation}
📍 To: ${dropoffLocation}
🗓️ Date: ${formattedDate}
⏰ Time: ${formData.time || "Not specified"}

${isTourBooking ? `🏛️ Tour: ${formData.selectedTour}` : ""}
${isTourBooking ? `🎭 Tour Guide: ${tourGuideInfo}` : ""}

👥 Passengers: ${formData.passengers}
🧳 Luggage: ${formData.luggage}
👶 Child Seats: ${formData.childSeats}
✈️ Flight: ${formData.flightNumber || "Not specified"}
🚘 Vehicle: ${formData.selectedVehicle || "Not specified"}

${formData.notes ? `📝 Notes: ${formData.notes}` : ""}
`;

    // Send message
    const telegramApiUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Failed to send Telegram message:", data);
      return {
        success: false,
        message: "Failed to send Telegram notification",
      };
    }

    return {
      success: true,
      message: "Telegram notification sent successfully",
    };
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return {
      success: false,
      message: "Failed to send Telegram notification",
    };
  }
};
