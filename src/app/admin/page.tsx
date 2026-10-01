'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { WEEKLY_HEATMAP_DATA, HEATMAP_HOUR_LABELS, AdminMember } from '@/data/gymData';
import {
  Users,
  DollarSign,
  Calendar,
  ShoppingBag,
  Send,
  FileDown,
  Plus,
  Trash2,
  Search,
  UserCheck,
  ShieldAlert,
  TrendingUp,
  Eye,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    gymName,
    setGymName,
    adminMembers,
    updateAdminMemberStatus,
    updateAdminMemberPlan,
    classes,
    addAdminClass,
    deleteAdminClass,
    trainers,
    bookedSessions,
    products,
    addAdminProduct,
    orders,
    showToast,
  } = useGym();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'members' | 'classes' | 'trainers' | 'store' | 'broadcast'
  >('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [viewingMember, setViewingMember] = useState<AdminMember | null>(null);

  // Add Class form state
  const [newClassName, setNewClassName] = useState('');
  const [newClassType, setNewClassType] = useState<'HIIT' | 'Strength' | 'Yoga' | 'Cardio' | 'Boxing'>('HIIT');
  const [newClassTrainer, setNewClassTrainer] = useState('Marcus Vance');
  const [newClassTime, setNewClassTime] = useState('06:00 PM');
  const [newClassCapacity, setNewClassCapacity] = useState('20');

  // Add Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('49.99');
  const [newProdStock, setNewProdStock] = useState('35');

  // Broadcast form state
  const [broadcastChannel, setBroadcastChannel] = useState<'Both' | 'SMS' | 'Email'>('Both');
  const [broadcastSegment, setBroadcastSegment] = useState('All 548 Active Members');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const filteredMembers = adminMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === 'All' || m.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const handleExportReport = (format: 'PDF' | 'Excel') => {
    showToast(
      `${format} Executive Report Ready 📊`,
      `Exported Revenue, Member Roster, and Class Attendance (${format}).`,
      'success'
    );
    if (format === 'PDF' && typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar + Reports Export */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Gym Owner & Operations Control Center
            </span>
            <h1 className="h1-display text-white mt-1">ADMIN EXECUTIVE DASHBOARD</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleExportReport('PDF')}
              className="btn-secondary btn-compact text-xs"
            >
              <FileDown className="w-4 h-4" /> Export PDF Report
            </button>
            <button
              onClick={() => handleExportReport('Excel')}
              className="btn-primary btn-compact text-xs"
            >
              <FileDown className="w-4 h-4" /> Export Excel / CSV
            </button>
          </div>
        </div>

        {/* OVERVIEW KPI CARDS ROW (5 CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Members', value: '548', delta: '+12.4% vs last mo', color: 'text-white' },
            { label: 'New This Month', value: '+64', delta: '94.2% retention', color: 'text-[#22C55E]' },
            { label: 'Monthly Revenue', value: '$38,420', delta: '+$6,150 vs last mo', color: 'text-[#FF6B00]' },
            { label: 'Active Classes Today', value: String(classes.length), delta: '91% avg attendance', color: 'text-white' },
            { label: 'Store Orders Pending', value: String(orders.length), delta: '$1,840 today', color: 'text-[#F59E0B]' },
          ].map((kpi) => (
            <div key={kpi.label} className="gym-card p-5 space-y-1">
              <p className="text-xs text-[#A0A0A0] font-semibold uppercase">{kpi.label}</p>
              <p className={`font-display text-4xl ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[11px] text-[#22C55E] font-bold">{kpi.delta}</p>
            </div>
          ))}
        </div>

        {/* Management Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#2A2A2A] pb-4">
          {[
            { id: 'overview', label: '📊 5 Executive Charts' },
            { id: 'members', label: '👥 Members List' },
            { id: 'classes', label: '📅 Classes Management' },
            { id: 'trainers', label: '👨‍💼 Trainers & Bookings' },
            { id: 'store', label: '🛒 Store & Inventory' },
            { id: 'broadcast', label: '📣 Notifications Center' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition min-h-[44px] ${
                activeTab === tab.id
                  ? 'bg-[#FF6B00] text-white shadow-btn-orange'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            TAB 1: ALL 5 REQUIRED ADMIN CHARTS
        ══════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chart 1: Revenue Chart (This Month vs Last Month Line) */}
              <div className="lg:col-span-5 gym-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="h3-display text-white">1. REVENUE: THIS MONTH VS LAST</h3>
                    <p className="text-xs text-[#A0A0A0]">Memberships + PT + Store Checkout</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold">
                    +19.1% YoY
                  </span>
                </div>
                <svg viewBox="0 0 460 175" className="w-full h-44 bg-[#0A0A0A] rounded-xl p-3 border border-[#2A2A2A]">
                  {[35, 80, 125].map((y) => (
                    <line key={y} x1="20" y1={y} x2="440" y2={y} stroke="#2A2A2A" strokeDasharray="3 3" />
                  ))}
                  {/* Last Month Dashed Line */}
                  <polyline
                    fill="none"
                    stroke="#A0A0A0"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    points="25,140 125,120 225,105 325,90 430,75"
                  />
                  {/* This Month Solid Orange Line */}
                  <polyline
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="3.5"
                    points="25,125 125,95 225,70 325,45 430,22"
                  />
                  {[
                    { x: 25, y: 125, val: '$8k' },
                    { x: 125, y: 95, val: '$16k' },
                    { x: 225, y: 70, val: '$24k' },
                    { x: 325, y: 45, val: '$31k' },
                    { x: 430, y: 22, val: '$38.4k' },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="4.5" fill="#FF6B00" />
                      <text x={pt.x} y={pt.y - 8} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">
                        {pt.val}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="flex justify-between text-xs text-[#A0A0A0]">
                  <span className="text-[#FF6B00] font-bold">● This Month ($38,420)</span>
                  <span>--- Last Month ($32,270)</span>
                </div>
              </div>

              {/* Chart 2: New Members vs Cancellations (Bar Chart) */}
              <div className="lg:col-span-4 gym-card space-y-4">
                <div>
                  <h3 className="h3-display text-white">2. NEW MEMBERS VS CHURN</h3>
                  <p className="text-xs text-[#A0A0A0]">Monthly Signups (Green) vs Cancellations (Red)</p>
                </div>

                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 h-44 flex items-end justify-between gap-3 pt-6">
                  {[
                    { mo: 'Jun', joined: 48, churn: 9 },
                    { mo: 'Jul', joined: 52, churn: 8 },
                    { mo: 'Aug', joined: 58, churn: 7 },
                    { mo: 'Sep', joined: 61, churn: 6 },
                    { mo: 'Oct', joined: 64, churn: 5 },
                  ].map((item) => (
                    <div key={item.mo} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div
                          className="w-3.5 bg-[#22C55E] rounded-t"
                          style={{ height: `${(item.joined / 70) * 100}%` }}
                          title={`New: ${item.joined}`}
                        />
                        <div
                          className="w-3.5 bg-[#EF4444] rounded-t"
                          style={{ height: `${(item.churn / 70) * 100}%` }}
                          title={`Cancelled: ${item.churn}`}
                        />
                      </div>
                      <span className="text-[10px] text-[#A0A0A0] font-bold">{item.mo}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-[#22C55E] font-bold">■ +64 Joined (Oct)</span>
                  <span className="text-[#EF4444] font-bold">■ 5 Cancelled (0.9% Churn)</span>
                </div>
              </div>

              {/* Chart 5: Class Attendance Rate by Class Type (SVG Donut / Pie Chart) */}
              <div className="lg:col-span-3 gym-card space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="h3-display text-white">3. ATTENDANCE BY TYPE</h3>
                  <p className="text-xs text-[#A0A0A0]">Share of Weekly Bookings</p>
                </div>

                <div className="flex items-center justify-center py-2">
                  <svg viewBox="0 0 120 120" className="w-36 h-36">
                    <circle cx="60" cy="60" r="44" fill="none" stroke="#2A2A2A" strokeWidth="16" />
                    {/* HIIT 40% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="#FF6B00"
                      strokeWidth="16"
                      strokeDasharray="110 276"
                      strokeDashoffset="0"
                    />
                    {/* Strength 32% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="16"
                      strokeDasharray="88 276"
                      strokeDashoffset="-110"
                    />
                    {/* Yoga & Boxing 28% */}
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="16"
                      strokeDasharray="78 276"
                      strokeDashoffset="-198"
                    />
                    <text x="60" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                      91%
                    </text>
                    <text x="60" y="71" textAnchor="middle" fill="#A0A0A0" fontSize="8">
                      FILL RATE
                    </text>
                  </svg>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#FF6B00] font-bold">● HIIT & MetCon</span>
                    <span className="text-white font-bold">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#22C55E] font-bold">● Strength Club</span>
                    <span className="text-white font-bold">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F59E0B] font-bold">● Yoga & Boxing</span>
                    <span className="text-white font-bold">28%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 of Admin Charts: Best Selling Products (Horizontal Bar) + Peak Hours Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chart 4: Best Selling Products Horizontal Bar (5 cols) */}
              <div className="lg:col-span-5 gym-card space-y-4">
                <h3 className="h3-display text-white">4. BEST SELLING STORE PRODUCTS</h3>
                <div className="space-y-3.5 text-xs">
                  {[
                    { name: 'APEX ISO-Pure Whey Isolate (5 lbs)', units: 312, rev: '$17,156', pct: '94%' },
                    { name: 'IGNITE Overdrive Pre-Workout', units: 248, rev: '$9,173', pct: '78%' },
                    { name: 'Stealth Performance Hoodie', units: 195, rev: '$13,260', pct: '65%' },
                    { name: 'Titan 10mm Lever Power Belt', units: 164, rev: '$16,236', pct: '54%' },
                    { name: 'Thermo-Lock Stainless Shaker', units: 176, rev: '$4,398', pct: '58%' },
                  ].map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold truncate pr-2">{item.name}</span>
                        <span className="text-[#FF6B00] font-bold shrink-0">
                          {item.units} sold ({item.rev})
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0A0A0A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 3: Peak Hours Heatmap (7 cols) */}
              <div className="lg:col-span-7 gym-card space-y-4 overflow-x-auto">
                <div className="flex items-center justify-between">
                  <h3 className="h3-display text-white">5. PEAK HOURS FLOOR OCCUPANCY HEATMAP</h3>
                  <span className="text-xs text-[#EF4444] font-bold">Peak Window: 5 PM – 7 PM</span>
                </div>

                <div className="min-w-[520px] space-y-1.5">
                  <div className="grid grid-cols-12 gap-1.5 text-[10px] text-[#A0A0A0] font-bold text-center">
                    <span>Day</span>
                    {HEATMAP_HOUR_LABELS.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                  {WEEKLY_HEATMAP_DATA.slice(0, 5).map((row) => (
                    <div key={row.day} className="grid grid-cols-12 gap-1.5 items-center">
                      <span className="text-xs font-bold text-white">{row.day}</span>
                      {row.hours.map((val, idx) => (
                        <div
                          key={idx}
                          className={`h-7 rounded flex items-center justify-center text-[10px] font-bold ${
                            val < 40
                              ? 'bg-[#22C55E]/20 text-[#22C55E]'
                              : val < 70
                              ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                              : 'bg-[#EF4444]/30 text-[#EF4444]'
                          }`}
                        >
                          {val}%
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 2: MEMBERS MANAGEMENT
        ══════════════════════════════════════════ */}
        {activeTab === 'members' && (
          <div className="gym-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="h3-display text-white">MEMBER DIRECTORY ({filteredMembers.length})</h3>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search member name or email..."
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2 text-xs text-white"
                />
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="All">All Plans</option>
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-[#A0A0A0] uppercase">
                    <th className="py-3">Member</th>
                    <th className="py-3">Plan</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Points</th>
                    <th className="py-3">Last Check-In</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {filteredMembers.map((m) => (
                    <tr key={m.id}>
                      <td className="py-3.5 flex items-center gap-2.5">
                        <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-white">{m.name}</p>
                          <p className="text-[10px] text-[#A0A0A0]">{m.email}</p>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <select
                          value={m.plan}
                          onChange={(e) => updateAdminMemberPlan(m.id, e.target.value as 'Basic' | 'Pro' | 'Elite')}
                          className="bg-[#0A0A0A] border border-[#2A2A2A] rounded px-2 py-1 text-white font-bold"
                        >
                          <option value="Basic">Basic ($29)</option>
                          <option value="Pro">Pro ($59)</option>
                          <option value="Elite">Elite ($99)</option>
                        </select>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold ${
                            m.status === 'Active'
                              ? 'bg-[#22C55E]/20 text-[#22C55E]'
                              : m.status === 'Paused'
                              ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                              : 'bg-[#EF4444]/20 text-[#EF4444]'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-[#FF6B00]">{m.points} pts</td>
                      <td className="py-3.5 text-[#A0A0A0]">{m.lastCheckIn}</td>
                      <td className="py-3.5 space-x-2">
                        <button
                          onClick={() => setViewingMember(m)}
                          className="px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] text-white"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() =>
                            updateAdminMemberStatus(m.id, m.status === 'Active' ? 'Suspended' : 'Active')
                          }
                          className="px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#2A2A2A] text-[#EF4444]"
                        >
                          {m.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {viewingMember && (
              <div className="bg-[#0A0A0A] border-2 border-[#FF6B00] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <img src={viewingMember.avatar} alt={viewingMember.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-sm text-white">{viewingMember.name} ({viewingMember.id})</p>
                    <p className="text-[#A0A0A0]">
                      Joined {viewingMember.joinDate} • Monthly Spend: ${viewingMember.monthlySpend}/mo • {viewingMember.points} Loyalty Pts
                    </p>
                  </div>
                </div>
                <button onClick={() => setViewingMember(null)} className="text-[#A0A0A0] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 3: CLASSES MANAGEMENT
        ══════════════════════════════════════════ */}
        {activeTab === 'classes' && (
          <div className="gym-card space-y-5">
            <h3 className="h3-display text-white">SCHEDULE NEW CLASS OR ASSIGN TRAINER</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Class Name (e.g. Kettlebell Shred)"
                className="sm:col-span-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
              />
              <select
                value={newClassType}
                onChange={(e) => setNewClassType(e.target.value as typeof newClassType)}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
              >
                <option value="HIIT">HIIT</option>
                <option value="Strength">Strength</option>
                <option value="Yoga">Yoga</option>
                <option value="Boxing">Boxing</option>
                <option value="Cardio">Cardio</option>
              </select>
              <select
                value={newClassTrainer}
                onChange={(e) => setNewClassTrainer(e.target.value)}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
              >
                {trainers.map((t) => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (!newClassName.trim()) return;
                  addAdminClass({
                    name: newClassName.toUpperCase(),
                    type: newClassType,
                    trainerId: 'tr-1',
                    trainerName: newClassTrainer,
                    trainerAvatar: trainers[0].photo,
                    day: 'Today',
                    dateLabel: 'Thu, Oct 1',
                    time: newClassTime,
                    duration: '45 min',
                    spotsLeft: Number(newClassCapacity),
                    maxSpots: Number(newClassCapacity),
                    difficulty: 4,
                    calories: '650 kcal',
                    room: 'Studio A',
                    level: 'All Levels',
                    description: 'Admin-created signature group session.',
                  });
                  setNewClassName('');
                }}
                className="btn-primary py-2.5 text-xs"
              >
                + Publish Class
              </button>
            </div>

            <div className="space-y-2">
              {classes.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-[#FF6B00] font-bold uppercase mr-2">[{c.type}]</span>
                    <span className="font-bold text-white">{c.name}</span>
                    <p className="text-[#A0A0A0] mt-0.5">
                      {c.day} at {c.time} • Coach {c.trainerName} • Capacity: {c.maxSpots - c.spotsLeft}/{c.maxSpots} booked
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAdminClass(c.id)}
                    className="px-3 py-1.5 rounded bg-[#EF4444]/15 text-[#EF4444] font-bold"
                  >
                    Cancel Class
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 4: TRAINERS MANAGEMENT & PT BOOKINGS
        ══════════════════════════════════════════ */}
        {activeTab === 'trainers' && (
          <div className="gym-card space-y-6">
            <h3 className="h3-display text-white">PERSONAL TRAINER ROSTER & CLIENT BOOKINGS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trainers.map((tr) => (
                <div key={tr.id} className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 flex items-center gap-3.5">
                  <img src={tr.photo} alt={tr.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="text-xs">
                    <p className="font-bold text-white">{tr.name}</p>
                    <p className="text-[#FF6B00]">{tr.role}</p>
                    <p className="text-[#A0A0A0] mt-0.5">⭐ {tr.rating} ({tr.reviewsCount} reviews) • ${tr.pricing.single}/hr</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-display text-2xl text-white mb-3">RECENT 1-ON-1 PT SESSION BOOKINGS</h4>
              <div className="space-y-2 text-xs">
                {bookedSessions.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] flex justify-between">
                    <div>
                      <p className="font-bold text-white">{s.packageType} with {s.trainerName}</p>
                      <p className="text-[#A0A0A0]">{s.date} at {s.slot}</p>
                    </div>
                    <span className="font-bold text-[#22C55E]">${s.price} Paid ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 5: STORE & INVENTORY MANAGEMENT
        ══════════════════════════════════════════ */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            <div className="gym-card space-y-4">
              <h3 className="h3-display text-white">ADD NEW PRODUCT TO STORE INVENTORY</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Product Name (e.g. APEX Electrolyte Packets)"
                  className="sm:col-span-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                />
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="Price ($)"
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                />
                <button
                  onClick={() => {
                    if (!newProdName.trim()) return;
                    addAdminProduct({
                      name: newProdName.toUpperCase(),
                      category: 'Supplements',
                      price: Number(newProdPrice),
                      rating: 5.0,
                      reviewsCount: 1,
                      image: products[0].image,
                      hoverImage: products[0].hoverImage,
                      badge: 'NEW DROP',
                      inStock: true,
                      stockCount: Number(newProdStock),
                      description: 'Newly added store product.',
                    });
                    setNewProdName('');
                  }}
                  className="btn-primary py-2.5 text-xs"
                >
                  + Add Product
                </button>
              </div>
            </div>

            <div className="gym-card space-y-4">
              <h3 className="h3-display text-white">PENDING & RECENT STORE ORDERS ({orders.length})</h3>
              <div className="space-y-2 text-xs">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-white">{o.id} — {o.customer}</p>
                      <p className="text-[#A0A0A0]">{o.items} items • {o.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#FF6B00]">${o.total.toFixed(2)}</span>
                      <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] font-bold">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 6: NOTIFICATIONS BROADCAST CENTER
        ══════════════════════════════════════════ */}
        {activeTab === 'broadcast' && (
          <div className="gym-card space-y-5">
            <h3 className="h3-display text-white">SEND MASS EMAIL / SMS TO MEMBERS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Delivery Channel</label>
                <select
                  value={broadcastChannel}
                  onChange={(e) => setBroadcastChannel(e.target.value as typeof broadcastChannel)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                >
                  <option value="Both">Twilio SMS + Resend Email (Recommended)</option>
                  <option value="SMS">Twilio SMS Push Only</option>
                  <option value="Email">Resend HTML Email Only</option>
                </select>
              </div>
              <div>
                <label className="block text-[#A0A0A0] font-bold uppercase mb-1">Target Member Segment</label>
                <select
                  value={broadcastSegment}
                  onChange={(e) => setBroadcastSegment(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                >
                  <option>All 548 Active Members</option>
                  <option>Pro & Elite Members Only (412)</option>
                  <option>Members Inactive 7+ Days (39)</option>
                </select>
              </div>
            </div>

            <textarea
              rows={4}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Write your announcement (e.g. 'Hey Athlete! Saturday DJ Barbell Party starts at 10 AM + 20% off all Whey Isolate in the store!')"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 text-sm text-white outline-none focus:border-[#FF6B00]"
            />

            <button
              onClick={() => {
                showToast(
                  'Mass Broadcast Dispatched! 📣',
                  `Sent via ${broadcastChannel} to ${broadcastSegment}.`,
                  'success'
                );
                setBroadcastMessage('');
              }}
              className="btn-primary py-3.5 px-8 text-xs"
            >
              <Send className="w-4 h-4" /> Send Broadcast Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
