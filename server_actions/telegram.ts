"use server";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  pickupLocation: {
    label: string;
    value: string;
    description?: string;
  } | undefined;
  date: Date | undefined;
  time: string;
  passengers: string;
  luggage: string;
  childSeats: string;
  flightNumber: string;
  notes: string;
  selectedTour: string;
  vehicle: string;
}

export async function sendTelegramMessage(formData: FormData) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_IDS = ["2128860501", "6416185160"];

  if (!TELEGRAM_BOT_TOKEN ) {
    throw new Error("Telegram credentials not configured");
  }

  // Format the date
  const formattedDate = formData.date 
    ? new Date(formData.date).toLocaleDateString()
    : "Not specified";

  // Construct the message
  const message = `
🚗 *New Booking Request*

*Personal Information:*
👤 Name: ${formData.fullName}
📧 Email: ${formData.email}
📞 Phone: ${formData.countryCode}${formData.phone}

*Trip Details:*
📍 Pickup Location: ${formData.pickupLocation?.label || "Not specified"}
📅 Date: ${formattedDate}
⏰ Time: ${formData.time || "Not specified"}

*Additional Information:*
👥 Passengers: ${formData.passengers}
🧳 Luggage: ${formData.luggage}
👶 Child Seats: ${formData.childSeats}
✈️ Flight Number: ${formData.flightNumber || "Not specified"}
🚗 Vehicle: ${formData.vehicle}

*Tour Selection:*
${formData.selectedTour ? `🏛️ Selected Tour: ${formData.selectedTour}` : "No specific tour selected"}

*Notes:*
${formData.notes || "No additional notes"}
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
        throw new Error("Failed to send message to Telegram");
      }
    }

    

    return { success: true };
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    throw error;
  }
} 