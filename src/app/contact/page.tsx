'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useGym();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Received! 📞', 'Our Member Concierge will reply within 15 minutes.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
            24/7 Athlete Support & Private VIP Tours
          </span>
          <h1 className="h1-display text-white mt-1">CONTACT APEX FITNESS</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form (6 cols) */}
          <div className="lg:col-span-6 gym-card space-y-5">
            <h2 className="h3-display text-white">BOOK A VIP CLUB TOUR OR SEND A MESSAGE</h2>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
                <h3 className="h3-display text-white">MESSAGE SENT!</h3>
                <p className="text-xs text-[#A0A0A0]">We’ve sent a confirmation and VIP Day Pass to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
                <textarea
                  rows={4}
                  required
                  placeholder="How can our coaches or concierge team help you?"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4 text-white"
                />
                <button type="submit" className="btn-primary w-full py-3.5 text-sm">
                  <Send className="w-4 h-4" /> Send Message & Claim Free Tour
                </button>
              </form>
            )}
          </div>

          {/* Info + Google Map Embed (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="gym-card p-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <div>
                  <p className="text-[#A0A0A0]">24/7 Front Desk</p>
                  <p className="font-bold text-white">+1 (800) 555-APEX</p>
                </div>
              </div>
              <div className="gym-card p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <div>
                  <p className="text-[#A0A0A0]">Concierge Email</p>
                  <p className="font-bold text-white">concierge@apexfitness.io</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="gym-card p-2 overflow-hidden h-72">
              <iframe
                title="APEX FITNESS Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0100%2C40.7450%2C-73.9850%2C40.7580&layer=mapnik"
                className="w-full h-full rounded-xl border-0 filter invert-[90%] hue-rotate-180 contrast-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
