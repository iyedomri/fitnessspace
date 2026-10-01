'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import {
  User,
  Bell,
  ShieldCheck,
  QrCode,
  Smartphone,
  CreditCard,
  Watch,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser, setIsQrModalOpen, showToast } = useGym();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [goal, setGoal] = useState(user.fitnessGoal);
  const [level, setLevel] = useState(user.fitnessLevel);

  const [connectedDevices, setConnectedDevices] = useState({
    appleWatch: true,
    whoop: true,
    strava: false,
    garmin: false,
  });

  const [notifs, setNotifs] = useState({
    smsReminders: true,
    emailReceipts: true,
    quietGymAlerts: true,
    flashSales: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone, fitnessGoal: goal, fitnessLevel: level });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              Account, Wearables & Billing Preferences
            </span>
            <h1 className="h1-display text-white mt-1">PROFILE & SETTINGS</h1>
          </div>
          <button onClick={() => setIsQrModalOpen(true)} className="btn-primary btn-compact self-start">
            <QrCode className="w-4 h-4" /> Open Door QR Pass
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Personal Info Form */}
          <form onSubmit={handleSave} className="lg:col-span-7 gym-card space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-[#2A2A2A]">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FF6B00]"
              />
              <div>
                <h2 className="h3-display text-white">{user.name}</h2>
                <p className="text-xs text-[#FF6B00] font-bold">
                  {user.plan} Unlimited • Member ID: {user.memberId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Mobile Phone (SMS Alerts)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Fitness Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Primary Fitness Goal</label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary py-3.5 px-8 text-xs">
              Save Profile Settings
            </button>
          </form>

          {/* Right 5 Cols: Connected Wearables + Notification Preferences + Billing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="gym-card space-y-4">
              <h3 className="h3-display text-white flex items-center gap-2">
                <Watch className="w-5 h-5 text-[#FF6B00]" /> CONNECTED WEARABLES
              </h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { key: 'appleWatch', label: 'Apple Health & Watch Ultra' },
                  { key: 'whoop', label: 'WHOOP 4.0 Recovery Strap' },
                  { key: 'strava', label: 'Strava Run & Ride Sync' },
                  { key: 'garmin', label: 'Garmin Connect Biometrics' },
                ].map((dev) => {
                  const isConn = connectedDevices[dev.key as keyof typeof connectedDevices];
                  return (
                    <div
                      key={dev.key}
                      className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-between"
                    >
                      <span className="font-bold text-white">{dev.label}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setConnectedDevices((prev) => ({
                            ...prev,
                            [dev.key]: !isConn,
                          }));
                          showToast(
                            !isConn ? `${dev.label} Connected ⚡` : `${dev.label} Disconnected`,
                            !isConn ? 'Heart-rate & calorie telemetry active.' : 'Sync paused.',
                            'info'
                          );
                        }}
                        className={`px-3 py-1 rounded-full font-bold ${
                          isConn
                            ? 'bg-[#22C55E]/20 text-[#22C55E]'
                            : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0]'
                        }`}
                      >
                        {isConn ? 'Synced ✓' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="gym-card space-y-4">
              <h3 className="h3-display text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#FF6B00]" /> NOTIFICATION PREFERENCES
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  { key: 'smsReminders', label: '1-Hour Pre-Class SMS Reminders (Twilio)' },
                  { key: 'emailReceipts', label: 'Booking & Store Email Receipts' },
                  { key: 'quietGymAlerts', label: 'Push Alert When Gym Drops Below 35% Capacity' },
                  { key: 'flashSales', label: '24-Hour Supplement Flash Drop Alerts' },
                ].map((item) => {
                  const val = notifs[item.key as keyof typeof notifs];
                  return (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer">
                      <span className="text-[#A0A0A0]">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) =>
                          setNotifs((prev) => ({ ...prev, [item.key]: e.target.checked }))
                        }
                        className="accent-[#FF6B00] w-4 h-4"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
