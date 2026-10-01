'use client';

import React from 'react';
import { useGym } from '@/context/GymContext';
import {
  HOURLY_CAPACITY_FORECAST,
  WEEKLY_HEATMAP_DATA,
  HEATMAP_HOUR_LABELS,
} from '@/data/gymData';
import { Radio, Bell, Clock, CheckCircle2 } from 'lucide-react';

export default function CapacityPage() {
  const {
    occupancyCount,
    maxCapacity,
    occupancyPct,
    setOccupancyCount,
    notifyWhenQuiet,
    setNotifyWhenQuiet,
    showToast,
  } = useGym();

  const status =
    occupancyPct < 40
      ? { label: 'QUIET (0-40%)', emoji: '🟢', color: 'text-[#22C55E]', bar: 'bg-[#22C55E]' }
      : occupancyPct < 70
      ? { label: 'MODERATE (40-70%)', emoji: '🟡', color: 'text-[#F59E0B]', bar: 'bg-[#F59E0B]' }
      : { label: 'BUSY (70-100%)', emoji: '🔴', color: 'text-[#EF4444]', bar: 'bg-[#EF4444]' };

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              Live Optical Turnstile Telemetry
            </span>
            <h1 className="h1-display text-white mt-1">LIVE GYM CAPACITY & HEATMAP</h1>
          </div>

          {/* Notify Me When Quiet Toggle */}
          <button
            onClick={() => {
              setNotifyWhenQuiet(!notifyWhenQuiet);
              showToast(
                !notifyWhenQuiet ? 'Quiet-Hour Push Alerts Enabled 🔔' : 'Alerts Paused',
                !notifyWhenQuiet
                  ? 'We will ping your phone the moment occupancy drops below 35%.'
                  : 'Push notifications turned off.',
                'info'
              );
            }}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 border transition ${
              notifyWhenQuiet
                ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                : 'bg-[#1A1A1A] border-[#2A2A2A] text-white hover:border-[#FF6B00]'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{notifyWhenQuiet ? 'Notify When Quiet: ON ✓' : 'Notify Me When Quiet'}</span>
          </button>
        </div>

        {/* Large Live Status Indicator Card */}
        <div className="gym-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-[#A0A0A0] uppercase font-bold">Current Club Status</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-4xl">{status.emoji}</span>
                <h2 className={`h1-display ${status.color}`}>{status.label}</h2>
              </div>
              <p className="text-sm text-white mt-1">
                <strong>{occupancyCount} / {maxCapacity}</strong> athletes currently on the floor ({occupancyPct}% capacity)
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#22C55E]/40 rounded-xl p-4 max-w-sm">
              <p className="text-xs font-bold text-[#22C55E] uppercase">💡 Smart Recommendation</p>
              <p className="text-sm font-bold text-white mt-1">
                Best time today: 2:00 PM – 4:00 PM (usually quiet, ~22% capacity)
              </p>
              <p className="text-xs text-[#A0A0A0] mt-1">
                Quietest day this week: Wednesday morning (8:00 AM – 11:00 AM)
              </p>
            </div>
          </div>

          {/* Animated Capacity Bar */}
          <div className="w-full h-5 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#2A2A2A] p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${status.bar}`}
              style={{ width: `${occupancyPct}%` }}
            />
          </div>

          {/* Simulator Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="text-[#A0A0A0] font-semibold">Test Live Sensor States:</span>
            <button onClick={() => setOccupancyCount(38)} className="px-3 py-1.5 rounded bg-[#22C55E]/20 text-[#22C55E] font-bold">
              Simulate 🟢 Quiet (25%)
            </button>
            <button onClick={() => setOccupancyCount(68)} className="px-3 py-1.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold">
              Simulate 🟡 Moderate (45%)
            </button>
            <button onClick={() => setOccupancyCount(128)} className="px-3 py-1.5 rounded bg-[#EF4444]/20 text-[#EF4444] font-bold">
              Simulate 🔴 Busy (85%)
            </button>
          </div>
        </div>

        {/* Hourly Forecast Bar Chart for Today */}
        <div className="gym-card space-y-6">
          <h3 className="h3-display text-white">HOURLY BUSYNESS FORECAST FOR TODAY</h3>
          <div className="grid grid-cols-17 gap-1.5 sm:gap-2 items-end h-48 pt-6 overflow-x-auto">
            {HOURLY_CAPACITY_FORECAST.map((item) => {
              const barColor =
                item.pct < 40 ? 'bg-[#22C55E]' : item.pct < 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
              return (
                <div key={item.hour} className="flex flex-col items-center gap-1.5 h-full justify-end min-w-[34px]">
                  <span className="text-[10px] text-[#A0A0A0] font-bold">{item.pct}%</span>
                  <div className={`w-full rounded-t-md ${barColor}`} style={{ height: `${item.pct}%` }} />
                  <span className="text-[10px] text-white font-semibold">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Patterns Heatmap Grid */}
        <div className="gym-card space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="h3-display text-white">WEEKLY HISTORICAL BUSYNESS HEATMAP</h3>
            <span className="text-xs text-[#22C55E] font-bold">
              Quietest Window: Wednesday Morning
            </span>
          </div>

          <div className="min-w-[650px] space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs text-[#A0A0A0] font-bold text-center">
              <span>Day</span>
              {HEATMAP_HOUR_LABELS.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            {WEEKLY_HEATMAP_DATA.map((row) => (
              <div key={row.day} className="grid grid-cols-12 gap-2 items-center">
                <span className="text-xs font-bold text-white">{row.day}</span>
                {row.hours.map((val, i) => {
                  const cellColor =
                    val < 40
                      ? 'bg-[#22C55E]/25 text-[#22C55E] border-[#22C55E]/30'
                      : val < 70
                      ? 'bg-[#F59E0B]/25 text-[#F59E0B] border-[#F59E0B]/30'
                      : 'bg-[#EF4444]/30 text-[#EF4444] border-[#EF4444]/40';
                  return (
                    <div
                      key={i}
                      className={`h-9 rounded-lg border flex items-center justify-center text-[11px] font-bold ${cellColor}`}
                    >
                      {val}%
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
