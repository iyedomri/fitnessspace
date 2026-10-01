'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X as XIcon, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'BASIC',
      monthlyPrice: 29,
      annualPrice: 23,
      desc: 'Essential gym floor access and progress tracking for independent lifters.',
      popular: false,
      included: [
        'Gym access (off-peak)',
        '2 group classes/week',
        'Member dashboard',
        'Progress tracker',
      ],
      excluded: ['Video library', 'Nutrition plans', 'Personal training sessions'],
    },
    {
      name: 'PRO',
      monthlyPrice: 59,
      annualPrice: 47,
      desc: 'Our #1 best-selling all-access pass with unlimited classes and 4K video library.',
      popular: true,
      included: [
        'Unlimited gym access (24/7)',
        'Unlimited group classes',
        'Full video library',
        'Progress tracker + analytics',
        '10% store discount',
        'Loyalty points x2',
      ],
      excluded: ['Personal training sessions'],
    },
    {
      name: 'ELITE',
      monthlyPrice: 99,
      annualPrice: 79,
      desc: 'Total VIP coaching with 4 monthly 1-on-1 Personal Training sessions and custom macros.',
      popular: false,
      included: [
        'Everything in Pro',
        '4 PT sessions/month',
        'Custom workout program',
        'Nutrition plan',
        'Priority booking',
        '20% store discount',
        'Loyalty points x3',
      ],
      excluded: [],
    },
  ];

  const faqs = [
    {
      q: 'How does the First Month Free / 7-Day Free Trial work?',
      a: 'New members get immediate access to the club and group classes with zero upfront risk. If you choose an annual Pro or Elite plan today, your first month is 100% complimentary.',
    },
    {
      q: 'Can I pause or cancel my membership anytime?',
      a: 'Yes! You can freeze or cancel your membership in 1 click directly from your Member Dashboard with zero cancellation penalties.',
    },
    {
      q: 'What is included in the 30-Day Money-Back Guarantee?',
      a: 'If you attend at least 4 sessions in your first 30 days and aren’t thrilled with the equipment, classes, and community, we refund 100% of your membership fee.',
    },
    {
      q: 'Can I upgrade from Basic to Pro or Elite later?',
      a: 'Absolutely. You can upgrade instantly from your dashboard and unlock unlimited classes and Personal Training credits immediately.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-[#FF6B00]/20 via-[#FF6B00]/10 to-[#1A1A1A] border border-[#FF6B00] rounded-2xl p-5 text-center">
          <p className="text-sm font-extrabold text-white flex flex-wrap items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <span>LIMITED PROMO: SIGN UP FOR ANNUAL BILLING TODAY & GET YOUR FIRST MONTH FREE + $0 INITIATION FEE!</span>
          </p>
        </div>

        {/* Header + Monthly/Annual Toggle */}
        <div className="text-center space-y-5 max-w-2xl mx-auto">
          <h1 className="h1-display text-white">INVEST IN YOUR STRONGEST SELF</h1>
          <p className="text-sm text-[#A0A0A0]">
            Simple, transparent memberships with zero hidden fees. Switch plans or cancel anytime.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] p-1.5 rounded-full">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                !annual ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                annual ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-[#22C55E] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => {
            const price = annual ? p.annualPrice : p.monthlyPrice;
            return (
              <div
                key={p.name}
                className={`gym-card flex flex-col justify-between relative ${
                  p.popular ? 'border-2 border-[#FF6B00] shadow-orange-glow lg:-translate-y-2' : ''
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-xs font-extrabold uppercase px-4 py-1 rounded-full">
                    MOST POPULAR 🔥
                  </div>
                )}

                <div>
                  <h2 className="h3-display text-white">{p.name}</h2>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-6xl text-white">${price}</span>
                    <span className="text-sm text-[#A0A0A0]">/month</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-[#22C55E] font-bold mt-1">
                      Billed annually (${price * 12}/yr — Save ${(p.monthlyPrice - p.annualPrice) * 12}/yr)
                    </p>
                  )}
                  <p className="text-xs text-[#A0A0A0] mt-2">{p.desc}</p>

                  <ul className="mt-6 space-y-3 text-sm">
                    {p.included.map((inc) => (
                      <li key={inc} className="flex items-center gap-2.5 text-white">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0" /> {inc}
                      </li>
                    ))}
                    {p.excluded.map((exc) => (
                      <li key={exc} className="flex items-center gap-2.5 text-[#A0A0A0] line-through">
                        <XIcon className="w-4 h-4 text-[#EF4444] shrink-0" /> {exc}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/register?plan=${p.name}`}
                  className={`w-full mt-8 text-center ${p.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Join {p.name} Today →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Money-Back Guarantee Badge */}
        <div className="gym-card bg-[#1A1A1A] border border-[#22C55E]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="h3-display text-white">100% IRONCLAD 30-DAY MONEY-BACK GUARANTEE</h3>
              <p className="text-xs text-[#A0A0A0]">
                Train with us for 30 days. If you don’t feel stronger, more energized, and 100% satisfied, we will refund every cent — no questions asked.
              </p>
            </div>
          </div>
          <Link href="/register" className="btn-primary shrink-0">
            Start Risk-Free Trial
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="h2-display text-white text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="gym-card p-5 space-y-2">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#FF6B00] shrink-0" /> {f.q}
                </h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed pl-6">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
