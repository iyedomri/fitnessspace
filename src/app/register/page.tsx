'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGym } from '@/context/GymContext';
import { Check, ArrowRight, Sparkles, CreditCard, ShieldCheck, CheckCircle2, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login, updateUser, addPoints } = useGym();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@apexfitness.io');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedPlan, setSelectedPlan] = useState<'Basic' | 'Pro' | 'Elite'>('Pro');
  const [goal, setGoal] = useState('Lean Muscle & Fat Loss');
  const [level, setLevel] = useState('Intermediate');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'member', selectedPlan, name);
    updateUser({ name, email, plan: selectedPlan, fitnessGoal: goal, fitnessLevel: level });
    addPoints(100, 'Welcome Bonus — Joined APEX FITNESS');
    setStep(4);
  };

  return (
    <div className="min-h-[85vh] bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Progress Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">
            <span className={step >= 1 ? 'text-[#FF6B00]' : ''}>1. Account</span>
            <span className={step >= 2 ? 'text-[#FF6B00]' : ''}>2. Membership Plan</span>
            <span className={step >= 3 ? 'text-[#FF6B00]' : ''}>3. Athlete Profile</span>
            <span className={step >= 4 ? 'text-[#22C55E]' : ''}>4. Complete</span>
          </div>
          <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2A2A2A]">
            <div
              className="h-full bg-[#FF6B00] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="gym-card p-6 sm:p-8">
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="space-y-5"
            >
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase">Step 1 of 3 • Free 7-Day Trial Included</span>
                <h1 className="h2-display text-white mt-1">CREATE YOUR ATHLETE ACCOUNT</h1>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3.5">
                Continue to Plan Selection <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase">Step 2 of 3 • First 7 Days $0.00</span>
                <h2 className="h2-display text-white mt-1">SELECT YOUR MEMBERSHIP PLAN</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Basic', price: '$29/mo', desc: 'Off-peak + 2 classes/wk' },
                  { id: 'Pro', price: '$59/mo', desc: 'Unlimited 24/7 + Videos 🔥', popular: true },
                  { id: 'Elite', price: '$99/mo', desc: 'Everything + 4 PT Sessions' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlan(p.id as 'Basic' | 'Pro' | 'Elite')}
                    className={`p-4 rounded-xl border text-left transition ${
                      selectedPlan === p.id
                        ? 'border-2 border-[#FF6B00] bg-[#FF6B00]/15'
                        : 'border-[#2A2A2A] bg-[#0A0A0A]'
                    }`}
                  >
                    <p className="font-display text-2xl text-white">{p.id}</p>
                    <p className="text-lg font-extrabold text-[#FF6B00]">{p.price}</p>
                    <p className="text-xs text-[#A0A0A0] mt-1">{p.desc}</p>
                  </button>
                ))}
              </div>

              <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 space-y-3 text-xs">
                <p className="font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#FF6B00]" /> Stripe Encrypted Billing (Charged after 7-Day Free Trial)
                </p>
                <input
                  type="text"
                  defaultValue="4242 •••• •••• 4242"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 text-white"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary px-6 py-3">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3">
                  Continue to Profile Setup →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleFinish} className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF6B00] uppercase">Step 3 of 3 • Personalize Dashboard</span>
                <h2 className="h2-display text-white mt-1">CUSTOMIZE YOUR TRAINING PROFILE</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-2">Primary Fitness Goal</label>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    {[
                      'Lean Muscle & Fat Loss',
                      'Maximum Strength & PRs',
                      'HIIT & Athletic Stamina',
                      'Mobility & Pain-Free Longevity',
                    ].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={`p-3 rounded-xl border font-bold text-left ${
                          goal === g ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-white' : 'border-[#2A2A2A] bg-[#0A0A0A] text-[#A0A0A0]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-2">Current Fitness Level</label>
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lv) => (
                      <button
                        key={lv}
                        type="button"
                        onClick={() => setLevel(lv)}
                        className={`p-3 rounded-xl border font-bold text-center ${
                          level === lv ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-white' : 'border-[#2A2A2A] bg-[#0A0A0A] text-[#A0A0A0]'
                        }`}
                      >
                        {lv}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary px-6 py-3">
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1 py-3.5">
                  Complete Registration & Unlock +100 Pts
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold">
                +100 WELCOME LOYALTY POINTS CREDITED
              </span>
              <h2 className="h2-display text-white">WELCOME TO APEX FITNESS, {name.toUpperCase()}!</h2>
              <p className="text-sm text-[#A0A0A0] max-w-md mx-auto">
                Your <strong className="text-white">{selectedPlan} Membership</strong> and QR Door Check-In pass are now active.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button onClick={() => router.push('/dashboard')} className="btn-primary px-8 py-3.5">
                  Launch Member Dashboard →
                </button>
                <button onClick={() => router.push('/classes')} className="btn-secondary px-6 py-3.5">
                  Book First Class
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
