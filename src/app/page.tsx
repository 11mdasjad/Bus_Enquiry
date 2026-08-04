"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BookingForm } from "@/components/BookingForm";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SuccessModal } from "@/components/SuccessModal";
import { Footer } from "@/components/Footer";
import { BookingSubmissionData } from "@/types/booking";

export default function Home() {
  const [submissionData, setSubmissionData] = useState<BookingSubmissionData | null>(null);

  const handleFormSuccess = (data: BookingSubmissionData) => {
    setSubmissionData(data);
  };

  const handleCloseModal = () => {
    setSubmissionData(null);
  };

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Simple Mart Bus Express",
    "description": "Book your AC and Non-AC seater and sleeper bus journeys with verified operators.",
    "telephone": "+919876543210",
    "email": "support@simplemartbus.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "124 Travel Plaza, Suite 400",
      "addressLocality": "Fleet City",
      "postalCode": "FC 45001"
    },
    "offers": {
      "@type": "Offer",
      "category": "Bus Ticket Booking Inquiry"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-orange-500 selection:text-white">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Bar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection />
        <BookingForm onSuccess={handleFormSuccess} />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Submission Success Confirmation Modal */}
      <SuccessModal submission={submissionData} onClose={handleCloseModal} />
    </div>
  );
}
