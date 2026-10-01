'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { REWARDS_MARKETPLACE, LEADERBOARD_DATA } from '@/data/gymData';
import { Award, Gift, Share2, Copy, CheckCircle2, Trophy, Flame } from 'lucide-react';

export default function RewardsPage() {
  const { points, pointsHistory, redeemReward, addPoints, redeemedCodes, showToast } = useGym();
  const [copied, setCopied] = useState(false);

  const currentTier =
    points >= 5000 ? 'Platinum' : points >= 2500 ? 'Gold' : points >= 1000 ? 'Silver' : 'Bronze';
  const nextTier =
    points >= 5000 ? 'Max Tier' : points >= 2500 ? 'Platinum (5,000)' : points >= 1000 ? 'Gold (2,500)' : 'Silver (1,000)';
  const nextTarget = points >= 5000 ? 5000 : points >= 2500 ? 5000 : points >= 1000 ? 2500 : 1000;
  const tierPct = Math.min(100, Math.round((points / nextTarget) * 100));

  const referralUrl = 'https://apexfitness.io/ref/ALEX200';

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Points Balance + Tier Progress Hero */}
        <div className="gym-card bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#FF6B00]/20 border-2 border-[#FF6B00] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold uppercase">
                Current Tier: {currentTier} Athlete
              </span>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-display text-6xl sm:text-7xl text-white">{points.toLocaleString()}</span>
                <span className="font-display text-3xl text-[#FF6B00]">APEX POINTS</span>
              </div>
              <p className="text-xs text-[#A0A0A0]">
                Progress to {nextTier} • Bronze → Silver → Gold → Platinum
              </p>
              <div className="w-full h-3 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div className="h-full bg-[#FF6B00]" style={{ width: `${tierPct}%` }} />
              </div>
            </div>

            {/* Referral System Box */}
            <div className="lg:col-span-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#22C55E] uppercase">👥 Refer a Friend = +200 PTS Each</span>
              </div>
              <p className="text-xs text-[#A0A0A0]">
                Share your personal link. When a friend starts a trial or membership, you BOTH get 200 bonus points!
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
                <button
                  onClick={() => {
                    setCopied(true);
                    addPoints(200, 'Referral Link Shared Bonus');
                    showToast('Referral Link Copied! 🎉', '+200 Bonus Referral Points credited!', 'success');
                  }}
                  className="btn-primary btn-compact text-xs"
                >
                  <Copy className="w-4 h-4" /> {copied ? 'Copied +200!' : 'Copy & Earn'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <div>
          <h2 className="h3-display text-white mb-4">HOW TO EARN POINTS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '🏋️', title: 'Gym Visit', pts: 10 },
              { emoji: '📅', title: 'Class Booked', pts: 15 },
              { emoji: '✅', title: 'Complete Workout', pts: 20 },
              { emoji: '⭐', title: 'Leave a Review', pts: 50 },
              { emoji: '🛒', title: 'Store Purchase', pts: 1, label: '1 pt / $1' },
              { emoji: '👥', title: 'Refer a Friend', pts: 200 },
            ].map((item) => (
              <div key={item.title} className="gym-card p-4 text-center space-y-1.5">
                <span className="text-2xl">{item.emoji}</span>
                <p className="font-bold text-xs text-white">{item.title}</p>
                <p className="text-xs font-extrabold text-[#FF6B00]">{item.label || `+${item.pts} pts`}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Marketplace */}
        <div>
          <h2 className="h3-display text-white mb-4">REWARDS MARKETPLACE (REDEEM POINTS)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {REWARDS_MARKETPLACE.map((rew) => {
              const canAfford = points >= rew.pointsCost;
              return (
                <div key={rew.id} className="gym-card flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-extrabold">
                      {rew.pointsCost} PTS
                    </span>
                    <h3 className="font-bold text-base text-white mt-3">{rew.title}</h3>
                    <p className="text-xs text-[#A0A0A0] mt-1">{rew.description}</p>
                  </div>
                  <button
                    onClick={() => redeemReward(rew.title, rew.pointsCost)}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs transition ${
                      canAfford ? 'btn-primary' : 'bg-[#2A2A2A] text-[#A0A0A0]'
                    }`}
                  >
                    {canAfford ? 'Redeem Now' : `Need ${rew.pointsCost - points} more pts`}
                  </button>
                </div>
              );
            })}
          </div>

          {redeemedCodes.length > 0 && (
            <div className="mt-4 bg-[#1A1A1A] border border-[#22C55E] rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-[#22C55E]">Your Redeemed Vouchers:</p>
              {redeemedCodes.map((rc, i) => (
                <div key={i} className="flex justify-between text-xs text-white">
                  <span>{rc.title}</span>
                  <span className="font-mono font-bold text-[#FF6B00]">{rc.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top 10 Monthly Leaderboard + Points History Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 gym-card space-y-4">
            <h3 className="h3-display text-white">TOP 10 MEMBERS THIS MONTH 🏆</h3>
            <div className="space-y-2">
              {LEADERBOARD_DATA.map((m) => (
                <div
                  key={m.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    m.isCurrentUser
                      ? 'bg-[#FF6B00]/15 border-[#FF6B00]'
                      : 'bg-[#0A0A0A] border-[#2A2A2A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xl text-[#FF6B00] w-6">#{m.rank}</span>
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white">{m.name}</p>
                      <p className="text-[10px] text-[#A0A0A0]">{m.tier} Tier • 🔥 {m.streak}d streak</p>
                    </div>
                  </div>
                  <span className="font-display text-xl text-white">{m.points.toLocaleString()} PTS</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 gym-card space-y-4">
            <h3 className="h3-display text-white">POINTS HISTORY (LAST 30 DAYS)</h3>
            <div className="space-y-2.5">
              {pointsHistory.map((ph) => (
                <div
                  key={ph.id}
                  className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-white">{ph.action}</p>
                    <p className="text-[10px] text-[#A0A0A0]">{ph.date}</p>
                  </div>
                  <span
                    className={`font-bold ${
                      ph.type === 'earned' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}
                  >
                    {ph.points > 0 ? `+${ph.points}` : ph.points} PTS
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
