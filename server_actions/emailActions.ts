"use server";

import nodemailer from "nodemailer";
import { EMAIL } from "@/lib/data/config";

type SendEmailParams = {
  to: string;
  subject: string;
  body: string;
  html?: string;
  attachments?: {
    filename?: string;
    content?: Buffer | string;
    contentType?: string;
  }[];
};

// Create a nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

/**
 * Sends an email using nodemailer with Gmail
 *
 * @param params Object containing email recipient, subject, body content, and optional HTML/attachments
 * @returns Promise resolving to success boolean and message
 */
const sendEmail = async (params: SendEmailParams) => {
  try {
    const { to, subject, body, html, attachments } = params;

    // Send email using nodemailer
    await transporter.sendMail({
      from: "kratisix@gmail.com",
      to,
      subject,
      text: body,
      html: html || body.replace(/\n/g, "<br>"),
      attachments,
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
};

/**
 * Generates Google Calendar link
 *
 * @param booking The booking data with related information
 * @returns string URL to add event to Google Calendar
 */
const generateGoogleCalendarLink = (booking: {
  timeSlot: {
    startTime: Date;
    endTime: Date;
    business: {
      name: string;
      location?: string | null;
    };
  };
  notes?: string | null;
}): string => {
  try {
    // Create valid date objects by combining booking date with time slot times
    const startDate = new Date(booking.timeSlot.startTime);
    const endDate = new Date(booking.timeSlot.endTime);

    // Ensure valid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date values");
    }

    const startTimeStr = startDate.toISOString().replace(/-|:|\.\d+/g, "");
    const endTimeStr = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const details = encodeURIComponent(booking.notes || "No additional notes");
    const location = encodeURIComponent(booking.timeSlot.business.location || "");
    const title = encodeURIComponent(`Appointment at ${booking.timeSlot.business.name}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeStr}/${endTimeStr}&details=${details}&location=${location}&sf=true&output=xml`;
  } catch (error) {
    console.error("Error generating Google Calendar link:", error);
    // Return a fallback link that doesn't include dates
    const title = encodeURIComponent(`Appointment at ${booking.timeSlot.business.name}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`;
  }
};

/**
 * Sends a booking confirmation email to a user
 *
 * @param bookingId The ID of the booking to send confirmation for
 * @returns Promise resolving to success boolean and message
 */
export const sendBookingConfirmationEmail = async (bookingId: string) => {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return {
        success: false,
        message: "Unauthorized access: You must be logged in.",
      };
    }

    // Fetch the booking with related data
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        timeSlot: {
          include: {
            business: true,
          },
        },
      },
    });

    if (!booking) {
      return {
        success: false,
        message: "Booking not found",
      };
    }

    // Format date and time for the email
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString();

    // Format the time for display
    const formattedTime =
      booking.timeSlot.startTime + (booking.timeSlot.endTime ? ` - ${booking.timeSlot.endTime}` : "");

    // Get hours and minutes from time string (format: HH:MM)
    const [bookingHours, bookingMinutes] = booking.timeSlot.startTime.split(":").map(Number);

    // Create proper date objects for calendar by combining booking date with time slot times
    const startDateTime = new Date(bookingDate);
    startDateTime.setHours(bookingHours, bookingMinutes, 0, 0);

    const endDateTime = new Date(startDateTime);
    if (booking.timeSlot.endTime) {
      const [endHours, endMinutes] = booking.timeSlot.endTime.split(":").map(Number);
      endDateTime.setHours(endHours, endMinutes, 0, 0);
    } else {
      // Default to 1-hour appointment if no end time
      endDateTime.setHours(endDateTime.getHours() + 1);
    }

    // Ensure we have valid Date objects for the calendar link
    const calendarLinkData = {
      timeSlot: {
        startTime: startDateTime,
        endTime: endDateTime,
        business: {
          name: booking.timeSlot.business.name,
          location: booking.timeSlot.business.description, // Using description as location since there's no address field
        },
      },
      notes: booking.notes,
    };

    // Generate calendar link
    const googleCalendarLink = generateGoogleCalendarLink(calendarLinkData);

    // Build plain text email content (fallback)
    const subject = `Booking Confirmation: ${booking.timeSlot.business.name}`;
    const body = `
      Dear ${booking.user.name},
      
      Your booking has been confirmed!
      
      Details:
      - Business: ${booking.timeSlot.business.name}
      - Date: ${formattedDate}
      - Time: ${formattedTime}
      ${booking.timeSlot.price ? `- Price: €${booking.timeSlot.price}` : ""}
      ${booking.notes ? `- Notes: ${booking.notes}` : ""}
      
      Thank you for using our service!
      
      If you need to cancel or reschedule, please contact us.
    `;

    // Build HTML email content with better styling and logo
    const businessLogoUrl = booking.timeSlot.business.logoUrl || "https://placehold.co/200x100?text=Logo";

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #eaeaea;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
        }
        .logo {
          max-width: 200px;
          max-height: 100px;
        }
        .booking-details {
          padding: 20px 0;
        }
        .detail-row {
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          color: #555;
        }
        .calendar-buttons {
          margin: 25px 0;
          text-align: center;
        }
        .button {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eaeaea;
          color: #777;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${businessLogoUrl}" alt="${booking.timeSlot.business.name} Logo" class="logo">
          <h1>Booking Confirmation</h1>
        </div>
        
        <div class="booking-details">
          <p>Dear ${booking.user.name},</p>
          
          <p>Your booking has been <strong>confirmed</strong>!</p>
          
          <div class="detail-row">
            <span class="detail-label">Business:</span> ${booking.timeSlot.business.name}
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Date:</span> ${formattedDate}
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Time:</span> ${formattedTime}
          </div>
          
          ${
            booking.timeSlot.price
              ? `
          <div class="detail-row">
            <span class="detail-label">Price:</span> €${booking.timeSlot.price}
          </div>
          `
              : ""
          }
          
          ${
            booking.notes
              ? `
          <div class="detail-row">
            <span class="detail-label">Notes:</span> ${booking.notes}
          </div>
          `
              : ""
          }
        </div>
        
        <div class="calendar-buttons">
          <a href="${googleCalendarLink}" class="button" target="_blank">Add to Google Calendar</a>
        </div>
        
        <p>Thank you for using our service!</p>
        
        <p>If you need to cancel or reschedule, please contact us.</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${booking.timeSlot.business.name}. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send the email with HTML
    return await sendEmail({
      to: booking.user.email!,
      subject,
      body,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    return {
      success: false,
      message: "Failed to send booking confirmation email",
    };
  }
};

/**
 * Sends a booking notification email to the business owner
 *
 * @param bookingId The ID of the booking to notify about
 * @returns Promise resolving to success boolean and message
 */
export const sendBusinessOwnerNotificationEmail = async (bookingId: string) => {
  try {
    // Fetch the booking with related data
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        timeSlot: {
          include: {
            business: {
              include: {
                owner: true,
              },
            },
          },
        },
      },
    });

    if (!booking || !booking.timeSlot.business.owner?.email) {
      return {
        success: false,
        message: "Booking not found or business owner has no email",
      };
    }

    // Format date and time for the email
    const bookingDate = new Date(booking.date);
    const formattedDate = bookingDate.toLocaleDateString();
    const formattedTime =
      booking.timeSlot.startTime + (booking.timeSlot.endTime ? ` - ${booking.timeSlot.endTime}` : "");

    // Build email content
    const subject = `New Booking: ${booking.user.name} on ${formattedDate}`;
    const body = `
      Dear ${booking.timeSlot.business.owner.name},
      
      You have a new booking!
      
      Customer Details:
      - Name: ${booking.user.name}
      - Email: ${booking.user.email}
      - Phone: ${booking.user.phone || "Not provided"}
      
      Booking Details:
      - Date: ${formattedDate}
      - Time: ${formattedTime}
      ${booking.timeSlot.price ? `- Price: €${booking.timeSlot.price}` : ""}
      ${booking.notes ? `- Notes: ${booking.notes}` : ""}
      
      This booking has been automatically confirmed.
      You can view and manage all bookings from your admin dashboard.
    `;

    // HTML version of the email
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #eaeaea;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 2px solid #f0f0f0;
          background-color: #f9f9f9;
        }
        .booking-details {
          padding: 20px 0;
        }
        .customer-details {
          padding: 20px 0;
          background-color: #f5f5f5;
          border-radius: 6px;
          margin-bottom: 20px;
          padding: 15px;
        }
        .detail-row {
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          color: #555;
        }
        .highlight {
          color: #4285F4;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eaeaea;
          color: #777;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Notification</h1>
        </div>
        
        <div class="booking-details">
          <p>Dear ${booking.timeSlot.business.owner.name},</p>
          
          <p>You have a <span class="highlight">new booking</span>!</p>
          
          <div class="customer-details">
            <h3>Customer Details</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span> ${booking.user.name}
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span> ${booking.user.email}
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span> ${booking.user.phone || "Not provided"}
            </div>
          </div>
          
          <h3>Booking Details</h3>
          <div class="detail-row">
            <span class="detail-label">Date:</span> ${formattedDate}
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Time:</span> ${formattedTime}
          </div>
          
          ${
            booking.timeSlot.price
              ? `
          <div class="detail-row">
            <span class="detail-label">Price:</span> €${booking.timeSlot.price}
          </div>
          `
              : ""
          }
          
          ${
            booking.notes
              ? `
          <div class="detail-row">
            <span class="detail-label">Notes:</span> ${booking.notes}
          </div>
          `
              : ""
          }
        </div>
        
        <p>This booking has been automatically confirmed.</p>
        <p>You can view and manage all bookings from your admin dashboard.</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Booking Service. All rights reserved.</p>
          <p>This is an automated message, please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send the email with HTML
    return await sendEmail({
      to: booking.timeSlot.business.owner.email,
      subject,
      body,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Failed to send business owner notification email:", error);
    return {
      success: false,
      message: "Failed to send business owner notification email",
    };
  }
};
