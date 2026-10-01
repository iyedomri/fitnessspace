'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { Calendar, List, Clock, Flame, Filter, CheckCircle2, MapPin } from 'lucide-react';

export default function ClassesPage() {
  const { classes, bookedClassIds, waitlistClassIds, setActiveBookingClass } = useGym();

  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTrainer, setSelectedTrainer] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  const trainersList = Array.from(new Set(classes.map((c) => c.trainerName)));

  const filteredClasses = classes.filter((c) => {
    if (selectedDay !== 'All' && c.day !== selectedDay) return false;
    if (selectedType !== 'All' && c.type !== selectedType) return false;
    if (selectedTrainer !== 'All' && c.trainerName !== selectedTrainer) return false;
    if (selectedLevel !== 'All' && c.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">
              50+ Weekly Sessions • Live Spot Counter
            </span>
            <h1 className="h1-display text-white mt-1">GROUP TRAINING SCHEDULE</h1>
          </div>

          {/* Weekly Calendar vs List View Toggle */}
          <div className="flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-1 self-start">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid' ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <List className="w-4 h-4" /> List / Cards View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                viewMode === 'calendar' ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Weekly Calendar View
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="gym-card p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#A0A0A0] mb-1.5">Filter by Day</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FF6B00]"
            >
              {['All', 'Today', 'Friday', 'Saturday', 'Sunday', 'Monday'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#A0A0A0] mb-1.5">Filter by Class Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FF6B00]"
            >
              {['All', 'HIIT', 'Strength', 'Yoga', 'Cardio', 'Boxing'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#A0A0A0] mb-1.5">Filter by Trainer</label>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FF6B00]"
            >
              <option value="All">All Coaches</option>
              {trainersList.map((tr) => (
                <option key={tr} value={tr}>{tr}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#A0A0A0] mb-1.5">Filter by Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FF6B00]"
            >
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((lv) => (
                <option key={lv} value={lv}>{lv}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Classes Grid or Weekly Calendar */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => {
              const isBooked = bookedClassIds.includes(cls.id);
              const isWaitlisted = waitlistClassIds.includes(cls.id);

              return (
                <div key={cls.id} className="gym-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] text-xs font-extrabold uppercase">
                        {cls.type}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          cls.spotsLeft === 0
                            ? 'bg-[#EF4444]/20 text-[#EF4444]'
                            : cls.spotsLeft <= 3
                            ? 'bg-[#EF4444]/15 text-[#EF4444]'
                            : 'bg-[#22C55E]/15 text-[#22C55E]'
                        }`}
                      >
                        {cls.spotsLeft === 0
                          ? 'Waitlist Only (0 left)'
                          : cls.spotsLeft <= 3
                          ? `🔥 Only ${cls.spotsLeft} spots left!`
                          : `🟢 ${cls.spotsLeft} spots open`}
                      </span>
                    </div>

                    <div>
                      <h3 className="h3-display text-white">{cls.name}</h3>
                      <p className="text-xs text-[#A0A0A0] mt-1">{cls.description}</p>
                    </div>

                    {/* Trainer + Difficulty Dots */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={cls.trainerAvatar}
                          alt={cls.trainerName}
                          className="w-10 h-10 rounded-full object-cover border border-[#FF6B00]"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{cls.trainerName}</p>
                          <p className="text-[11px] text-[#A0A0A0]">{cls.level}</p>
                        </div>
                      </div>

                      {/* Difficulty Dots 1-5 */}
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-[#A0A0A0] block mb-1">Intensity</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className={`w-2.5 h-2.5 rounded-full ${
                                dot <= cls.difficulty ? 'bg-[#FF6B00]' : 'bg-[#2A2A2A]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 grid grid-cols-2 gap-2 text-xs text-[#A0A0A0]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" /> {cls.dateLabel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF6B00]" /> {cls.time} ({cls.duration})
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" /> {cls.room}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> {cls.calories}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBookingClass(cls)}
                    className={`w-full mt-5 py-3 rounded-lg font-bold text-sm transition ${
                      isBooked
                        ? 'bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E]'
                        : isWaitlisted
                        ? 'bg-[#F59E0B]/20 border border-[#F59E0B] text-[#F59E0B]'
                        : 'btn-primary'
                    }`}
                  >
                    {isBooked
                      ? 'Booked ✓ (View Confirmation)'
                      : isWaitlisted
                      ? 'On Priority Waitlist'
                      : cls.spotsLeft === 0
                      ? 'Join Waitlist'
                      : 'Book Now'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Weekly Calendar View */
          <div className="gym-card overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-5 gap-4">
              {['Today', 'Friday', 'Saturday', 'Sunday', 'Monday'].map((day) => (
                <div key={day} className="space-y-3">
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-center">
                    <p className="font-display text-2xl text-[#FF6B00]">{day}</p>
                  </div>
                  {classes
                    .filter((c) => c.day === day)
                    .map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setActiveBookingClass(c)}
                        className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] rounded-xl p-3.5 cursor-pointer transition space-y-1.5"
                      >
                        <span className="text-[10px] font-bold uppercase text-[#FF6B00]">{c.time}</span>
                        <p className="font-bold text-xs text-white">{c.name}</p>
                        <p className="text-[11px] text-[#A0A0A0]">{c.trainerName}</p>
                        <span className="inline-block text-[10px] text-[#22C55E] font-bold">
                          {c.spotsLeft} spots left →
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
