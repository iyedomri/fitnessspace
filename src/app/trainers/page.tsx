'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { Trainer } from '@/data/gymData';
import {
  Star,
  Award,
  Calendar,
  Play,
  CheckCircle2,
  X,
  Clock,
  ShieldCheck,
  Users,
} from 'lucide-react';

export default function TrainersPage() {
  const { trainers, bookTrainerSession } = useGym();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(trainers[0]);
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'pack5' | 'pack10'>('single');
  const [selectedDay, setSelectedDay] = useState(trainers[0].availability[0].day);
  const [selectedSlot, setSelectedSlot] = useState(trainers[0].availability[0].slots[0]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [playingIntro, setPlayingIntro] = useState(false);

  const handleSelectTrainer = (tr: Trainer) => {
    setSelectedTrainer(tr);
    setSelectedDay(tr.availability[0]?.day || 'Thu, Oct 1');
    setSelectedSlot(tr.availability[0]?.slots[0] || '10:00 AM');
    setPlayingIntro(false);
  };

  const handleBookSession = () => {
    if (!selectedTrainer) return;
    const price =
      selectedPackage === 'single'
        ? selectedTrainer.pricing.single
        : selectedPackage === 'pack5'
        ? selectedTrainer.pricing.pack5
        : selectedTrainer.pricing.pack10;
    const pkgLabel =
      selectedPackage === 'single'
        ? 'Single 1-on-1 Session'
        : selectedPackage === 'pack5'
        ? '5-Session Transformation Pack'
        : '10-Session Pro Coaching Pack';

    bookTrainerSession(selectedTrainer.name, pkgLabel, selectedDay, selectedSlot, price);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
            1-on-1 Personal Coaching • Certified Specialists
          </span>
          <h1 className="h1-display text-white mt-1">CHAMPIONSHIP PERSONAL TRAINERS</h1>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((tr) => {
            const isSelected = selectedTrainer?.id === tr.id;
            return (
              <div
                key={tr.id}
                className={`gym-card p-0 overflow-hidden flex flex-col justify-between transition ${
                  isSelected ? 'border-2 border-[#FF6B00] shadow-orange-glow' : ''
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={tr.photo} alt={tr.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A0A0A]/85 border border-[#2A2A2A] text-xs font-bold text-white">
                    {tr.experienceYears} Yrs Exp
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A]/85 border border-[#2A2A2A] text-xs font-bold flex items-center gap-1 text-white">
                    <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                    <span>{tr.rating}</span>
                    <span className="text-[#A0A0A0]">({tr.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="h3-display text-white">{tr.name}</h2>
                    <p className="text-xs font-bold text-[#FF6B00]">{tr.role}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tr.specialties.map((sp) => (
                        <span
                          key={sp}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#A0A0A0]"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleSelectTrainer(tr);
                      document.getElementById('trainer-profile-view')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={isSelected ? 'btn-primary w-full py-2.5 text-xs' : 'btn-secondary w-full py-2.5 text-xs'}
                  >
                    {isSelected ? 'Viewing Full Profile Below ↓' : 'View Profile & Book Session'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* INDIVIDUAL TRAINER PROFILE DETAILED SECTION */}
        {selectedTrainer && (
          <div id="trainer-profile-view" className="gym-card border-2 border-[#FF6B00]/60 p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Cols: Hero + 30s Intro Video + Bio + Certifications + Reviews */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold uppercase">
                    Featured Coach Profile
                  </span>
                  <span className="text-xs text-[#A0A0A0]">
                    {selectedTrainer.clientsTrained}+ Athletes Coached • {selectedTrainer.instagram}
                  </span>
                </div>

                <div>
                  <h2 className="h2-display text-white">{selectedTrainer.name}</h2>
                  <p className="text-base text-[#FF6B00] font-bold">{selectedTrainer.role}</p>
                </div>

                {/* 30-Second Intro Video Embed */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] h-64 sm:h-80 bg-[#0A0A0A]">
                  <img
                    src={selectedTrainer.actionPhoto}
                    alt={`${selectedTrainer.name} 30s Intro`}
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    {!playingIntro ? (
                      <>
                        <button
                          onClick={() => setPlayingIntro(true)}
                          className="w-16 h-16 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-btn-orange hover:scale-110 transition"
                        >
                          <Play className="w-7 h-7 fill-white ml-0.5" />
                        </button>
                        <p className="font-bold text-sm text-white mt-3">
                          Watch {selectedTrainer.name}’s 30-Second Coaching Intro ({selectedTrainer.introVideoDuration})
                        </p>
                      </>
                    ) : (
                      <div className="bg-[#0A0A0A]/95 border border-[#FF6B00] rounded-xl p-5 max-w-md space-y-3">
                        <p className="text-xs font-bold text-[#FF6B00] uppercase animate-pulse">
                          ▶ Playing 30s Coach Intro (0:14 / 0:30)
                        </p>
                        <p className="text-xs text-white italic">
                          “Hey! I’m {selectedTrainer.name}. Whether your goal is adding 50 lbs to your compound lifts or shedding body fat sustainably, we track every rep and macro together.”
                        </p>
                        <button
                          onClick={() => setPlayingIntro(false)}
                          className="text-xs text-[#A0A0A0] underline"
                        >
                          Close Video Preview
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio & Certifications */}
                <div className="space-y-3">
                  <h3 className="h3-display text-white">COACHING PHILOSOPHY & BIO</h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{selectedTrainer.bio}</p>
                </div>

                <div>
                  <h4 className="font-display text-xl text-white mb-2.5">CERTIFICATIONS & CREDENTIALS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#FF6B00]/40 text-xs font-bold text-white"
                      >
                        <Award className="w-3.5 h-3.5 text-[#FF6B00]" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Reviews */}
                <div className="space-y-4 pt-4 border-t border-[#2A2A2A]">
                  <div className="flex items-center justify-between">
                    <h3 className="h3-display text-white">
                      VERIFIED CLIENT REVIEWS ({selectedTrainer.reviewsCount})
                    </h3>
                    <div className="flex items-center gap-1 text-[#FF6B00] font-bold text-sm">
                      <Star className="w-4 h-4 fill-[#FF6B00]" /> {selectedTrainer.rating} / 5.0
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedTrainer.reviews
                      .slice(0, showAllReviews ? selectedTrainer.reviews.length : 5)
                      .map((rev) => (
                        <div key={rev.id} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="text-xs font-bold text-white">{rev.author}</p>
                                <p className="text-[10px] text-[#A0A0A0]">{rev.date}</p>
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[11px] font-bold">
                              {rev.resultBadge}
                            </span>
                          </div>
                          <p className="text-xs text-[#A0A0A0] leading-relaxed">“{rev.text}”</p>
                        </div>
                      ))}
                  </div>

                  {selectedTrainer.reviews.length > 5 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="btn-secondary btn-compact text-xs"
                    >
                      {showAllReviews ? 'Show Less' : 'Load More Reviews'}
                    </button>
                  )}
                </div>
              </div>

              {/* Right 5 Cols: Live Availability Calendar + Session Pricing + Book CTA */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6 space-y-6 sticky top-28">
                  <h3 className="h3-display text-white">BOOK A 1-ON-1 SESSION</h3>

                  {/* Session Pricing Tiers */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase text-[#A0A0A0]">1. Choose Session Package</label>
                    {[
                      { id: 'single', label: 'Single 1-on-1 Session', price: selectedTrainer.pricing.single, sub: '60 min assessment & coaching' },
                      { id: 'pack5', label: 'Package of 5 Sessions', price: selectedTrainer.pricing.pack5, sub: 'Save 10% • Custom workout split' },
                      { id: 'pack10', label: 'Package of 10 Sessions', price: selectedTrainer.pricing.pack10, sub: 'Best Value • Save 18% + Macro Plan' },
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id as 'single' | 'pack5' | 'pack10')}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                          selectedPackage === pkg.id
                            ? 'border-2 border-[#FF6B00] bg-[#FF6B00]/15'
                            : 'border-[#2A2A2A] bg-[#1A1A1A]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{pkg.label}</p>
                          <p className="text-[11px] text-[#A0A0A0]">{pkg.sub}</p>
                        </div>
                        <span className="font-display text-2xl text-[#FF6B00]">${pkg.price}</span>
                      </button>
                    ))}
                  </div>

                  {/* Live Availability Calendar */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase text-[#A0A0A0]">2. Select Available Day</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTrainer.availability.map((av) => (
                        <button
                          key={av.day}
                          type="button"
                          onClick={() => {
                            setSelectedDay(av.day);
                            setSelectedSlot(av.slots[0]);
                          }}
                          className={`p-2.5 rounded-lg border text-xs font-bold ${
                            selectedDay === av.day
                              ? 'border-[#FF6B00] bg-[#FF6B00] text-white'
                              : 'border-[#2A2A2A] bg-[#1A1A1A] text-[#A0A0A0]'
                          }`}
                        >
                          {av.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-[#A0A0A0]">3. Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        selectedTrainer.availability.find((a) => a.day === selectedDay)?.slots || [
                          '09:00 AM',
                          '01:00 PM',
                          '05:00 PM',
                        ]
                      ).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2 rounded-lg border text-xs font-bold ${
                            selectedSlot === slot
                              ? 'border-[#22C55E] bg-[#22C55E]/20 text-[#22C55E]'
                              : 'border-[#2A2A2A] bg-[#1A1A1A] text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleBookSession} className="btn-primary w-full py-4 text-sm">
                    Confirm & Book Session (+50 Pts)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
