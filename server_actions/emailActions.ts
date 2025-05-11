"use server";

import nodemailer from "nodemailer";
import { BookingFormState } from "../contexts/BookingWizardContext";
import { EMAIL, PHONE_NUMBER } from "../lib/data/config";

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
  secure: false,
  auth: {
    user: EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

/**
 * Sends an email using nodemailer with Gmail
 */
const sendEmail = async (params: SendEmailParams) => {
  try {
    const { to, subject, body, html, attachments } = params;

    // Send email using nodemailer
    await transporter.sendMail({
      from: `"Transfer Service" <${EMAIL}>`,
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
 * Sends a booking confirmation email to the customer
 */
export const sendBookingConfirmationEmail = async (formData: BookingFormState) => {
  try {
    if (!formData.email) {
      return {
        success: false,
        message: "Customer email is required",
      };
    }

    // Format date for display
    let formattedDate = "Not specified";
    if (formData.date) {
      const date = new Date(formData.date);
      formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    // Get location names
    const pickupLocation = formData.pickupLocation?.structured_formatting?.main_text || "Not specified";
    const dropoffLocation = formData.dropoffLocation?.structured_formatting?.main_text || "Not specified";

    // Create WhatsApp link (remove spaces and non-numeric characters except +)
    const whatsappNumber = PHONE_NUMBER.replace(/\s+/g, "");
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // Get tour name if tour booking
    const isTourBooking = !!formData.selectedTour;
    const tourGuideInfo = isTourBooking && formData.includeGuide ? "Yes (Professional licensed guide included)" : "No";

    // Build plain text email content (fallback)
    const subject = `Transfer Booking Confirmation`;
    const body = `
      Dear ${formData.fullName},
      
      Your transfer booking has been confirmed!
      
      Trip Details:
      - From: ${pickupLocation}
      - To: ${dropoffLocation}
      - Date: ${formattedDate}
      - Time: ${formData.time || "Not specified"}
      ${isTourBooking ? `- Tour: ${formData.selectedTour}` : ""}
      ${isTourBooking ? `- Tour Guide: ${formData.includeGuide ? "Yes" : "No"}` : ""}
      
      Additional Information:
      - Passengers: ${formData.passengers}
      - Luggage: ${formData.luggage}
      - Child Seats: ${formData.childSeats}
      - Flight Number: ${formData.flightNumber || "Not specified"}
      - Vehicle: ${formData.selectedVehicle || "Standard"}
      
      ${formData.notes ? `Notes: ${formData.notes}` : ""}
      
      Thank you for choosing our service!
      
      If you need to make any changes to your booking, please contact us at ${PHONE_NUMBER} or via WhatsApp at ${whatsappLink}.
    `;

    // Build HTML email content with better styling
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Transfer Booking Confirmation</title>
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
          background-color: #f8f9fa;
        }
        .booking-details {
          padding: 20px 0;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #0070f3;
          border-bottom: 1px solid #eaeaea;
          padding-bottom: 5px;
        }
        .detail-row {
          margin-bottom: 10px;
          display: flex;
        }
        .detail-label {
          font-weight: bold;
          color: #555;
          width: 120px;
          flex-shrink: 0;
        }
        .detail-value {
          flex-grow: 1;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eaeaea;
          color: #777;
          font-size: 0.9em;
        }
        .contact {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
        .whatsapp-btn {
          display: inline-block;
          background-color: #25D366;
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          margin-top: 10px;
        }
        .whatsapp-btn:hover {
          background-color: #128C7E;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        
        <div class="booking-details">
          <p>Dear ${formData.fullName},</p>
          
          <p>Your transfer booking has been <strong>confirmed</strong>!</p>
          
          <div class="section">
            <div class="section-title">Trip Details</div>
            
            <div class="detail-row">
              <div class="detail-label">From:</div>
              <div class="detail-value">${pickupLocation}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">To:</div>
              <div class="detail-value">${dropoffLocation}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Date:</div>
              <div class="detail-value">${formattedDate}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Time:</div>
              <div class="detail-value">${formData.time || "Not specified"}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Additional Information</div>
            
            <div class="detail-row">
              <div class="detail-label">Passengers:</div>
              <div class="detail-value">${formData.passengers}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Luggage:</div>
              <div class="detail-value">${formData.luggage}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Child Seats:</div>
              <div class="detail-value">${formData.childSeats}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Flight Number:</div>
              <div class="detail-value">${formData.flightNumber || "Not specified"}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Vehicle:</div>
              <div class="detail-value">${formData.selectedVehicle || "Standard"}</div>
            </div>
            
            ${
              isTourBooking
                ? `
            <div class="detail-row">
              <div class="detail-label">Tour:</div>
              <div class="detail-value">${formData.selectedTour}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Tour Guide:</div>
              <div class="detail-value">${tourGuideInfo}</div>
            </div>
            `
                : ""
            }
            
            ${
              formData.notes
                ? `
            <div class="detail-row">
              <div class="detail-label">Notes:</div>
              <div class="detail-value">${formData.notes}</div>
            </div>
            `
                : ""
            }
          </div>
         
         <div class="contact">
           <p><strong>Need to make changes to your booking?</strong></p>
           <p>Please contact our customer service team at ${PHONE_NUMBER}.</p>
           <a href="${whatsappLink}" class="whatsapp-btn" target="_blank">Contact us on WhatsApp</a>
         </div>
         
         <div class="footer">
           <p>Thank you for choosing our service!</p>
           <p>© ${new Date().getFullYear()} Transfer Service. All rights reserved.</p>
         </div>
       </div>
     </body>
     </html>
     `;

    // Send the email with HTML
    const result = await sendEmail({
      to: formData.email,
      subject,
      body,
      html: htmlContent,
    });

    console.log("Email sent:", result);
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    return {
      success: false,
      message: "Failed to send booking confirmation email",
    };
  }
};
