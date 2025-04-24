"use server";

import nodemailer from "nodemailer";

type BookingFormData = {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: {
    id: string;
    name: string;
    description?: string;
    uniqueKey: string;
  } | undefined;
  dropoffLocation: {
    id: string;
    name: string;
    description?: string;
    uniqueKey: string;
  } | undefined;
  date?: Date;
  time?: string;
  passengers: string;
  vehicle: string;
  luggage: string;
  childSeats: string;
  flightNumber?: string;
  notes?: string;
};

export const sendMessage = async (formData: BookingFormData) => {
  try {
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "noreply@posidon-transfers.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format date and time
    const formattedDate = formData.date
      ? new Date(formData.date).toLocaleDateString()
      : "Not specified";

    const formattedTime = formData.time || "Not specified";

    // Create HTML email content
    const htmlContent = `
      <h1>New Booking Request</h1>
      <h2>Personal Information</h2>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      
      <h2>Trip Details</h2>
      <p><strong>Pickup Location:</strong> ${formData.pickupLocation?.name || "Not specified"}</p>
      <p><strong>Pickup Details:</strong> ${
        formData.pickupLocation?.description || "N/A"
      }</p>
      <p><strong>Dropoff Location:</strong> ${formData.dropoffLocation?.name || "Not specified"}</p>
      <p><strong>Dropoff Details:</strong> ${
        formData.dropoffLocation?.description || "N/A"
      }</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formattedTime}</p>
      
      <h2>Additional Details</h2>
      <p><strong>Passengers:</strong> ${formData.passengers}</p>
      <p><strong>Luggage:</strong> ${formData.luggage || "Not specified"}</p>
      <p><strong>Child Seats:</strong> ${formData.childSeats || "Not specified"}</p>
      <p><strong>Vehicle:</strong> ${formData.vehicle || "Not specified"}</p>
      <p><strong>Flight Number:</strong> ${formData.flightNumber || "Not specified"}</p>
      <p><strong>Special Requests:</strong> ${formData.notes || "None"}</p>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || "noreply@posidon-transfers.com",
      to: "solonoodle1997@gmail.com", // Recipient email
      subject: `New Booking Request from ${formData.fullName}`,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
