'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGym } from '@/context/GymContext';
import { WorkoutVideo } from '@/data/gymData';
import {
  Play,
  Pause,
  RotateCcw,
  Lock,
  Bookmark,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Flame,
  Clock,
  Dumbbell,
  Sparkles,
  Volume2,
  Maximize2,
  ChevronRight,
  Search,
} from 'lucide-react';

export default function VideosPage() {
  const {
    videos,
    user,
    updateUser,
    favoriteVideoIds,
    completedVideoIds,
    toggleFavoriteVideo,
    markVideoComplete,
    showToast,
  } = useGym();

  const [activeVideo, setActiveVideo] = useState<WorkoutVideo>(videos[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(272); // 04:32 simulated
  const [activeChapterIdx, setActiveChapterIdx] = useState(1);
  const [userRating, setUserRating] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const netflixRows: { title: string; subtitle: string; items: WorkoutVideo[] }[] = [
    {
      title: '🔥 Featured & New Releases',
      subtitle: 'High-energy masterclasses dropped this week',
      items: videos.filter((v) => v.category === 'Featured' || v.calories > 480),
    },
    {
      title: '⚡ HIIT & Metabolic Conditioning',
      subtitle: 'Torch maximum calories with explosive intervals',
      items: videos.filter((v) => v.category === 'HIIT Workouts' || v.category === 'Cardio Burn'),
    },
    {
      title: '🏋️ Strength & Hypertrophy Lab',
      subtitle: 'Progressive overload & barbell/dumbbell sculpting',
      items: videos.filter((v) => v.category === 'Strength Training'),
    },
    {
      title: '🧘 Yoga, Mobility & Recovery',
      subtitle: 'Unlock tight hips, thoracic spine, and joint longevity',
      items: videos.filter((v) => v.category === 'Yoga & Flexibility' || v.category === 'Beginner Friendly'),
    },
    {
      title: '⏱️ Quick Express Workouts (Under 20 Min)',
      subtitle: 'Zero excuses — fast, high-impact sessions for busy days',
      items: videos.filter((v) => v.category === 'Quick (Under 20 Min)' || v.durationMinutes <= 25),
    },
  ];

  const categories = [
    'All',
    'Featured',
    'HIIT Workouts',
    'Strength Training',
    'Yoga & Flexibility',
    'Cardio Burn',
    'Beginner Friendly',
    'Quick (Under 20 Min)',
    'Saved Favorites ❤️',
  ];

  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Saved Favorites ❤️') return favoriteVideoIds.includes(v.id);
    return v.category === selectedCategory;
  });

  const handleSelectVideo = (vid: WorkoutVideo) => {
    if (vid.isPremium && user.plan === 'Basic') {
      showToast(
        'Pro / Elite Workout Locked 🔒',
        'Upgrade to Pro ($59/mo) or switch demo plan below to stream 4K Premium Workouts.',
        'warning'
      );
    }
    setActiveVideo(vid);
    setIsPlaying(true);
    setElapsedSeconds(0);
    setActiveChapterIdx(0);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const relatedVideos = videos.filter((v) => v.id !== activeVideo.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header + Plan Switcher for Demo Testing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 4K On-Demand Streaming • New Workouts Weekly
            </span>
            <h1 className="h1-display text-white mt-1">APEX WORKOUT VIDEO LIBRARY</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workout or coach..."
                className="bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-1 flex items-center gap-1 text-xs">
              <span className="text-[#A0A0A0] px-2 font-semibold">View As:</span>
              {(['Basic', 'Pro', 'Elite'] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => updateUser({ plan })}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    user.plan === plan ? 'bg-[#FF6B00] text-white' : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FEATURED INTERACTIVE VIDEO PLAYER + SIDEBAR
        ══════════════════════════════════════════ */}
        <div className="gym-card p-0 overflow-hidden border-2 border-[#2A2A2A] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Main Video Player (8 cols) */}
            <div className="lg:col-span-8 bg-[#0A0A0A] relative min-h-[360px] sm:min-h-[480px] flex flex-col justify-between">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${
                  isPlaying ? 'scale-105 opacity-35' : 'opacity-60'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/45 to-black/30" />

              {/* Top Overlay Controls */}
              <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold uppercase">
                    {activeVideo.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 border border-[#2A2A2A] text-white text-xs font-bold">
                    {activeVideo.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => toggleFavoriteVideo(activeVideo.id)}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    favoriteVideoIds.includes(activeVideo.id)
                      ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-btn-orange'
                      : 'bg-[#0A0A0A]/80 border-[#2A2A2A] text-white hover:border-[#FF6B00]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {favoriteVideoIds.includes(activeVideo.id) ? 'Saved in Favorites' : 'Favorite'}
                </button>
              </div>

              {/* Center Interactive Player HUD */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
                {activeVideo.isPremium && user.plan === 'Basic' ? (
                  <div className="bg-[#0A0A0A]/95 border-2 border-[#FF6B00] rounded-2xl p-6 max-w-md space-y-4 shadow-orange-glow">
                    <div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center mx-auto">
                      <Lock className="w-7 h-7" />
                    </div>
                    <h3 className="h3-display text-white">PRO / ELITE EXCLUSIVE WORKOUT</h3>
                    <p className="text-xs text-[#A0A0A0]">
                      Upgrade your membership to Pro Unlimited ($59/mo) to unlock all 4K coach-led sessions, or click below to preview as a Pro member.
                    </p>
                    <div className="flex gap-2.5 justify-center">
                      <button
                        onClick={() => {
                          updateUser({ plan: 'Pro' });
                          setIsPlaying(true);
                        }}
                        className="btn-primary btn-compact text-xs"
                      >
                        Unlock Instant Pro Preview
                      </button>
                      <Link href="/pricing" className="btn-secondary btn-compact text-xs">
                        View Plans
                      </Link>
                    </div>
                  </div>
                ) : !isPlaying ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play Workout Video"
                      className="w-20 h-20 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-btn-orange hover:scale-110 transition mx-auto"
                    >
                      <Play className="w-9 h-9 fill-white ml-1" />
                    </button>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-white bg-black/60 px-4 py-1.5 rounded-full">
                      Click to Start 4K Guided Session
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-[#FF6B00]/60 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-orange-glow">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 text-[#22C55E] font-extrabold uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" /> Live Coaching Stream
                      </span>
                      <span className="font-mono text-white font-bold">
                        {formatTime(elapsedSeconds)} / {activeVideo.duration}
                      </span>
                    </div>

                    <div className="text-left bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
                      <p className="text-[11px] text-[#FF6B00] font-bold uppercase">
                        Current Block: {activeVideo.chapters[activeChapterIdx]?.title || activeVideo.chapters[0]?.title}
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        Coach {activeVideo.trainerName}: “Control the eccentric फॉर 3 seconds, explode to the top! Keep your breathing rhythmic.”
                      </p>
                    </div>

                    {/* Scrubber & Controls */}
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF6B00] transition-all"
                          style={{ width: `${Math.min(100, 22 + (elapsedSeconds % 75))}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsPlaying(false)}
                            className="px-3 py-1.5 rounded-lg bg-[#FF6B00] text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Pause className="w-3.5 h-3.5" /> Pause
                          </button>
                          <button
                            onClick={() => setElapsedSeconds(0)}
                            className="p-1.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white"
                            title="Restart"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#A0A0A0]">
                          <span className="flex items-center gap-1 text-[#FF6B00] font-bold">
                            <Flame className="w-3.5 h-3.5" /> {Math.round(115 + elapsedSeconds * 0.25)} kcal burned
                          </span>
                          <Volume2 className="w-4 h-4 text-white" />
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Player Bar */}
              <div className="relative z-10 p-5 bg-[#0A0A0A]/95 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="h3-display text-white">{activeVideo.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#A0A0A0] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF6B00]" /> {activeVideo.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> ~{activeVideo.calories} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3.5 h-3.5 text-[#FF6B00]" /> {activeVideo.equipment.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Rating (Thumbs Up/Down) + Mark as Complete */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setUserRating('up');
                      showToast('Rated Thumbs Up 👍', 'Added to your high-match workout preferences.', 'success');
                    }}
                    className={`p-2.5 rounded-xl border transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      userRating === 'up'
                        ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                        : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#22C55E] text-white'
                    }`}
                    aria-label="Thumbs Up"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setUserRating('down');
                      showToast('Feedback Recorded', 'We will tune your future workout recommendations.', 'info');
                    }}
                    className={`p-2.5 rounded-xl border transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      userRating === 'down'
                        ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]'
                        : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#EF4444] text-white'
                    }`}
                    aria-label="Thumbs Down"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => markVideoComplete(activeVideo.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 min-h-[44px] transition ${
                      completedVideoIds.includes(activeVideo.id)
                        ? 'bg-[#22C55E]/20 border border-[#22C55E] text-[#22C55E]'
                        : 'btn-primary btn-compact'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedVideoIds.includes(activeVideo.id)
                        ? 'Workout Completed ✓'
                        : 'Mark as Complete (+20 Pts)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trainer Info Sidebar + Chapters + Related Videos (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-[#1A1A1A] border-t lg:border-t-0 lg:border-l border-[#2A2A2A] flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Trainer Profile Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeVideo.trainerAvatar}
                      alt={activeVideo.trainerName}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF6B00]"
                    />
                    <div>
                      <p className="text-[11px] text-[#FF6B00] font-bold uppercase">Lead Coach</p>
                      <p className="font-bold text-white">{activeVideo.trainerName}</p>
                    </div>
                  </div>
                  <Link
                    href={`/trainers?trainer=${activeVideo.trainerId}`}
                    className="text-xs font-bold text-[#FF6B00] hover:underline"
                  >
                    Book 1-on-1 →
                  </Link>
                </div>

                <p className="text-xs text-[#A0A0A0] leading-relaxed">{activeVideo.description}</p>

                {/* Interactive Workout Chapters */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                    Interactive Workout Chapters
                  </p>
                  <div className="space-y-2">
                    {activeVideo.chapters.map((ch, idx) => (
                      <button
                        key={ch.time}
                        onClick={() => {
                          setActiveChapterIdx(idx);
                          setIsPlaying(true);
                        }}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                          activeChapterIdx === idx && isPlaying
                            ? 'bg-[#FF6B00]/15 border-[#FF6B00] text-white'
                            : 'bg-[#0A0A0A] border-[#2A2A2A] hover:border-[#FF6B00] text-[#A0A0A0] hover:text-white'
                        }`}
                      >
                        <span className="font-semibold truncate pr-2">{ch.title}</span>
                        <span className="text-[#FF6B00] font-mono font-bold shrink-0">{ch.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Videos Below in Sidebar */}
              <div className="pt-4 border-t border-[#2A2A2A] space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Up Next / Related Workouts</p>
                {relatedVideos.map((rv) => (
                  <div
                    key={rv.id}
                    onClick={() => handleSelectVideo(rv)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] cursor-pointer transition"
                  >
                    <img src={rv.thumbnail} alt={rv.title} className="w-16 h-11 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{rv.title}</p>
                      <p className="text-[10px] text-[#A0A0A0]">
                        {rv.trainerName} • {rv.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition min-h-[44px] ${
                selectedCategory === cat
                  ? 'bg-[#FF6B00] text-white shadow-btn-orange'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* If "All" is selected and no search query, render NETFLIX-STYLE HORIZONTAL ROWS + Full Grid */}
        {selectedCategory === 'All' && !searchQuery ? (
          <div className="space-y-12">
            {netflixRows.map((row) => (
              <div key={row.title} className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="h3-display text-white">{row.title}</h2>
                    <p className="text-xs text-[#A0A0A0]">{row.subtitle}</p>
                  </div>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-3 no-scrollbar snap-x">
                  {row.items.map((vid) => {
                    const isLocked = vid.isPremium && user.plan === 'Basic';
                    const isFav = favoriteVideoIds.includes(vid.id);
                    const isDone = completedVideoIds.includes(vid.id);

                    return (
                      <div
                        key={vid.id}
                        className="gym-card min-w-[290px] sm:min-w-[330px] p-0 overflow-hidden snap-start group flex flex-col justify-between"
                      >
                        <div
                          onClick={() => handleSelectVideo(vid)}
                          className="relative h-44 overflow-hidden cursor-pointer"
                        >
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-btn-orange group-hover:scale-110 transition">
                              {isLocked ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                            </div>
                          </div>

                          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-white text-xs font-bold">
                            {vid.duration}
                          </span>

                          {vid.isPremium ? (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-extrabold uppercase flex items-center gap-1">
                              {isLocked && <Lock className="w-3 h-3" />} PRO
                            </span>
                          ) : (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#22C55E] text-black text-[10px] font-extrabold uppercase">
                              FREE
                            </span>
                          )}

                          {isDone && (
                            <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#22C55E] text-black text-[10px] font-extrabold">
                              COMPLETED ✓
                            </span>
                          )}
                        </div>

                        <div className="p-4 flex items-start justify-between gap-2">
                          <div onClick={() => handleSelectVideo(vid)} className="cursor-pointer">
                            <h3 className="font-bold text-sm text-white group-hover:text-[#FF6B00] transition line-clamp-1">
                              {vid.title}
                            </h3>
                            <p className="text-xs text-[#A0A0A0] mt-1">
                              {vid.trainerName} • {vid.difficulty} • {vid.calories} kcal
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFavoriteVideo(vid.id)}
                            aria-label="Bookmark workout"
                            className={`p-2 rounded-lg border shrink-0 transition ${
                              isFav
                                ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]'
                                : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#A0A0A0] hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Filtered Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((vid) => {
              const isLocked = vid.isPremium && user.plan === 'Basic';
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid)}
                  className="gym-card p-0 overflow-hidden cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-btn-orange">
                        {isLocked ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-bold">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-base text-white group-hover:text-[#FF6B00] transition">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-[#A0A0A0]">
                      {vid.trainerName} • {vid.difficulty} • {vid.calories} kcal
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
