'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import {
  TrendingUp,
  Trophy,
  Camera,
  FileDown,
  Target,
  Plus,
  Flame,
  Calendar,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function ProgressPage() {
  const {
    measurements,
    prs,
    goalWeight,
    goalDate,
    addMeasurement,
    addPersonalRecord,
    updateGoal,
    showToast,
  } = useGym();

  const latest = measurements[measurements.length - 1];
  const first = measurements[0];

  // Form state for new measurement entry
  const [date, setDate] = useState('2026-10-01');
  const [weight, setWeight] = useState(String(latest.weight));
  const [bodyFat, setBodyFat] = useState(String(latest.bodyFat));
  const [chest, setChest] = useState(String(latest.chest));
  const [waist, setWaist] = useState(String(latest.waist));
  const [hips, setHips] = useState(String(latest.hips));
  const [arms, setArms] = useState(String(latest.arms));
  const [legs, setLegs] = useState(String(latest.legs));

  // New PR form
  const [prLift, setPrLift] = useState('Barbell Bench Press');
  const [prWeight, setPrWeight] = useState('250');

  // Before/After Slider Position
  const [sliderPos, setSliderPos] = useState(50);

  const handleLogMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    addMeasurement({
      date,
      weight: Number(weight),
      bodyFat: Number(bodyFat),
      chest: Number(chest),
      waist: Number(waist),
      hips: Number(hips),
      arms: Number(arms),
      legs: Number(legs),
    });
  };

  const progressPct = Math.min(
    100,
    Math.max(5, Math.round(((first.weight - latest.weight) / Math.max(1, first.weight - goalWeight)) * 100))
  );

  // True 5-Axis Radar Chart Helper (Chest, Arms, Legs, Hips, Waist)
  const radarAxes = [
    { label: 'Chest', current: latest.chest, base: first.chest, max: 50, angle: -90 },
    { label: 'Arms', current: latest.arms, base: first.arms, max: 20, angle: -18 },
    { label: 'Legs', current: latest.legs, base: first.legs, max: 30, angle: 54 },
    { label: 'Hips', current: latest.hips, base: first.hips, max: 46, angle: 126 },
    { label: 'Waist', current: latest.waist, base: first.waist, max: 42, angle: 198 },
  ];

  const getRadarPoint = (val: number, max: number, angleDeg: number, radius = 78) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = Math.min(1, Math.max(0.2, val / max)) * radius;
    const x = 120 + r * Math.cos(rad);
    const y = 115 + r * Math.sin(rad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const currentRadarPolygon = radarAxes
    .map((a) => getRadarPoint(a.current, a.max, a.angle))
    .join(' ');
  const baseRadarPolygon = radarAxes
    .map((a) => getRadarPoint(a.base, a.max, a.angle))
    .join(' ');

  const weeklyClassesData = [
    { week: 'W1', count: 3 },
    { week: 'W2', count: 4 },
    { week: 'W3', count: 5 },
    { week: 'W4', count: 4 },
    { week: 'W5', count: 6 },
    { week: 'W6', count: 5 },
    { week: 'W7', count: 5 },
    { week: 'W8', count: 6 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header + Export PDF */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Biometric Telemetry & Strength PR Lab
            </span>
            <h1 className="h1-display text-white mt-1">ATHLETE PROGRESS TRACKER</h1>
          </div>
          <button
            onClick={() => {
              showToast('PDF Report Generated 📄', 'Exporting your 8-Week Biometric & PR Analytics PDF.', 'success');
              if (typeof window !== 'undefined') window.print();
            }}
            className="btn-secondary btn-compact self-start sm:self-auto"
          >
            <FileDown className="w-4 h-4" /> Export Data as PDF
          </button>
        </div>

        {/* GOAL SETTING WIDGET */}
        <div className="gym-card bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#FF6B00]/15 border border-[#FF6B00]/40 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <Target className="w-5 h-5 text-[#FF6B00]" />
                <span className="text-xs font-extrabold uppercase text-[#FF6B00]">Active Transformation Goal</span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                    progressPct >= 50
                      ? 'bg-[#22C55E]/20 text-[#22C55E]'
                      : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  }`}
                >
                  {progressPct >= 50 ? `ON TRACK 🔥 (${progressPct}% Complete)` : `NEEDS PUSH ⚡ (${progressPct}% Complete)`}
                </span>
              </div>
              <h2 className="h3-display text-white">
                START: {first.weight} LBS → CURRENT: {latest.weight} LBS → TARGET: {goalWeight} LBS
              </h2>
              <div className="w-full h-4 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#2A2A2A] p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B00] to-[#22C55E] rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 flex flex-wrap items-center gap-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase text-[#A0A0A0] font-bold mb-1">Goal Weight (lbs)</label>
                <input
                  type="number"
                  step="0.5"
                  value={goalWeight}
                  onChange={(e) => updateGoal(Number(e.target.value), goalDate)}
                  className="w-24 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-[#A0A0A0] font-bold mb-1">Target Date</label>
                <input
                  type="date"
                  value={goalDate}
                  onChange={(e) => updateGoal(goalWeight, e.target.value)}
                  className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CHARTS SECTION (WEIGHT LINE + RADAR CHART + WEEKLY BAR CHART)
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Weight Over Time Line Chart (5 cols) */}
          <div className="lg:col-span-5 gym-card space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="h3-display text-white">WEIGHT OVER TIME</h3>
                <p className="text-xs text-[#A0A0A0]">Last {measurements.length} logged check-ins</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold">
                -{(first.weight - latest.weight).toFixed(1)} lbs
              </span>
            </div>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
              <svg viewBox="0 0 460 190" className="w-full h-48">
                {[35, 80, 125, 165].map((y) => (
                  <line key={y} x1="25" y1={y} x2="435" y2={y} stroke="#2A2A2A" strokeDasharray="4 4" />
                ))}
                <polyline
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="3.5"
                  points={measurements
                    .map((m, idx) => {
                      const x = 35 + (idx / Math.max(1, measurements.length - 1)) * 390;
                      const y = 160 - ((m.weight - 175) / 20) * 120;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {measurements.map((m, idx) => {
                  const x = 35 + (idx / Math.max(1, measurements.length - 1)) * 390;
                  const y = 160 - ((m.weight - 175) / 20) * 120;
                  return (
                    <g key={m.id}>
                      <circle cx={x} cy={y} r="5" fill="#FF6B00" />
                      <text x={x} y={y - 10} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                        {m.weight}
                      </text>
                      <text x={x} y="182" textAnchor="middle" fill="#A0A0A0" fontSize="9">
                        W{idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 2. Body Measurements Radar / Spider Chart (4 cols) */}
          <div className="lg:col-span-4 gym-card space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="h3-display text-white">BODY RADAR CHART</h3>
                <p className="text-xs text-[#A0A0A0]">Current vs Day 1 Baseline</p>
              </div>
              <span className="text-xs font-bold text-[#FF6B00]">{latest.bodyFat}% Body Fat</span>
            </div>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 flex items-center justify-center">
              <svg viewBox="0 0 240 220" className="w-full h-48">
                {/* Concentric Radar Webs */}
                {[26, 52, 78].map((r) => (
                  <polygon
                    key={r}
                    fill="none"
                    stroke="#2A2A2A"
                    strokeWidth="1"
                    points={radarAxes
                      .map((a) => {
                        const rad = (a.angle * Math.PI) / 180;
                        return `${(120 + r * Math.cos(rad)).toFixed(1)},${(115 + r * Math.sin(rad)).toFixed(1)}`;
                      })
                      .join(' ')}
                  />
                ))}
                {/* Axis Spokes & Labels */}
                {radarAxes.map((a) => {
                  const rad = (a.angle * Math.PI) / 180;
                  const x2 = 120 + 78 * Math.cos(rad);
                  const y2 = 115 + 78 * Math.sin(rad);
                  const lx = 120 + 98 * Math.cos(rad);
                  const ly = 118 + 94 * Math.sin(rad);
                  return (
                    <g key={a.label}>
                      <line x1="120" y1="115" x2={x2} y2={y2} stroke="#2A2A2A" />
                      <text x={lx} y={ly} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">
                        {a.label} ({a.current}&quot;)
                      </text>
                    </g>
                  );
                })}
                {/* Baseline Polygon */}
                <polygon
                  points={baseRadarPolygon}
                  fill="rgba(160, 160, 160, 0.15)"
                  stroke="#A0A0A0"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                {/* Current Measurements Polygon */}
                <polygon
                  points={currentRadarPolygon}
                  fill="rgba(255, 107, 0, 0.28)"
                  stroke="#FF6B00"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          {/* 3. Classes Attended Per Week Bar Chart (3 cols) */}
          <div className="lg:col-span-3 gym-card space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="h3-display text-white">CLASSES / WEEK</h3>
              <p className="text-xs text-[#A0A0A0]">8-Week Consistency Bar Chart</p>
            </div>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 h-48 flex items-end justify-between gap-2 pt-8">
              {weeklyClassesData.map((item) => (
                <div key={item.week} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-white">{item.count}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#FF6B00] to-[#FF8524]"
                    style={{ height: `${(item.count / 6) * 100}%` }}
                  />
                  <span className="text-[10px] text-[#A0A0A0]">{item.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOG NEW MEASUREMENT FORM + PERSONAL RECORDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Measurement Form (7 cols) */}
          <form onSubmit={handleLogMeasurement} className="lg:col-span-7 gym-card space-y-4">
            <h3 className="h3-display text-white">LOG NEW BODY MEASUREMENTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Body Fat (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Chest (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Waist (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Hips (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={hips}
                  onChange={(e) => setHips(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Arms (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={arms}
                  onChange={(e) => setArms(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-semibold mb-1">Legs (in)</label>
                <input
                  type="number"
                  step="0.1"
                  value={legs}
                  onChange={(e) => setLegs(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 text-xs">
              Log New Entry & Update Radar Chart (+15 Loyalty Points)
            </button>
          </form>

          {/* Personal Records (PRs) Widget (5 cols) */}
          <div className="lg:col-span-5 gym-card space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="h3-display text-white">PERSONAL RECORDS (PRs) 🏆</h3>
                <span className="text-xs font-bold text-[#FF6B00]">Total: 1,140 lbs</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {prs.slice(0, 4).map((pr) => (
                  <div key={pr.id} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3">
                    <p className="text-xs text-[#A0A0A0] truncate">{pr.lift}</p>
                    <p className="font-display text-3xl text-[#FF6B00] mt-0.5">
                      {pr.weight} {pr.unit}
                    </p>
                    <p className="text-[10px] text-[#22C55E] font-bold">{pr.improvement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={prLift}
                onChange={(e) => setPrLift(e.target.value)}
                placeholder="Lift name..."
                className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-xs text-white"
              />
              <input
                type="number"
                value={prWeight}
                onChange={(e) => setPrWeight(e.target.value)}
                className="w-20 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-xs text-white"
              />
              <button
                type="button"
                onClick={() =>
                  addPersonalRecord({
                    lift: prLift,
                    weight: Number(prWeight),
                    unit: 'lbs',
                    date: 'Today',
                    improvement: 'New All-Time PR!',
                  })
                }
                className="bg-[#FF6B00] hover:bg-[#FF8524] text-white text-xs font-bold px-4 py-2.5 rounded-lg"
              >
                + Log PR
              </button>
            </div>
          </div>
        </div>

        {/* PRIVATE BEFORE / AFTER TRANSFORMATION PHOTOS WITH INTERACTIVE SLIDER */}
        <div className="gym-card space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="h3-display text-white flex items-center gap-2">
                <span>BEFORE & AFTER PHOTO VAULT</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-sans font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Private & Encrypted
                </span>
              </h3>
              <p className="text-xs text-[#A0A0A0]">
                Drag the comparison slider or upload a new progress photo to track visual recomposition.
              </p>
            </div>
            <label className="btn-secondary btn-compact text-xs cursor-pointer">
              <Camera className="w-4 h-4" /> Upload Progress Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={() =>
                  showToast('Photo Uploaded Privately 📸', 'Saved to your encrypted transformation vault.', 'success')
                }
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 relative">
              <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold">
                BEFORE — AUG 13 (192.0 LBS • 18.4% BF)
              </span>
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80"
                alt="Before check-in"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="bg-[#0A0A0A] border-2 border-[#FF6B00] rounded-xl p-3 relative">
              <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-bold">
                AFTER — OCT 1 ({latest.weight} LBS • {latest.bodyFat}% BF)
              </span>
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80"
                alt="Current check-in"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
