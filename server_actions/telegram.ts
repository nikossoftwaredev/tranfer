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

export async function sendTelegramBookingMessage(formData: BookingFormState) {
  // Format the date and time in a clear, readable format
  let formattedDate = "Not specified";
  let formattedTime = formData.time || "Not specified";
  // First check if isoDateTime was passed directly from the form
  let isoDateTime = "Not specified";

  if (formData.date) {
    const date = new Date(formData.date);

    // Format date in a clear format
    formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Handle time if provided
    if (formData.time && formData.time.includes(":")) {
      const [hours, minutes] = formData.time.split(":");

      if (hours && minutes) {
        try {
          const hoursInt = parseInt(hours, 10);
          const minutesInt = parseInt(minutes, 10);

          // Validate the parsed values
          if (
            !isNaN(hoursInt) &&
            !isNaN(minutesInt) &&
            hoursInt >= 0 &&
            hoursInt < 24 &&
            minutesInt >= 0 &&
            minutesInt < 60
          ) {
            date.setHours(hoursInt, minutesInt, 0, 0);

            // Format time in 24-hour format
            formattedTime = date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            // Only create ISO format if not already provided
            if (isoDateTime === "Not specified") {
              isoDateTime = date.toISOString();
            }
          }
        } catch {
          // In case of error, fallback to default time
          date.setHours(12, 0, 0, 0);
          formattedTime = "12:00";

          if (isoDateTime === "Not specified") {
            isoDateTime = date.toISOString();
          }
        }
      } else {
        // If time format is invalid, set to noon by default
        date.setHours(12, 0, 0, 0);
        formattedTime = "12:00";

        // Only create ISO format if not already provided
        if (isoDateTime === "Not specified") {
          isoDateTime = date.toISOString();
        }
      }
    }
  }

  // Make sure pickup location is properly accessed
  let pickupLabel = "Not specified";
  let pickupCoordinates = "";

  if (formData.pickupLocation) {
    pickupLabel =
      formData.pickupLocation.structured_formatting?.main_text ||
      formData.pickupLocation.description ||
      "Not specified";

    // More robust check for coordinates
    if (
      formData.pickupLocation.coordinates &&
      typeof formData.pickupLocation.coordinates === "object" &&
      "lat" in formData.pickupLocation.coordinates &&
      "lng" in formData.pickupLocation.coordinates &&
      formData.pickupLocation.coordinates.lat !== undefined &&
      formData.pickupLocation.coordinates.lng !== undefined
    ) {
      pickupCoordinates = `${formData.pickupLocation.coordinates.lat},${formData.pickupLocation.coordinates.lng}`;
    } else if (typeof formData.pickupLocation.coordinates === "string") {
      // Handle case where coordinates might be a string
      pickupCoordinates = formData.pickupLocation.coordinates;
    }
  }

  let dropoffLabel = "Not specified";
  let dropoffCoordinates = "";

  if (formData.dropoffLocation) {
    dropoffLabel =
      formData.dropoffLocation.structured_formatting?.main_text ||
      formData.dropoffLocation.description ||
      "Not specified";

    // More robust check for coordinates
    if (
      formData.dropoffLocation.coordinates &&
      typeof formData.dropoffLocation.coordinates === "object" &&
      "lat" in formData.dropoffLocation.coordinates &&
      "lng" in formData.dropoffLocation.coordinates &&
      formData.dropoffLocation.coordinates.lat !== undefined &&
      formData.dropoffLocation.coordinates.lng !== undefined
    ) {
      dropoffCoordinates = `${formData.dropoffLocation.coordinates.lat},${formData.dropoffLocation.coordinates.lng}`;
    } else if (typeof formData.dropoffLocation.coordinates === "string") {
      // Handle case where coordinates might be a string
      dropoffCoordinates = formData.dropoffLocation.coordinates;
    }
  }

  // Debug info in console (will only show in server logs)
  console.log("Pickup location:", formData.pickupLocation);
  console.log("Dropoff location:", formData.dropoffLocation);

  // Create Google Maps links if coordinates are available
  const pickupMapsLink = pickupCoordinates
    ? `[View on Google Maps](https://www.google.com/maps?q=${pickupCoordinates})`
    : "No coordinates available";

  const dropoffMapsLink = dropoffCoordinates
    ? `[View on Google Maps](https://www.google.com/maps?q=${dropoffCoordinates})`
    : "No coordinates available";

  // Construct the message with copiable text fields
  const message = `
🚗 *New Booking Request*

*Personal Information:*
👤 Name: ${makeCopiable(formData.fullName)}
📧 Email: ${makeCopiable(formData.email)}
📞 Phone: ${makeCopiable(formData.countryCode + formData.phone)}
${formData.passport ? `🪪 Passport: ${makeCopiable(formData.passport)}` : ""}

*Trip Details:*
📍 *Pickup:* ${makeCopiable(pickupLabel)}
   ${pickupMapsLink}
   
🏁 *Dropoff:* ${makeCopiable(dropoffLabel)}
   ${dropoffMapsLink}
   
📅 Date: ${makeCopiable(formattedDate)}
⏰ Time: ${makeCopiable(formattedTime)}

*Additional Information:*
👥 Passengers: ${makeCopiable(formData.passengers)}
🧳 Luggage: ${makeCopiable(formData.luggage)}
👶 Child Seats: ${makeCopiable(formData.childSeats)}
✈️ Flight Number: ${makeCopiable(formData.flightNumber || "Not specified")}
🚗 Vehicle: ${makeCopiable(formData.selectedVehicle)}
📋 Booking Type: ${makeCopiable("Regular Transfer")}

*Tour Selection:*
${formData.selectedTour ? `🏛️ Selected Tour: ${makeCopiable(formData.selectedTour)}` : "No specific tour selected"}

*Notes:*
\`\`\`
${formData.notes || "No additional notes"}
\`\`\`
`;

  return sendToTelegram(message);
}
