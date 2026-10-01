'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGym } from '@/context/GymContext';
import {
  Dumbbell,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Share2,
  ShieldCheck,
  Lock,
  RefreshCw,
  Send,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const { showToast, addPoints } = useGym();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    addPoints(25, 'Subscribed to Weekly Workout & Nutrition Tips');
    showToast(
      'Welcome to the APEX Insider Club! 🔥',
      'Your free 7-Day Hypertrophy & Nutrition PDF has been sent to your inbox (+25 Pts).',
      'success'
    );
    setEmail('');
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] pt-16 pb-28 md:pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 mb-12 border-b border-[#2A2A2A]">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#FF6B00]/15 flex items-center justify-center text-[#FF6B00] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">256-Bit SSL Secure Payment</p>
              <p className="text-xs text-[#A0A0A0]">Stripe, PayPal, Apple Pay & Google Pay verified</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#22C55E]/15 flex items-center justify-center text-[#22C55E] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Cancel or Pause Anytime</p>
              <p className="text-xs text-[#A0A0A0]">Zero hidden fees or long-term lock-in contracts</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">30-Day Money-Back Guarantee</p>
              <p className="text-xs text-[#A0A0A0]">Don’t love your transformation? 100% full refund.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2A2A]">
          {/* Col 1: Brand + Tagline + Social */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-btn-orange">
                <Dumbbell className="w-5 h-5 text-white -rotate-45" />
              </div>
              <span className="font-display text-3xl tracking-wider text-white">
                APEX <span className="text-[#FF6B00]">FITNESS</span>
              </span>
            </Link>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              The Smarter Way to Train. Engineered for high-performers with AI-assisted progress tracking, championship coaches, 50+ weekly classes, and 24/7 biometric access.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: 'Instagram', icon: Instagram, href: '#instagram' },
                { label: 'Facebook', icon: Facebook, href: '#facebook' },
                { label: 'TikTok', icon: Share2, href: '#tiktok' },
                { label: 'YouTube', icon: Youtube, href: '#youtube' },
              ].map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    aria-label={soc.label}
                    className="w-11 h-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00] hover:bg-[#FF6B00] text-white flex items-center justify-center transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xl tracking-wider text-white">EXPLORE</h4>
            <ul className="space-y-2.5 text-sm text-[#A0A0A0]">
              <li><Link href="/classes" className="hover:text-[#FF6B00] transition">Group Classes</Link></li>
              <li><Link href="/trainers" className="hover:text-[#FF6B00] transition">Personal Trainers</Link></li>
              <li><Link href="/pricing" className="hover:text-[#FF6B00] transition">Membership Plans</Link></li>
              <li><Link href="/store" className="hover:text-[#FF6B00] transition">Pro Gear & Store</Link></li>
              <li><Link href="/videos" className="hover:text-[#FF6B00] transition">Video Library</Link></li>
              <li><Link href="/capacity" className="hover:text-[#FF6B00] transition">Live Gym Capacity</Link></li>
            </ul>
          </div>

          {/* Col 3: Member Portal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xl tracking-wider text-white">MEMBER HUB</h4>
            <ul className="space-y-2.5 text-sm text-[#A0A0A0]">
              <li><Link href="/dashboard" className="hover:text-[#FF6B00] transition">Member Dashboard</Link></li>
              <li><Link href="/progress" className="hover:text-[#FF6B00] transition">Progress Tracker</Link></li>
              <li><Link href="/rewards" className="hover:text-[#FF6B00] transition">Loyalty & Rewards</Link></li>
              <li><Link href="/profile" className="hover:text-[#FF6B00] transition">Profile Settings</Link></li>
              <li><Link href="/admin" className="hover:text-[#FF6B00] transition text-[#FF6B00] font-semibold">Admin Portal</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF6B00] transition">Contact & Tour</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact + Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-xl tracking-wider text-white">GET FREE WORKOUT TIPS</h4>
            <p className="text-xs text-[#A0A0A0]">
              Join 12,400+ athletes receiving weekly science-backed hypertrophy guides, macro recipes, and flash store drops.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
              />
              <button
                type="submit"
                className="bg-[#FF6B00] hover:bg-[#FF8524] text-white font-bold px-5 py-3 rounded-lg flex items-center gap-1.5 transition shadow-btn-orange shrink-0 min-h-[44px]"
              >
                {subscribed ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>Join Club</span>
              </button>
            </form>

            <div className="pt-2 space-y-2 text-xs text-[#A0A0A0]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                <span>+1 (800) 555-APEX • 24/7 Member Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <span>concierge@apexfitness.io</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>750 Performance Blvd, Downtown District, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0A0A0]">
          <p>© {new Date().getFullYear()} APEX FITNESS PERFORMANCE CLUB. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition">Privacy Policy (GDPR)</Link>
            <Link href="/contact" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Cookie Preferences</Link>
            <Link href="/capacity" className="hover:text-[#FF6B00] transition flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> System Status: All Zones Operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
