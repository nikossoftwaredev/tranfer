"use server";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  pickupLocation:
    | {
        label: string;
        value: string;
        description?: string;
        coordinates?: string;
      }
    | undefined;
  dropoffLocation:
    | {
        label: string;
        value: string;
        description?: string;
        coordinates?: string;
      }
    | undefined;
  date: Date | undefined;
  time: string;
  isoDateTime?: string;
  passengers: string;
  luggage: string;
  childSeats: string;
  flightNumber: string;
  notes: string;
  selectedTour: string;
  vehicle: string;
  bookingType?: string;
}

export async function sendTelegramMessage(formData: FormData) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_IDS = ["2128860501", "6416185160"];

  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Telegram credentials not configured");
  }

  // Format the date and time in a clear, readable format
  let formattedDate = "Not specified";
  let formattedTime = formData.time || "Not specified";
  // First check if isoDateTime was passed directly from the form
  let isoDateTime = formData.isoDateTime || "Not specified";

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

  // Helper function to create copiable text blocks
  const makeCopiable = (value: string): string => {
    // Use inline code formatting for simple values
    return `\`${value}\``;
  };

  // Make sure pickup location is properly accessed
  const pickupLabel = formData.pickupLocation?.label || "Not specified";
  const pickupCoordinates =
    formData.pickupLocation?.coordinates || "Not available";
  const dropoffLabel = formData.dropoffLocation?.label || "Not specified";
  const dropoffCoordinates =
    formData.dropoffLocation?.coordinates || "Not available";

  // Construct the message with copiable text fields
  const message = `
🚗 *New Booking Request*

*Personal Information:*
👤 Name: ${makeCopiable(formData.fullName)}
📧 Email: ${makeCopiable(formData.email)}
📞 Phone: ${makeCopiable(formData.countryCode + formData.phone)}

*Trip Details:*
📍 Pickup Location: ${makeCopiable(pickupLabel)}
📍 Pickup Coordinates: ${makeCopiable(pickupCoordinates)}
🏁 Dropoff Location: ${makeCopiable(dropoffLabel)}
🏁 Dropoff Coordinates: ${makeCopiable(dropoffCoordinates)}
📅 Date: ${makeCopiable(formattedDate)}
⏰ Time: ${makeCopiable(formattedTime)}

*Additional Information:*
👥 Passengers: ${makeCopiable(formData.passengers)}
🧳 Luggage: ${makeCopiable(formData.luggage)}
👶 Child Seats: ${makeCopiable(formData.childSeats)}
✈️ Flight Number: ${makeCopiable(formData.flightNumber || "Not specified")}
🚗 Vehicle: ${makeCopiable(formData.vehicle)}
📋 Booking Type: ${makeCopiable(formData.bookingType || "Regular Transfer")}

*Tour Selection:*
${
  formData.selectedTour
    ? `🏛️ Selected Tour: ${makeCopiable(formData.selectedTour)}`
    : "No specific tour selected"
}

*Notes:*
\`\`\`
${formData.notes || "No additional notes"}
\`\`\`
`;

  try {
    for (const chatId of TELEGRAM_CHAT_IDS) {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to send message to Telegram: ${JSON.stringify(errorData)}`
        );
      }
    }

    return { success: true };
  } catch (error) {
    // No need to log, just re-throw
    throw error;
  }
}
