'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGym } from '@/context/GymContext';
import {
  ArrowRight,
  ChevronDown,
  Calendar,
  Video,
  TrendingUp,
  ShoppingBag,
  Gift,
  Users,
  Star,
  Play,
  Check,
  X as XIcon,
  Flame,
  Clock,
  Radio,
  Award,
  Smartphone,
  Instagram,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const {
    t,
    classes,
    trainers,
    videos,
    occupancyCount,
    maxCapacity,
    occupancyPct,
    setOccupancyCount,
    setActiveBookingClass,
    bookedClassIds,
    setIsPromoModalOpen,
    showToast,
  } = useGym();

  // Animated Counters for Hero Stats Bar
  const [memberCount, setMemberCount] = useState(420);
  const [classCount, setClassCount] = useState(35);
  const [trainerCount, setTrainerCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount((prev) => (prev < 500 ? prev + 10 : 500));
      setClassCount((prev) => (prev < 50 ? prev + 3 : 50));
      setTrainerCount((prev) => (prev < 15 ? prev + 1 : 15));
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const todaysClasses = classes.filter((c) => c.day === 'Today');

  const statusInfo =
    occupancyPct < 40
      ? { label: t('status_quiet'), emoji: '🟢', color: 'text-[#22C55E]', bar: 'bg-[#22C55E]', badgeBg: 'bg-[#22C55E]/15 border-[#22C55E]/40' }
      : occupancyPct < 70
      ? { label: t('status_moderate'), emoji: '🟡', color: 'text-[#F59E0B]', bar: 'bg-[#F59E0B]', badgeBg: 'bg-[#F59E0B]/15 border-[#F59E0B]/40' }
      : { label: t('status_busy'), emoji: '🔴', color: 'text-[#EF4444]', bar: 'bg-[#EF4444]', badgeBg: 'bg-[#EF4444]/15 border-[#EF4444]/40' };

  const testimonials = [
    {
      name: 'Marcus Sterling',
      duration: 'Member for 14 Months • Pro Plan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      result: '-28 lbs Fat Loss & +45 lbs Bench',
      quote:
        'The live gym capacity tracker and 1-click class booking changed my routine forever. I dropped 28 pounds in 5 months and never waited for a squat rack once.',
    },
    {
      name: 'Sophia Martinez',
      duration: 'Member for 9 Months • Elite Plan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      result: 'Hyrox Finisher & Lean Sculpt',
      quote:
        'Elena’s Inferno MetCon classes and the on-demand video library on travel days kept my streak alive for 90 days straight. Worth every single penny.',
    },
    {
      name: 'Liam O’Connor',
      duration: 'Member for 2 Years • Pro Plan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      result: '+14 lbs Lean Muscle Mass',
      quote:
        'Between the loyalty points paying for my monthly whey isolate and the world-class Eleiko lifting platforms, APEX FITNESS is in a league of its own.',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden border-b border-[#2A2A2A]">
        {/* Background Gym Image + Multi-layer Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85"
            alt="APEX FITNESS Performance Training Floor"
            className="w-full h-full object-cover object-center scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.22),transparent_55%)]" />
        </div>

        {/* Hero Center Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 md:pt-24 md:pb-16 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A]/90 border border-[#FF6B00]/50 text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> #1 Rated High-Performance Gym Club
            </div>

            <h1 className="h1-display text-white uppercase tracking-tight drop-shadow-lg">
              TRANSFORM YOUR <span className="text-[#FF6B00]">BODY.</span>
              <br />
              ELEVATE YOUR <span className="text-[#FF6B00]">LIFE.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A0A0A0] max-w-2xl font-medium">
              {t('hero_sub')} — Experience 24/7 biometric access, real-time floor capacity, championship coaches, and AI-driven progress analytics.
            </p>

            {/* Two Primary/Secondary CTAs side by side */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setIsPromoModalOpen(true)}
                className="btn-primary text-base justify-center"
              >
                <span>{t('cta_trial')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/classes" className="btn-secondary text-base justify-center">
                <span>{t('cta_explore')}</span>
              </Link>
            </div>

            {/* Micro Conversion Guarantees */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-[#A0A0A0]">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#22C55E]" /> No Credit Card Required for 7-Day Trial
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#22C55E]" /> Cancel or Freeze Anytime in 1 Click
              </span>
            </div>
          </div>

          {/* Animated Scroll Indicator Arrow */}
          <div className="hidden md:flex justify-center pt-10">
            <a
              href="#live-status"
              aria-label="Scroll to Live Gym Status"
              className="w-11 h-11 rounded-full bg-[#1A1A1A]/80 border border-[#2A2A2A] hover:border-[#FF6B00] flex items-center justify-center text-[#FF6B00] animate-bounce transition"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Hero Bottom Stats Bar */}
        <div className="relative z-10 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-xl">
                🏋️
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">{memberCount}+</p>
                <p className="text-xs text-[#A0A0A0] font-semibold uppercase tracking-wider mt-1">Active Members</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">{classCount}+</p>
                <p className="text-xs text-[#A0A0A0] font-semibold uppercase tracking-wider mt-1">Classes / Week</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-xl">
                👨‍💼
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">{trainerCount}</p>
                <p className="text-xs text-[#A0A0A0] font-semibold uppercase tracking-wider mt-1">Expert Trainers</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl text-white leading-none">4.9 / 5</p>
                <p className="text-xs text-[#A0A0A0] font-semibold uppercase tracking-wider mt-1">Verified Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — LIVE GYM STATUS WIDGET
      ══════════════════════════════════════════ */}
      <section id="live-status" className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gym-card bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#FF6B00]/10 border border-[#2A2A2A] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-5 h-5 text-[#FF6B00] animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                    Real-Time Sensor Telemetry
                  </span>
                </div>
                <h2 className="h3-display text-white flex flex-wrap items-center gap-3">
                  <span>LIVE GYM CAPACITY STATUS:</span>
                  <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xl ${statusInfo.badgeBg} ${statusInfo.color}`}>
                    <span>{statusInfo.emoji}</span>
                    <span>{statusInfo.label} ({occupancyPct}%)</span>
                  </span>
                </h2>
                <p className="text-sm text-[#A0A0A0]">
                  <strong className="text-white">{occupancyCount} / {maxCapacity} athletes</strong> currently checked in •{' '}
                  <span className="text-[#22C55E] font-semibold">
                    Best time to visit today: 2:00 PM – 4:00 PM (Usually ~22% Quiet)
                  </span>
                </p>
              </div>

              {/* Quick Demo Simulator + CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-1 text-xs">
                  <button
                    onClick={() => setOccupancyCount(42)}
                    className={`px-2.5 py-1.5 rounded font-bold transition ${
                      occupancyPct < 40 ? 'bg-[#22C55E] text-black' : 'text-[#A0A0A0] hover:text-white'
                    }`}
                  >
                    🟢 Quiet
                  </button>
                  <button
                    onClick={() => setOccupancyCount(68)}
                    className={`px-2.5 py-1.5 rounded font-bold transition ${
                      occupancyPct >= 40 && occupancyPct < 70 ? 'bg-[#F59E0B] text-black' : 'text-[#A0A0A0] hover:text-white'
                    }`}
                  >
                    🟡 Moderate
                  </button>
                  <button
                    onClick={() => setOccupancyCount(126)}
                    className={`px-2.5 py-1.5 rounded font-bold transition ${
                      occupancyPct >= 70 ? 'bg-[#EF4444] text-white' : 'text-[#A0A0A0] hover:text-white'
                    }`}
                  >
                    🔴 Busy
                  </button>
                </div>

                <Link href="/capacity" className="btn-secondary btn-compact text-xs">
                  Hourly Forecast & Heatmap →
                </Link>
              </div>
            </div>

            {/* Occupancy Progress Bar */}
            <div className="mt-6">
              <div className="w-full h-4 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#2A2A2A] p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${statusInfo.bar}`}
                  style={{ width: `${occupancyPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#A0A0A0] font-semibold mt-2">
                <span>0% (Empty)</span>
                <span>🟢 0–40% Quiet</span>
                <span>🟡 40–70% Moderate</span>
                <span>🔴 70–100% Peak Rush</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — FEATURES / SERVICES GRID (3x2)
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                All-In-One Ecosystem
              </span>
              <h2 className="h2-display text-white mt-1">ENGINEERED FOR TOTAL PERFORMANCE</h2>
            </div>
            <p className="text-sm text-[#A0A0A0] max-w-md">
              Everything you need to book classes, track every pound lifted, stream workouts anywhere, and earn free gear — in max 3 clicks.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'Book Classes',
                desc: 'Reserve spots in 50+ weekly HIIT, Strength, Boxing & Yoga sessions with live waitlist alerts.',
                icon: Calendar,
                href: '/classes',
                tag: '50+ Weekly',
              },
              {
                title: 'Video Library',
                desc: 'Stream Netflix-style on-demand workouts led by our master coaches from home or on the road.',
                icon: Video,
                href: '/videos',
                tag: '4K On-Demand',
              },
              {
                title: 'Progress Tracker',
                desc: 'Visualize weight, body fat %, radar measurements, lifting PRs, and before/after transformations.',
                icon: TrendingUp,
                href: '/progress',
                tag: 'Analytics Lab',
              },
              {
                title: 'Online Store',
                desc: 'Shop cold-filtered whey isolate, pre-workout, lever belts, and stealth apparel with member discounts.',
                icon: ShoppingBag,
                href: '/store',
                tag: 'Up to 20% Off',
              },
              {
                title: 'Loyalty Rewards',
                desc: 'Earn points automatically every time you scan in, complete a workout, or refer a training partner.',
                icon: Gift,
                href: '/rewards',
                tag: 'Free Perks',
              },
              {
                title: 'Personal Trainers',
                desc: 'Book 1-on-1 coaching packages with certified strength, conditioning, and mobility specialists.',
                icon: Users,
                href: '/trainers',
                tag: '15 Pro Coaches',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="gym-card group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 group-hover:bg-[#FF6B00] text-[#FF6B00] group-hover:text-white flex items-center justify-center transition">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#A0A0A0]">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="h3-display text-white group-hover:text-[#FF6B00] transition">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#A0A0A0] mt-2 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-bold text-[#FF6B00]">
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — TODAY'S SCHEDULE (HORIZONTAL SCROLL)
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                Don’t Miss Out • Live Spots
              </span>
              <h2 className="h2-display text-white mt-1">TODAY’S CLASS SCHEDULE</h2>
            </div>
            <Link href="/classes" className="btn-secondary btn-compact self-start sm:self-auto">
              View Full Weekly Calendar →
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x">
            {todaysClasses.map((cls) => {
              const isBooked = bookedClassIds.includes(cls.id);
              return (
                <div
                  key={cls.id}
                  className="gym-card min-w-[300px] sm:min-w-[340px] snap-start flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] text-xs font-bold uppercase">
                        {cls.type}
                      </span>
                      {cls.isLiveNow ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] text-xs font-extrabold animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-[#EF4444]" /> LIVE NOW
                        </span>
                      ) : (
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            cls.spotsLeft <= 3
                              ? 'bg-[#EF4444]/15 text-[#EF4444]'
                              : 'bg-[#22C55E]/15 text-[#22C55E]'
                          }`}
                        >
                          🔥 Only {cls.spotsLeft} spots left!
                        </span>
                      )}
                    </div>

                    <h3 className="h3-display text-white">{cls.name}</h3>
                    <p className="text-xs text-[#A0A0A0] mt-1 line-clamp-2">{cls.description}</p>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#2A2A2A]">
                      <img
                        src={cls.trainerAvatar}
                        alt={cls.trainerName}
                        className="w-10 h-10 rounded-full object-cover border border-[#FF6B00]"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">{cls.trainerName}</p>
                        <p className="text-[11px] text-[#A0A0A0] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#FF6B00]" /> {cls.time} ({cls.duration})
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBookingClass(cls)}
                    className={`w-full mt-5 py-3 rounded-lg font-bold text-sm transition ${
                      isBooked
                        ? 'bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E]'
                        : 'btn-primary'
                    }`}
                  >
                    {isBooked ? 'Booked ✓ (View Pass)' : 'Book Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — MEMBERSHIP PLANS TEASER
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              Transparent Pricing • Zero Lock-In
            </span>
            <h2 className="h2-display text-white">CHOOSE YOUR BATTLE PLAN</h2>
            <p className="text-sm text-[#A0A0A0]">
              Every plan includes our 30-Day Money-Back Guarantee and your first 7 days free.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* BASIC PLAN */}
            <div className="gym-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="h3-display text-white">BASIC</h3>
                  <span className="text-xs text-[#A0A0A0] font-semibold">Starter Access</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-white">$29</span>
                  <span className="text-sm text-[#A0A0A0]">/month</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mt-2">Ideal for independent lifters training during off-peak hours.</p>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Gym access (off-peak)
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> 2 group classes / week
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Member dashboard
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Progress tracker
                  </li>
                  <li className="flex items-center gap-2.5 text-[#A0A0A0] line-through">
                    <XIcon className="w-4 h-4 text-[#EF4444] shrink-0" /> Video library
                  </li>
                  <li className="flex items-center gap-2.5 text-[#A0A0A0] line-through">
                    <XIcon className="w-4 h-4 text-[#EF4444] shrink-0" /> Nutrition plans
                  </li>
                </ul>
              </div>

              <Link href="/register?plan=Basic" className="btn-secondary w-full mt-8 text-center">
                Get Started
              </Link>
            </div>

            {/* PRO PLAN (MOST POPULAR) */}
            <div className="gym-card border-2 border-[#FF6B00] shadow-orange-glow relative flex flex-col justify-between lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-btn-orange">
                MOST POPULAR 🔥
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="h3-display text-[#FF6B00]">PRO UNLIMITED</h3>
                  <span className="text-xs text-[#22C55E] font-bold">Best Value</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-6xl text-white">$59</span>
                  <span className="text-sm text-[#A0A0A0]">/month</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mt-2">Unrestricted 24/7 club access, unlimited classes, and full digital suite.</p>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Unlimited 24/7 gym access
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Unlimited group classes
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Full 4K video library
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Progress tracker + analytics
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> 10% store discount
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-medium">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Loyalty points x2 multiplier
                  </li>
                  <li className="flex items-center gap-2.5 text-[#A0A0A0] line-through">
                    <XIcon className="w-4 h-4 text-[#EF4444] shrink-0" /> Personal training sessions
                  </li>
                </ul>
              </div>

              <Link href="/register?plan=Pro" className="btn-primary w-full mt-8 text-center">
                Get Started Now →
              </Link>
            </div>

            {/* ELITE PLAN */}
            <div className="gym-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="h3-display text-white">ELITE VIP</h3>
                  <span className="text-xs text-[#FF6B00] font-bold">1-on-1 Coaching</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-white">$99</span>
                  <span className="text-sm text-[#A0A0A0]">/month</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mt-2">Total concierge coaching with private PT sessions and custom macros.</p>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Everything in Pro Unlimited
                  </li>
                  <li className="flex items-center gap-2.5 text-white font-semibold">
                    <Check className="w-4 h-4 text-[#FF6B00] shrink-0" /> 4 Personal Training sessions/mo
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Custom workout program
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Custom nutrition & macro plan
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> Priority class booking
                  </li>
                  <li className="flex items-center gap-2.5 text-white">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> 20% store discount + Points x3
                  </li>
                </ul>
              </div>

              <Link href="/register?plan=Elite" className="btn-secondary w-full mt-8 text-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — TRAINERS SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                World-Class Coaching Roster
              </span>
              <h2 className="h2-display text-white mt-1">MEET YOUR PERSONAL TRAINERS</h2>
            </div>
            <Link href="/trainers" className="btn-secondary btn-compact self-start sm:self-auto">
              All 15 Trainers & Availability →
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
            {trainers.map((tr) => (
              <div key={tr.id} className="gym-card min-w-[280px] sm:min-w-[310px] snap-start p-0 overflow-hidden flex flex-col justify-between group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tr.photo}
                    alt={tr.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A]/85 border border-[#2A2A2A] text-xs font-bold flex items-center gap-1 text-white">
                    <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                    <span>{tr.rating}</span>
                    <span className="text-[#A0A0A0]">({tr.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="h3-display text-white">{tr.name}</h3>
                    <p className="text-xs text-[#FF6B00] font-semibold">{tr.role}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tr.specialties.slice(0, 3).map((sp) => (
                        <span
                          key={sp}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#A0A0A0]"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/trainers?trainer=${tr.id}`}
                    className="btn-primary w-full mt-5 py-2.5 text-xs"
                  >
                    Book Session • From ${tr.pricing.single}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — VIDEO LIBRARY PREVIEW (NETFLIX STYLE)
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                Train On-Demand 24/7
              </span>
              <h2 className="h2-display text-white mt-1">STREAM WORKOUTS ANYWHERE</h2>
            </div>
            <Link href="/videos" className="btn-primary btn-compact self-start sm:self-auto">
              Unlock Full Library →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.slice(0, 4).map((vid) => (
              <Link
                key={vid.id}
                href={`/videos?play=${vid.id}`}
                className="gym-card p-0 overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-btn-orange group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-bold">
                    {vid.duration}
                  </span>
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-extrabold uppercase">
                    {vid.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-base text-white group-hover:text-[#FF6B00] transition line-clamp-1">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] mt-1">
                    Coach {vid.trainerName} • {vid.difficulty} • {vid.calories} kcal
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — MEMBER TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              Real Athletes. Verified Results.
            </span>
            <h2 className="h2-display text-white mt-1">WHAT OUR MEMBERS SAY</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={item.name}
                className={`gym-card flex flex-col justify-between ${
                  idx === activeTestimonial ? 'border-[#FF6B00]' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#FF6B00]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF6B00]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold">
                      {item.result}
                    </span>
                  </div>

                  <p className="text-sm text-white leading-relaxed italic">“{item.quote}”</p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#2A2A2A]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#FF6B00]"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">{item.name}</p>
                    <p className="text-xs text-[#A0A0A0]">{item.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`View testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  activeTestimonial === i ? 'w-8 bg-[#FF6B00]' : 'w-2.5 bg-[#2A2A2A]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — LOYALTY PROGRAM TEASER
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gym-card bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#FF6B00]/15 border border-[#FF6B00]/40 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold uppercase">
                  <Award className="w-3.5 h-3.5" /> Sweat = Currency
                </span>
                <h2 className="h2-display text-white">
                  GET REWARDED FOR EVERY SINGLE <span className="text-[#FF6B00]">WORKOUT</span>
                </h2>
                <p className="text-sm text-[#A0A0A0]">
                  Our built-in APEX Loyalty Engine turns your consistency into free supplements, personal training sessions, and complimentary membership months.
                </p>
                <div className="pt-2">
                  <Link href="/rewards" className="btn-primary">
                    Explore Rewards Marketplace →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    step: '01',
                    title: 'JOIN & CHECK IN',
                    desc: 'Scan your dynamic QR pass at the door (+10 pts) or book classes (+15 pts).',
                    pts: '+10 to +20 PTS / Day',
                  },
                  {
                    step: '02',
                    title: 'LEVEL UP TIERS',
                    desc: 'Climb from Bronze → Silver → Gold → Platinum and multiply your point earnings up to 3x.',
                    pts: 'Up to 3X Multiplier',
                  },
                  {
                    step: '03',
                    title: 'UNLOCK FREE PERKS',
                    desc: 'Redeem points instantly for free whey protein, PT sessions, or a free month of Pro.',
                    pts: '500+ Pts = Free Perks',
                  },
                ].map((s) => (
                  <div key={s.step} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 space-y-2.5">
                    <span className="font-display text-4xl text-[#FF6B00]">{s.step}</span>
                    <h3 className="font-display text-2xl text-white">{s.title}</h3>
                    <p className="text-xs text-[#A0A0A0] leading-relaxed">{s.desc}</p>
                    <p className="text-xs font-extrabold text-[#22C55E] pt-2">{s.pts}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10 — BLOG / WORKOUT & NUTRITION TIPS (SEO BOOST)
      ══════════════════════════════════════════ */}
      <section className="section-padding border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                APEX Performance Journal
              </span>
              <h2 className="h2-display text-white mt-1">SCIENCE-BACKED TRAINING & NUTRITION TIPS</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: 'Hypertrophy Science',
                title: 'Mechanical Tension vs. Metabolic Stress: How Many Sets Do You Really Need?',
                readTime: '4 min read',
                author: 'Marcus Vance, CSCS',
                img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
              },
              {
                tag: 'Performance Nutrition',
                title: 'The Optimal Pre & Post-Workout Macro Window for Lean Recomposition',
                readTime: '5 min read',
                author: 'Sarah Jenkins, ISSN',
                img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80',
              },
              {
                tag: 'Conditioning & Longevity',
                title: 'Why 2 Weekly Zone-5 VO2 Max Intervals Add Years to Your Athletic Peak',
                readTime: '3 min read',
                author: 'Elena Rostova, NASM',
                img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
              },
            ].map((post) => (
              <article key={post.title} className="gym-card p-0 overflow-hidden flex flex-col justify-between group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A0A0A]/90 border border-[#FF6B00]/40 text-[#FF6B00] text-xs font-bold">
                    {post.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-[#FF6B00] transition">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#A0A0A0] mt-2">
                      By {post.author} • {post.readTime}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      showToast('Article Unlocked 📖', `Reading "${post.title}" (+5 Loyalty Pts)`, 'info')
                    }
                    className="mt-4 text-xs font-bold text-[#FF6B00] flex items-center gap-1 hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read Full Guide →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 11 — DOWNLOAD APP BANNER + INSTAGRAM GRID
      ══════════════════════════════════════════ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Download App Banner */}
          <div className="gym-card bg-gradient-to-r from-[#FF6B00] to-[#c94b00] border-none p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-bold uppercase">
                <Smartphone className="w-3.5 h-3.5" /> iOS & Android Companion App
              </span>
              <h2 className="h2-display text-white">TRAIN ANYWHERE. YOUR GYM IN YOUR POCKET.</h2>
              <p className="text-sm text-white/90">
                Instant Apple Watch & Whoop sync, NFC turnstile tap-in, live capacity push alerts, and offline 4K workout downloads.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => showToast('iOS App Link Sent 📱', 'Download link sent to your mobile device.', 'success')}
                className="bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 shadow-xl transition"
              >
                <Smartphone className="w-6 h-6 text-[#FF6B00]" />
                <div className="text-left">
                  <p className="text-[10px] text-[#A0A0A0] uppercase">Download on the</p>
                  <p className="text-sm font-extrabold">App Store</p>
                </div>
              </button>
              <button
                onClick={() => showToast('Android App Link Sent 📱', 'Google Play link sent to your phone.', 'success')}
                className="bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 shadow-xl transition"
              >
                <Smartphone className="w-6 h-6 text-[#22C55E]" />
                <div className="text-left">
                  <p className="text-[10px] text-[#A0A0A0] uppercase">Get it on</p>
                  <p className="text-sm font-extrabold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Instagram Feed Grid (6 Photos) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
                  Community Energy
                </span>
                <h3 className="h3-display text-white mt-0.5">FOLLOW @APEXFITNESS ON INSTAGRAM</h3>
              </div>
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Following @apexfitness 📸', 'Thanks for joining our 85K+ athlete community!', 'success');
                }}
                className="btn-secondary btn-compact self-start sm:self-auto"
              >
                <Instagram className="w-4 h-4" /> Follow @apexfitness
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=80',
              ].map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#2A2A2A] group cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`APEX FITNESS Instagram ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                    <Instagram className="w-6 h-6 text-[#FF6B00]" />
                    <span className="text-[11px] font-bold text-white">@apexfitness</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
