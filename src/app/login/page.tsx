'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGym } from '@/context/GymContext';
import {
  Dumbbell,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useGym();

  const [email, setEmail] = useState('alex.rivera@apexfitness.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'member', 'Pro', 'Alex Rivera');
    router.push('/dashboard');
  };

  const handleQuickRoleLogin = (
    role: 'member' | 'trainer' | 'admin',
    plan: 'Basic' | 'Pro' | 'Elite',
    name: string,
    userEmail: string,
    dest: string
  ) => {
    login(userEmail, role, plan, name);
    router.push(dest);
  };

  return (
    <div className="min-h-[85vh] bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.14),transparent_60%)] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B00] flex items-center justify-center mx-auto shadow-btn-orange">
            <Dumbbell className="w-8 h-8 text-white -rotate-45" />
          </div>
          <h1 className="h2-display text-white mt-3">
            {forgotMode ? 'RESET YOUR PASSWORD' : 'WELCOME BACK, ATHLETE'}
          </h1>
          <p className="text-sm text-[#A0A0A0]">
            {forgotMode
              ? 'Enter your account email and we will send an instant recovery link.'
              : 'Log in to access your classes, workout videos, progress lab, and QR pass.'}
          </p>
        </div>

        <div className="gym-card p-6 sm:p-8 space-y-6">
          {forgotMode ? (
            <div className="space-y-4">
              {resetSent ? (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto" />
                  <h3 className="h3-display text-white">RECOVERY EMAIL SENT</h3>
                  <p className="text-xs text-[#A0A0A0]">
                    We dispatched a secure password reset link to <strong className="text-white">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setForgotMode(false);
                      setResetSent(false);
                    }}
                    className="btn-primary w-full py-3"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setResetSent(true);
                    showToast('Password Reset Link Sent', `Check ${email} for instructions.`, 'info');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-1.5">
                      Account Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5">
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotMode(false)}
                    className="w-full text-center text-xs text-[#A0A0A0] hover:text-white pt-1"
                  >
                    ← Back to Sign In
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A0A0A0] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase text-[#A0A0A0]">Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotMode(true)}
                      className="text-xs text-[#FF6B00] hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A0A0A0] absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-[#A0A0A0] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#FF6B00] w-4 h-4"
                    />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full py-3.5 text-sm">
                  <span>Access Member Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Social OAuth Buttons */}
              <div className="space-y-3 pt-2">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#2A2A2A] w-full" />
                  <span className="bg-[#1A1A1A] px-3 text-[11px] uppercase tracking-wider text-[#A0A0A0] font-semibold">
                    Or Continue With
                  </span>
                  <div className="border-t border-[#2A2A2A] w-full" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickRoleLogin('member', 'Pro', 'Alex Rivera', 'alex.rivera@gmail.com', '/dashboard')
                    }
                    className="bg-[#0A0A0A] hover:bg-[#2A2A2A] border border-[#2A2A2A] rounded-lg py-2.5 px-4 text-xs font-bold text-white flex items-center justify-center gap-2 transition min-h-[44px]"
                  >
                    <span>G</span> Google OAuth
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickRoleLogin('member', 'Elite', 'Alex Rivera', 'alex.rivera@icloud.com', '/dashboard')
                    }
                    className="bg-[#0A0A0A] hover:bg-[#2A2A2A] border border-[#2A2A2A] rounded-lg py-2.5 px-4 text-xs font-bold text-white flex items-center justify-center gap-2 transition min-h-[44px]"
                  >
                    <span></span> Apple ID
                  </button>
                </div>
              </div>

              {/* 1-Click Demo Role Switcher */}
              <div className="pt-4 border-t border-[#2A2A2A] space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Demo Role Switcher
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickRoleLogin('member', 'Pro', 'Alex Rivera', 'alex@apexfitness.io', '/dashboard')
                    }
                    className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] rounded-lg p-2 text-center font-semibold text-white transition"
                  >
                    👤 Member
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickRoleLogin('trainer', 'Elite', 'Coach Marcus Vance', 'marcus@apexfitness.io', '/trainers')
                    }
                    className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#FF6B00] rounded-lg p-2 text-center font-semibold text-white transition"
                  >
                    👨‍💼 Trainer
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickRoleLogin('admin', 'Elite', 'Admin Owner', 'owner@apexfitness.io', '/admin')
                    }
                    className="bg-[#0A0A0A] border border-[#FF6B00]/50 hover:border-[#FF6B00] rounded-lg p-2 text-center font-semibold text-[#FF6B00] transition"
                  >
                    🛠️ Admin
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs text-[#A0A0A0]">
          New to APEX FITNESS?{' '}
          <Link href="/register" className="text-[#FF6B00] font-bold hover:underline">
            Start Your 7-Day Free Trial →
          </Link>
        </p>
      </div>
    </div>
  );
}
