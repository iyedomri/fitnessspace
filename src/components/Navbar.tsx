'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGym, Language } from '@/context/GymContext';
import {
  Dumbbell,
  Bell,
  ShoppingBag,
  Menu,
  X,
  QrCode,
  Award,
  User,
  LayoutDashboard,
  TrendingUp,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronDown,
  Globe,
  Flame,
  Calendar,
  Home,
  Video,
  Radio,
  Gift,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    gymName,
    lang,
    setLang,
    t,
    isLoggedIn,
    user,
    login,
    logout,
    points,
    cart,
    setIsCartOpen,
    occupancyPct,
    setIsQrModalOpen,
    setIsPromoModalOpen,
  } = useGym();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/classes', label: t('nav_classes') },
    { href: '/trainers', label: t('nav_trainers') },
    { href: '/store', label: t('nav_store') },
    { href: '/pricing', label: t('nav_pricing') },
    { href: '/videos', label: t('nav_videos') },
    { href: '/capacity', label: t('nav_capacity'), isLive: true },
    { href: '/rewards', label: t('nav_rewards') },
  ];

  const capacityColor =
    occupancyPct < 40 ? 'bg-[#22C55E]' : occupancyPct < 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';

  return (
    <>
      {/* Top Conversion Promo Strip */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#FF6B00]/20 to-[#1A1A1A] border-b border-[#2A2A2A] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#FFFFFF] font-medium">
            <span className="inline-flex items-center gap-1 bg-[#FF6B00] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Free Trial
            </span>
            <span>First 7 Days FREE — Zero Commitment, No Credit Card Needed!</span>
            <button
              onClick={() => setIsPromoModalOpen(true)}
              className="text-[#FF6B00] underline font-bold hover:text-white transition ml-1"
            >
              Claim Pass →
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#A0A0A0]">
            <Link href="/capacity" className="flex items-center gap-1.5 hover:text-white transition">
              <span className={`w-2 h-2 rounded-full ${capacityColor} animate-pulse`} />
              <span>Live Gym Occupancy: <strong className="text-white">{occupancyPct}%</strong></span>
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-[#FF6B00] hover:underline font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Admin Portal
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition">
              24/7 Open Access
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-btn-orange group-hover:scale-105 transition">
              <Dumbbell className="w-6 h-6 text-white -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl tracking-wider text-white leading-none">
                APEX <span className="text-[#FF6B00]">FITNESS</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#A0A0A0] font-semibold">
                Performance Club
              </span>
            </div>
          </Link>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                      : 'text-[#FFFFFF] hover:text-[#FF6B00] hover:bg-[#1A1A1A]'
                  }`}
                >
                  {link.isLive && (
                    <span className={`w-2 h-2 rounded-full ${capacityColor} animate-ping`} />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multi-language switcher */}
            <div className="hidden sm:flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-0.5 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#A0A0A0] ml-2 mr-1" />
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md font-bold uppercase transition ${
                    lang === l
                      ? 'bg-[#FF6B00] text-white'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                  aria-label={`Switch language to ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* QR Check-in Button */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2A2A2A] hover:border-[#FF6B00] text-white px-3 py-2.5 rounded-lg text-xs font-bold transition min-h-[44px]"
              title="Member QR Door Check-In"
            >
              <QrCode className="w-4 h-4 text-[#FF6B00]" />
              <span>Check-In</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00] flex items-center justify-center text-white transition"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF6B00] text-white text-[11px] font-bold flex items-center justify-center shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <>
                {/* Points Badge */}
                <Link
                  href="/rewards"
                  className="hidden sm:flex items-center gap-1.5 bg-[#1A1A1A] border border-[#FF6B00]/40 hover:border-[#FF6B00] px-3 py-2 rounded-full text-xs font-bold text-white transition min-h-[40px]"
                >
                  <Award className="w-4 h-4 text-[#FF6B00]" />
                  <span className="text-[#FF6B00]">{points.toLocaleString()}</span>
                  <span className="text-[#A0A0A0] hidden lg:inline">PTS</span>
                </Link>

                {/* Notification Bell */}
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => {
                      setNotifOpen(!notifOpen);
                      setUserDropdownOpen(false);
                    }}
                    className="relative w-11 h-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00] flex items-center justify-center text-white transition"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-[#FF6B00] ring-2 ring-[#0A0A0A]" />
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl p-4 z-50">
                      <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
                        <span className="font-bold text-sm">Notifications</span>
                        <span className="text-xs text-[#FF6B00] font-semibold">3 New</span>
                      </div>
                      <div className="divide-y divide-[#2A2A2A] text-xs max-h-64 overflow-y-auto">
                        <div className="py-3 flex gap-3">
                          <Flame className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white">Inferno MetCon 45 Starts Soon!</p>
                            <p className="text-[#A0A0A0] mt-0.5">Studio A — Don’t forget your sweat towel & shaker.</p>
                          </div>
                        </div>
                        <div className="py-3 flex gap-3">
                          <Award className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white">14-Day Streak Unlocked! 🔥</p>
                            <p className="text-[#A0A0A0] mt-0.5">You earned +50 bonus loyalty points this week.</p>
                          </div>
                        </div>
                        <div className="py-3 flex gap-3">
                          <Radio className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-white">Gym is Currently Moderate (43%)</p>
                            <p className="text-[#A0A0A0] mt-0.5">Great time for barbell platforms & squat racks.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(!userDropdownOpen);
                      setNotifOpen(false);
                    }}
                    className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00] rounded-xl p-1.5 pr-3 transition min-h-[44px]"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover border border-[#FF6B00]"
                    />
                    <div className="hidden md:flex flex-col items-start text-left">
                      <span className="text-xs font-bold text-white leading-tight">{user.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#FF6B00] font-bold uppercase">{user.plan} Member</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#A0A0A0]" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onClick={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-[#2A2A2A]">
                        <p className="font-bold text-sm text-white">{user.name}</p>
                        <p className="text-xs text-[#A0A0A0] truncate">{user.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-bold uppercase">
                            {user.plan} Plan
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold">
                            🔥 {user.streakDays}d Streak
                          </span>
                        </div>
                      </div>

                      <div className="py-1 text-sm">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#2A2A2A] hover:text-[#FF6B00] transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#FF6B00]" />
                          Member Dashboard
                        </Link>
                        <Link
                          href="/progress"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#2A2A2A] hover:text-[#FF6B00] transition"
                        >
                          <TrendingUp className="w-4 h-4 text-[#FF6B00]" />
                          Progress Tracker
                        </Link>
                        <Link
                          href="/videos"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#2A2A2A] hover:text-[#FF6B00] transition"
                        >
                          <Video className="w-4 h-4 text-[#FF6B00]" />
                          Workout Video Library
                        </Link>
                        <Link
                          href="/rewards"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#2A2A2A] hover:text-[#FF6B00] transition"
                        >
                          <Gift className="w-4 h-4 text-[#FF6B00]" />
                          Loyalty Rewards ({points} pts)
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-white hover:bg-[#2A2A2A] hover:text-[#FF6B00] transition"
                        >
                          <Settings className="w-4 h-4 text-[#FF6B00]" />
                          Profile Settings
                        </Link>
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[#FF6B00] font-semibold hover:bg-[#2A2A2A] transition border-t border-[#2A2A2A] mt-1"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          Owner / Admin Dashboard
                        </Link>
                      </div>

                      <div className="border-t border-[#2A2A2A] pt-1">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#2A2A2A] transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link href="/login" className="btn-secondary btn-compact">
                  {t('nav_login')}
                </Link>
                <Link href="/register" className="btn-primary btn-compact">
                  {t('nav_join')}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-11 h-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF6B00]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Slide-in Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 pt-3 pb-6 space-y-4 animate-fade-up">
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/', label: 'Home', icon: Home },
                { href: '/classes', label: 'Classes', icon: Calendar },
                { href: '/trainers', label: 'Trainers', icon: User },
                { href: '/store', label: 'Store', icon: ShoppingBag },
                { href: '/pricing', label: 'Membership', icon: Sparkles },
                { href: '/dashboard', label: 'Member Dashboard', icon: LayoutDashboard },
                { href: '/videos', label: 'Video Library', icon: Video },
                { href: '/progress', label: 'Progress Tracker', icon: TrendingUp },
                { href: '/capacity', label: `Live Capacity (${occupancyPct}%)`, icon: Radio },
                { href: '/rewards', label: `Rewards (${points} pts)`, icon: Gift },
                { href: '/profile', label: 'Profile Settings', icon: Settings },
                { href: '/admin', label: 'Admin Dashboard', icon: ShieldAlert },
                { href: '/contact', label: 'Contact & Map', icon: PhoneCall },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FF6B00] text-sm font-semibold text-white"
                  >
                    <Icon className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A]">
              <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-lg border border-[#2A2A2A]">
                {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase ${
                      lang === l ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0]'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQrModalOpen(true);
                }}
                className="flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00] text-[#FF6B00] px-4 py-2 rounded-lg text-xs font-bold"
              >
                <QrCode className="w-4 h-4" /> Show Door QR
              </button>
            </div>

            {!isLoggedIn && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary text-center py-3"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center py-3"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile Sticky "Join Now" Conversion Banner + 5-Tab Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-30 px-3 pointer-events-none">
        <div className="bg-[#1A1A1A]/95 backdrop-blur-md border border-[#FF6B00]/50 rounded-xl p-2.5 shadow-orange-glow flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            <span className="text-xs font-bold text-white">Start Your 7-Day Free Trial</span>
          </div>
          <Link
            href="/register"
            className="bg-[#FF6B00] text-white text-xs font-extrabold px-4 py-2 rounded-lg shadow-btn-orange"
          >
            Join Now →
          </Link>
        </div>
      </div>

      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#2A2A2A] z-40 grid grid-cols-5"
      >
        {[
          { href: '/', label: 'Home', icon: Home },
          { href: '/classes', label: 'Classes', icon: Calendar },
          { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/store', label: 'Store', icon: ShoppingBag },
          { href: '/profile', label: 'Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = tab.href === '/' ? pathname === '/' : pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 min-h-[44px] text-[11px] font-semibold transition ${
                active ? 'text-[#FF6B00]' : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
