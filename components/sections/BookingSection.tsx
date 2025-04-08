"use client";

import { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: string;
  vehicle: string;
  notes: string;
};

const BookingSection = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: "",
    vehicle: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        pickupLocation: "",
        dropoffLocation: "",
        date: "",
        time: "",
        passengers: "",
        vehicle: "",
        notes: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="booking" className="section-padding bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Transfer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete the form below to request your private transfer. Our team
            will get back to you promptly to confirm the details.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-md border border-border p-6 md:p-8">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Booking Request Received!
              </h3>
              <p className="text-muted-foreground mb-4">
                Thank you for your booking request. Our team will contact you
                shortly to confirm your reservation.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-primary font-medium hover:underline"
              >
                Make another booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium mb-1"
                      >
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-1"
                      >
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="pickupLocation"
                        className="block text-sm font-medium mb-1"
                      >
                        Pickup Location*
                      </label>
                      <input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formState.pickupLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Address, Airport, Hotel..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dropoffLocation"
                        className="block text-sm font-medium mb-1"
                      >
                        Dropoff Location*
                      </label>
                      <input
                        type="text"
                        id="dropoffLocation"
                        name="dropoffLocation"
                        value={formState.dropoffLocation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Address, Airport, Hotel..."
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium mb-1"
                        >
                          Date*
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formState.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                          />
                          <Calendar className="h-4 w-4 absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium mb-1"
                        >
                          Time*
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="time"
                            name="time"
                            value={formState.time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                          />
                          <Clock className="h-4 w-4 absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Additional Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="passengers"
                        className="block text-sm font-medium mb-1"
                      >
                        Number of Passengers*
                      </label>
                      <div className="relative">
                        <select
                          id="passengers"
                          name="passengers"
                          value={formState.passengers}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                          required
                        >
                          <option value="" disabled>
                            Select number of passengers
                          </option>
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3">3 Passengers</option>
                          <option value="4">4 Passengers</option>
                          <option value="5">5 Passengers</option>
                          <option value="6">6 Passengers</option>
                          <option value="7+">7+ Passengers</option>
                        </select>
                        <Users className="h-4 w-4 absolute right-3 top-3 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle"
                        className="block text-sm font-medium mb-1"
                      >
                        Preferred Vehicle
                      </label>
                      <select
                        id="vehicle"
                        name="vehicle"
                        value={formState.vehicle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select a vehicle (optional)</option>
                        <option value="Mercedes S-Class">
                          Mercedes S-Class
                        </option>
                        <option value="BMW 7 Series">BMW 7 Series</option>
                        <option value="Mercedes V-Class">
                          Mercedes V-Class (up to 7 passengers)
                        </option>
                        <option value="Tesla Model S">Tesla Model S</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Special Requests
                  </h3>
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium mb-1"
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formState.notes}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Any special requirements or flight details..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button px-8 py-3 min-w-[200px] relative"
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Send Booking Request</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    "Send Booking Request"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
