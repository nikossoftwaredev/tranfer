"use client";

import BookingWizard from "../booking-wizard/BookingWizard";

type BookingWizardSectionProps = {
  tourSlug?: string;
};

const BookingWizardSection = ({ tourSlug }: BookingWizardSectionProps) => {
  return (
    <section id="booking" className="section-padding bg-primary/5 rounded-lg border border-primary/10">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Book Your Transfer</h2>
        <p className="text-muted-foreground mt-2">Experience premium transportation with our professional service</p>
      </div>
      <BookingWizard tourSlug={tourSlug} />
    </section>
  );
};

export default BookingWizardSection;
