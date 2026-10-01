'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGym } from '@/context/GymContext';
import {
  LayoutDashboard,
  Calendar,
  TrendingUp,
  Video,
  ShoppingBag,
  Gift,
  User,
  Settings,
  LogOut,
  Flame,
  Award,
  Play,
  QrCode,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    updateUser,
    logout,
    points,
    classes,
    bookedClassIds,
    cancelClassBooking,
    products,
    addToCart,
    measurements,
    goalWeight,
    setIsQrModalOpen,
    markVideoComplete,
    showToast,
  } = useGym();

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const bookedClasses = classes.filter((c) => bookedClassIds.includes(c.id));
  const latestWeight = measurements[measurements.length - 1]?.weight || 181.4;
  const startWeight = measurements[0]?.weight || 192.0;
  const goalProgressPct = Math.min(
    100,
    Math.max(10, Math.round(((startWeight - latestWeight) / (startWeight - goalWeight)) * 100))
  );

  const handlePullRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Dashboard Synced ⚡', 'Biometric wearables & class schedule updated.', 'info');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="gym-card p-5 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2A2A2A]">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF6B00]"
              />
              <div>
                <p className="font-bold text-white leading-tight">{user.name}</p>
                <span className="text-[11px] font-bold text-[#FF6B00] uppercase">{user.plan} Member</span>
              </div>
            </div>

            <nav className="space-y-1 text-sm">
              {[
                { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
                { href: '/classes', label: 'My Bookings & Classes', icon: Calendar },
                { href: '/progress', label: 'Progress Tracker', icon: TrendingUp },
                { href: '/videos', label: 'Video Library', icon: Video },
                { href: '/store', label: 'Pro Store', icon: ShoppingBag },
                { href: '/rewards', label: `Rewards (${points} pts)`, icon: Gift },
                { href: '/trainers', label: 'My Trainer', icon: User },
                { href: '/profile', label: 'Profile Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition ${
                      item.active
                        ? 'bg-[#FF6B00] text-white shadow-btn-orange'
                        : 'text-[#A0A0A0] hover:bg-[#0A0A0A] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-[#EF4444] hover:bg-[#0A0A0A] transition pt-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-9 space-y-6">
          {/* WELCOME CARD */}
          <div className="gym-card bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#FF6B00]/15 border border-[#FF6B00]/40 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
                  Today’s Reminder: Upper Push & Metabolic Finisher at 5:30 PM
                </span>
                <h1 className="h2-display text-white mt-1">
                  GOOD MORNING, {user.name.split(' ')[0].toUpperCase()}! 💪
                </h1>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePullRefresh}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] text-white p-2.5 rounded-xl transition"
                  title="Sync Dashboard"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#FF6B00]' : ''}`} />
                </button>
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="btn-primary btn-compact text-xs"
                >
                  <QrCode className="w-4 h-4" /> Door QR Pass
                </button>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#2A2A2A]">
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
                <p className="text-xs text-[#A0A0A0]">Active Streak</p>
                <p className="font-display text-3xl text-[#FF6B00] mt-1">🔥 {user.streakDays} DAYS</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
                <p className="text-xs text-[#A0A0A0]">Loyalty Points</p>
                <p className="font-display text-3xl text-[#22C55E] mt-1">⭐ {points.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
                <p className="text-xs text-[#A0A0A0]">Classes This Month</p>
                <p className="font-display text-3xl text-white mt-1">📅 {user.classesThisMonth}</p>
              </div>
            </div>
          </div>

          {/* ROW 2: UPCOMING CLASSES + TODAY'S WORKOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UPCOMING CLASSES WIDGET */}
            <div className="gym-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="h3-display text-white">UPCOMING BOOKED CLASSES</h2>
                  <Link href="/classes" className="text-xs font-bold text-[#FF6B00] hover:underline">
                    Book More →
                  </Link>
                </div>

                <div className="space-y-3">
                  {bookedClasses.slice(0, 3).map((cls) => (
                    <div
                      key={cls.id}
                      className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#FF6B00]">{cls.type}</span>
                        <p className="font-bold text-sm text-white">{cls.name}</p>
                        <p className="text-xs text-[#A0A0A0]">
                          {cls.dateLabel} • {cls.time} • {cls.trainerName}
                        </p>
                      </div>
                      <button
                        onClick={() => cancelClassBooking(cls.id)}
                        className="text-xs font-bold text-[#EF4444] hover:bg-[#EF4444]/15 px-2.5 py-1.5 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                  {bookedClasses.length === 0 && (
                    <p className="text-xs text-[#A0A0A0] py-4">No upcoming classes booked yet.</p>
                  )}
                </div>
              </div>

              <Link href="/classes" className="btn-secondary w-full py-2.5 text-xs">
                Book More Classes
              </Link>
            </div>

            {/* TODAY'S WORKOUT CARD */}
            <div className="gym-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold">
                    Assigned by Coach Marcus Vance
                  </span>
                  <span className="text-xs text-[#A0A0A0]">45 Min • Hypertrophy</span>
                </div>
                <h2 className="h3-display text-white">TODAY’S WORKOUT: CHEST & BACK SUPERSETS</h2>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  4 compound blocks: Incline Barbell Press, Weighted Pull-Ups, Flat DB Press, and Cable Lat Pullovers.
                </p>

                <div className="mt-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">1. Incline Barbell Bench</span>
                    <span className="text-[#FF6B00] font-bold">4 sets × 8 reps @ 195 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">2. Chest-Supported T-Bar Row</span>
                    <span className="text-[#FF6B00] font-bold">4 sets × 10 reps @ 160 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">3. Assault Bike Tabata Finisher</span>
                    <span className="text-[#22C55E] font-bold">8 rounds (20s Sprint / 10s Rest)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Link href="/videos?play=vid-2" className="btn-primary flex-1 py-3 text-xs">
                  <Play className="w-4 h-4 fill-white" /> Start Workout Video
                </Link>
                <button
                  onClick={() => {
                    markVideoComplete('vid-2');
                    setWorkoutStarted(true);
                  }}
                  className="btn-secondary px-4 py-3 text-xs"
                >
                  {workoutStarted ? 'Completed ✓' : 'Log Complete (+20 Pts)'}
                </button>
              </div>
            </div>
          </div>

          {/* ROW 3: PROGRESS SNAPSHOT + ACHIEVEMENTS + MEMBERSHIP STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PROGRESS SNAPSHOT */}
            <div className="gym-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="h3-display text-white">PROGRESS SNAPSHOT</h3>
                <Link href="/progress" className="text-xs text-[#FF6B00] font-bold">
                  Full Lab →
                </Link>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#A0A0A0]">Current Weight</span>
                  <span className="font-bold text-white">{latestWeight} lbs (Goal: {goalWeight} lbs)</span>
                </div>
                <div className="w-full h-2.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#22C55E]" style={{ width: `${goalProgressPct}%` }} />
                </div>
                <p className="text-[11px] text-[#22C55E] font-bold mt-1.5">
                  🔥 {goalProgressPct}% toward target goal — On Track!
                </p>
              </div>

              {/* Mini 4-Week Attendance Bar Chart */}
              <div>
                <p className="text-xs text-[#A0A0A0] mb-2">Last 4 Weeks Attendance (Sessions/Wk)</p>
                <div className="grid grid-cols-4 gap-2 items-end h-20 pt-2">
                  {[
                    { wk: 'W1', count: 4, h: '65%' },
                    { wk: 'W2', count: 5, h: '80%' },
                    { wk: 'W3', count: 4, h: '65%' },
                    { wk: 'W4', count: 6, h: '100%' },
                  ].map((b) => (
                    <div key={b.wk} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-[#FF6B00] rounded-t-md" style={{ height: b.h }} />
                      <span className="text-[10px] text-[#A0A0A0]">{b.wk} ({b.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ACHIEVEMENTS WIDGET */}
            <div className="gym-card space-y-4">
              <h3 className="h3-display text-white">ACHIEVEMENTS</h3>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="bg-[#0A0A0A] border border-[#FF6B00]/40 rounded-xl p-3">
                  <span className="text-2xl">🔥</span>
                  <p className="text-xs font-bold text-white mt-1">14-Day Streak</p>
                  <p className="text-[10px] text-[#22C55E]">Unlocked</p>
                </div>
                <div className="bg-[#0A0A0A] border border-[#FF6B00]/40 rounded-xl p-3">
                  <span className="text-2xl">🏋️</span>
                  <p className="text-xs font-bold text-white mt-1">1,000 lb Club</p>
                  <p className="text-[10px] text-[#22C55E]">Unlocked</p>
                </div>
              </div>
              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-xs">
                <p className="font-bold text-white">Next Badge: Iron Century 🏆</p>
                <p className="text-[#A0A0A0] mt-0.5">Complete 2 more workouts this week to unlock +100 bonus points!</p>
              </div>
            </div>

            {/* MEMBERSHIP STATUS CARD */}
            <div className="gym-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="h3-display text-white">MEMBERSHIP</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5 text-xs space-y-1">
                  <p className="font-bold text-base text-[#FF6B00]">{user.plan} Unlimited Plan</p>
                  <p className="text-[#A0A0A0]">Renews on: {user.expiryDate}</p>
                </div>

                <label className="flex items-center justify-between text-xs text-white cursor-pointer pt-1">
                  <span>Auto-Renewal Enabled</span>
                  <input
                    type="checkbox"
                    checked={user.autoRenew}
                    onChange={(e) => updateUser({ autoRenew: e.target.checked })}
                    className="accent-[#FF6B00] w-4 h-4"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <Link
                  href="/pricing"
                  className="bg-[#FF6B00] text-white font-bold py-2 rounded-lg text-center"
                >
                  Upgrade
                </Link>
                <button
                  onClick={() => showToast('Membership Paused', 'Your billing cycle is frozen for up to 30 days.', 'info')}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white py-2 rounded-lg font-semibold"
                >
                  Pause
                </button>
                <button
                  onClick={() => showToast('Support Notified', 'Concierge can assist with plan changes.', 'info')}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] text-[#EF4444] py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* STORE QUICK ACCESS WITH MEMBER DISCOUNT */}
          <div className="gym-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="h3-display text-white">MEMBER STORE QUICK ACCESS (10% PRO DISCOUNT APPLIED)</h3>
              </div>
              <Link href="/store" className="text-xs font-bold text-[#FF6B00] hover:underline">
                View Full Store →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.slice(0, 3).map((prd) => (
                <div
                  key={prd.id}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5 flex items-center gap-3.5"
                >
                  <img src={prd.image} alt={prd.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-white truncate">{prd.name}</p>
                    <p className="text-xs text-[#22C55E] font-bold mt-0.5">
                      ${(prd.price * 0.9).toFixed(2)}{' '}
                      <span className="text-[#A0A0A0] line-through font-normal">${prd.price}</span>
                    </p>
                    <button
                      onClick={() => addToCart(prd)}
                      className="mt-2 bg-[#FF6B00] text-white text-[11px] font-bold px-3 py-1 rounded"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
