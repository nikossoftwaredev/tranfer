"use client";

import BookingWizard from "../booking-wizard/BookingWizard";

type BookingWizardSectionProps = {
  tourSlug?: string;
};

const BookingWizardSection = ({ tourSlug }: BookingWizardSectionProps) => {
  return (
    <section id="booking" className="section-padding bg-primary/5">
      <BookingWizard tourSlug={tourSlug} />
    </section>
  );
};

export default BookingWizardSection;
