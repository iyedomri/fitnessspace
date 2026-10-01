'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGym } from '@/context/GymContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ShieldCheck,
  QrCode,
  Sparkles,
  MessageCircle,
  Send,
  Phone,
  Award,
  ExternalLink,
  Mail,
  Smartphone,
} from 'lucide-react';

export default function GlobalWidgets() {
  const {
    user,
    isLoggedIn,
    login,
    activeBookingClass,
    setActiveBookingClass,
    bookedClassIds,
    waitlistClassIds,
    bookClass,
    joinClassWaitlist,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    isQrModalOpen,
    setIsQrModalOpen,
    isPromoModalOpen,
    setIsPromoModalOpen,
    addPoints,
    showToast,
    toasts,
    dismissToast,
  } = useGym();

  // Booking modal state
  const [bookingStep, setBookingStep] = useState<'details' | 'confirmed'>('details');
  const [smsReminder, setSmsReminder] = useState(true);

  // Cart checkout state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Apt 4B, New York, NY 10001');
  const [lastOrderId, setLastOrderId] = useState('');

  // Promo Free Week Modal state
  const [promoEmail, setPromoEmail] = useState('');
  const [promoName, setPromoName] = useState('');
  const [promoClaimed, setPromoClaimed] = useState(false);

  // Live Chat Widget state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hey Athlete! 💪 Welcome to APEX FITNESS. Want a 7-day free trial pass, class recommendation, or help choosing a plan?',
      time: 'Just now',
    },
  ]);

  // Cookie Consent Banner
  const [cookieAccepted, setCookieAccepted] = useState(false);

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const memberDiscountRate = user.plan === 'Elite' ? 0.2 : user.plan === 'Pro' ? 0.1 : 0;
  const memberDiscount = subtotal * memberDiscountRate;
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = Math.max(0, subtotal - memberDiscount - promoDiscount);

  const handleCloseBooking = () => {
    setActiveBookingClass(null);
    setBookingStep('details');
  };

  const handleConfirmBooking = () => {
    if (!activeBookingClass) return;
    if (activeBookingClass.spotsLeft === 0) {
      joinClassWaitlist(activeBookingClass.id);
    } else {
      bookClass(activeBookingClass.id);
    }
    setBookingStep('confirmed');
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = placeOrder(user.name, Number(finalTotal.toFixed(2)));
    setLastOrderId(orderId);
    setCheckoutStep('receipt');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: 'Just now' }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Coach Marcus & our Member Concierge received your message! You can book any class with 1 click or claim your 7-Day Free Trial using code APEXFREE.',
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* 1. TOAST NOTIFICATIONS STACK */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-[#1A1A1A] border-l-4 border-[#FF6B00] border border-[#2A2A2A] rounded-xl p-4 shadow-2xl flex items-start justify-between gap-3 animate-fade-up"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{t.title}</p>
                {t.description && <p className="text-xs text-[#A0A0A0] mt-0.5">{t.description}</p>}
              </div>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-[#A0A0A0] hover:text-white"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 2. CLASS BOOKING MODAL */}
      {activeBookingClass && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-fade-up">
            <button
              onClick={handleCloseBooking}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center text-[#A0A0A0] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingStep === 'details' ? (
              <div className="space-y-5">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-2">
                    {activeBookingClass.type} • {activeBookingClass.level}
                  </span>
                  <h3 className="h3-display text-white">{activeBookingClass.name}</h3>
                  <p className="text-sm text-[#A0A0A0] mt-1">{activeBookingClass.description}</p>
                </div>

                {/* Trainer & Class Metadata */}
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#2A2A2A]">
                    <img
                      src={activeBookingClass.trainerAvatar}
                      alt={activeBookingClass.trainerName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#FF6B00]"
                    />
                    <div>
                      <p className="text-xs text-[#A0A0A0]">Lead Coach</p>
                      <p className="font-bold text-white">{activeBookingClass.trainerName}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          activeBookingClass.spotsLeft === 0
                            ? 'bg-[#EF4444]/20 text-[#EF4444]'
                            : activeBookingClass.spotsLeft <= 3
                            ? 'bg-[#EF4444]/20 text-[#EF4444]'
                            : 'bg-[#22C55E]/20 text-[#22C55E]'
                        }`}
                      >
                        {activeBookingClass.spotsLeft === 0
                          ? 'Class Full — Waitlist Open'
                          : `Only ${activeBookingClass.spotsLeft} spots left!`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#A0A0A0]">
                      <Calendar className="w-4 h-4 text-[#FF6B00]" />
                      <span>{activeBookingClass.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A0A0A0]">
                      <Clock className="w-4 h-4 text-[#FF6B00]" />
                      <span>{activeBookingClass.time} ({activeBookingClass.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A0A0A0]">
                      <MapPin className="w-4 h-4 text-[#FF6B00]" />
                      <span>{activeBookingClass.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A0A0A0]">
                      <Flame className="w-4 h-4 text-[#FF6B00]" />
                      <span>Burn ~{activeBookingClass.calories}</span>
                    </div>
                  </div>
                </div>

                {/* Member Login Verification */}
                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 flex items-center justify-between">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                      <div className="text-xs">
                        <p className="font-bold text-white">Booking as {user.name} ({user.plan} Plan)</p>
                        <p className="text-[#A0A0A0]">Included in your membership • +15 Loyalty Points</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="text-xs">
                        <p className="font-bold text-white">Member Login Required</p>
                        <p className="text-[#A0A0A0]">Sign in with 1 click to reserve your spot</p>
                      </div>
                      <button
                        onClick={() => login()}
                        className="bg-[#FF6B00] text-white text-xs font-bold px-3 py-2 rounded-lg"
                      >
                        Quick Demo Login
                      </button>
                    </div>
                  )}
                </div>

                {/* SMS / Email Notification Checkbox */}
                <label className="flex items-center gap-2.5 text-xs text-[#A0A0A0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsReminder}
                    onChange={(e) => setSmsReminder(e.target.checked)}
                    className="rounded accent-[#FF6B00] w-4 h-4"
                  />
                  <span>Send instant SMS & Email confirmation + 1-hour pre-class reminder</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button onClick={handleCloseBooking} className="btn-secondary flex-1 py-3">
                    Cancel
                  </button>
                  <button onClick={handleConfirmBooking} className="btn-primary flex-1 py-3">
                    {activeBookingClass.spotsLeft === 0
                      ? 'Join Priority Waitlist'
                      : bookedClassIds.includes(activeBookingClass.id)
                      ? 'Spot Already Reserved ✓'
                      : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold">
                    +15 LOYALTY POINTS EARNED
                  </span>
                  <h3 className="h3-display text-white mt-3">
                    {waitlistClassIds.includes(activeBookingClass.id)
                      ? 'WAITLIST CONFIRMED!'
                      : 'YOU’RE BOOKED IN! 🔥'}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] mt-1">
                    {activeBookingClass.name} with {activeBookingClass.trainerName} • {activeBookingClass.dateLabel} at{' '}
                    {activeBookingClass.time}
                  </p>
                </div>

                <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 text-left space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#22C55E] font-semibold">
                    <Mail className="w-4 h-4" />
                    <span>Email confirmation sent to {user.email}</span>
                  </div>
                  {smsReminder && (
                    <div className="flex items-center gap-2 text-[#22C55E] font-semibold">
                      <Smartphone className="w-4 h-4" />
                      <span>SMS pass dispatched to {user.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      `APEX FITNESS: ${activeBookingClass.name}`
                    )}&details=${encodeURIComponent(activeBookingClass.description)}&location=${encodeURIComponent(
                      activeBookingClass.room
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary flex-1 py-3 text-xs"
                  >
                    <Calendar className="w-4 h-4" /> Add to Google Calendar <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button onClick={handleCloseBooking} className="btn-primary flex-1 py-3 text-xs">
                    Done & View Schedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SLIDE-IN SHOPPING CART & CHECKOUT SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="bg-[#1A1A1A] border-l border-[#2A2A2A] w-full max-w-md h-full flex flex-col justify-between p-6 overflow-y-auto animate-fade-up">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="font-display text-2xl tracking-wider text-white">
                    {checkoutStep === 'cart'
                      ? 'YOUR GEAR BAG'
                      : checkoutStep === 'checkout'
                      ? 'SECURE CHECKOUT'
                      : 'ORDER CONFIRMED'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('cart');
                  }}
                  className="w-9 h-9 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center text-[#A0A0A0] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutStep === 'cart' && (
                <div className="mt-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-14 space-y-4">
                      <ShoppingBag className="w-12 h-12 text-[#A0A0A0] mx-auto opacity-50" />
                      <p className="text-[#A0A0A0] text-sm">Your cart is currently empty.</p>
                      <Link
                        href="/store"
                        onClick={() => setIsCartOpen(false)}
                        className="btn-primary inline-flex text-sm"
                      >
                        Explore Pro Supplements & Gear
                      </Link>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5 flex gap-3.5 items-center"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover border border-[#2A2A2A]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-white truncate">{item.product.name}</p>
                            {item.selectedOption && (
                              <p className="text-[11px] text-[#A0A0A0]">{item.selectedOption}</p>
                            )}
                            <p className="text-sm font-extrabold text-[#FF6B00] mt-1">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="w-7 h-7 rounded text-[#EF4444] hover:bg-[#EF4444]/10 flex items-center justify-center ml-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Promo code */}
                      <div className="pt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo code (Try APEX10)"
                            className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white"
                          />
                          <button
                            onClick={() => {
                              if (promoCode.trim()) {
                                setPromoApplied(true);
                                showToast('Promo Code Applied!', 'Extra 10% discount unlocked.', 'success');
                              }
                            }}
                            className="bg-[#2A2A2A] hover:bg-[#FF6B00] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {checkoutStep === 'checkout' && (
                <form id="checkout-form" onSubmit={handleCompleteCheckout} className="mt-5 space-y-4 text-xs">
                  <div>
                    <label className="block text-[#A0A0A0] mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      defaultValue={user.name}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A0A0A0] mb-1 font-semibold">Shipping Address or Gym Pickup</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A0A0A0] mb-2 font-semibold">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                          paymentMethod === 'stripe'
                            ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-white'
                            : 'border-[#2A2A2A] bg-[#0A0A0A] text-[#A0A0A0]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#FF6B00]" /> Stripe Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                          paymentMethod === 'paypal'
                            ? 'border-[#FF6B00] bg-[#FF6B00]/15 text-white'
                            : 'border-[#2A2A2A] bg-[#0A0A0A] text-[#A0A0A0]'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-[#FF6B00]" /> PayPal Express
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3.5 space-y-3">
                      <input
                        type="text"
                        required
                        defaultValue="4242 •••• •••• 4242"
                        placeholder="Card Number"
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          defaultValue="08/29"
                          placeholder="MM/YY"
                          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                        />
                        <input
                          type="text"
                          required
                          defaultValue="884"
                          placeholder="CVC"
                          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  )}
                </form>
              )}

              {checkoutStep === 'receipt' && (
                <div className="mt-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-3xl text-white">THANK YOU, {user.name.toUpperCase()}!</h4>
                  <p className="text-xs text-[#A0A0A0]">
                    Order <strong className="text-[#FF6B00]">#{lastOrderId}</strong> is confirmed. An email receipt has been sent to{' '}
                    <span className="text-white">{user.email}</span>.
                  </p>
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4 text-left text-xs space-y-2">
                    <p className="font-bold text-[#22C55E]">✓ Loyalty Points Credited (+1 pt per $1)</p>
                    <p className="text-[#A0A0A0]">Delivery to: {shippingAddress}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep('cart');
                    }}
                    className="btn-primary w-full py-3"
                  >
                    Continue Training
                  </button>
                </div>
              )}
            </div>

            {/* Cart Footer Summary */}
            {cart.length > 0 && checkoutStep !== 'receipt' && (
              <div className="pt-4 border-t border-[#2A2A2A] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#A0A0A0]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {memberDiscount > 0 && (
                    <div className="flex justify-between text-[#22C55E] font-semibold">
                      <span>{user.plan} Member Discount ({memberDiscountRate * 100}%)</span>
                      <span>-${memberDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#FF6B00] font-semibold">
                      <span>Promo Code (10%)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#2A2A2A]">
                    <span>Total</span>
                    <span className="text-[#FF6B00]">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button onClick={() => setCheckoutStep('checkout')} className="btn-primary w-full py-3.5">
                    Proceed to Checkout →
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="btn-secondary px-4 py-3 text-xs"
                    >
                      Back
                    </button>
                    <button type="submit" form="checkout-form" className="btn-primary flex-1 py-3 text-sm">
                      Pay ${finalTotal.toFixed(2)} Now
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. QR CODE DOOR CHECK-IN MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl max-w-sm w-full p-6 text-center relative animate-fade-up">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center text-[#A0A0A0] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" /> ACTIVE BIOMETRIC PASS
            </span>
            <h3 className="h3-display text-white mt-2">GYM DOOR QR CHECK-IN</h3>
            <p className="text-xs text-[#A0A0A0]">Hold up to the optical turnstile scanner at the entrance</p>

            {/* Simulated Crisp SVG QR Code */}
            <div className="my-5 bg-white p-5 rounded-2xl inline-block shadow-orange-glow">
              <svg viewBox="0 0 120 120" className="w-44 h-44">
                <rect width="120" height="120" fill="#FFFFFF" />
                {/* Corner Finder Patterns */}
                <rect x="8" y="8" width="32" height="32" fill="#0A0A0A" />
                <rect x="13" y="13" width="22" height="22" fill="#FFFFFF" />
                <rect x="18" y="18" width="12" height="12" fill="#FF6B00" />

                <rect x="80" y="8" width="32" height="32" fill="#0A0A0A" />
                <rect x="85" y="13" width="22" height="22" fill="#FFFFFF" />
                <rect x="90" y="18" width="12" height="12" fill="#FF6B00" />

                <rect x="8" y="80" width="32" height="32" fill="#0A0A0A" />
                <rect x="13" y="85" width="22" height="22" fill="#FFFFFF" />
                <rect x="18" y="90" width="12" height="12" fill="#FF6B00" />

                {/* Data Matrix Modules */}
                <rect x="46" y="10" width="6" height="6" fill="#0A0A0A" />
                <rect x="58" y="10" width="12" height="6" fill="#0A0A0A" />
                <rect x="46" y="22" width="12" height="6" fill="#0A0A0A" />
                <rect x="64" y="22" width="6" height="12" fill="#0A0A0A" />
                <rect x="10" y="46" width="12" height="6" fill="#0A0A0A" />
                <rect x="28" y="46" width="6" height="12" fill="#0A0A0A" />
                <rect x="46" y="46" width="28" height="28" rx="4" fill="#0A0A0A" />
                <text x="60" y="64" textAnchor="middle" fill="#FF6B00" fontSize="11" fontWeight="bold">
                  APEX
                </text>
                <rect x="82" y="46" width="12" height="6" fill="#0A0A0A" />
                <rect x="100" y="46" width="10" height="18" fill="#0A0A0A" />
                <rect x="82" y="58" width="6" height="16" fill="#0A0A0A" />
                <rect x="46" y="82" width="12" height="6" fill="#0A0A0A" />
                <rect x="64" y="82" width="18" height="6" fill="#0A0A0A" />
                <rect x="90" y="82" width="20" height="10" fill="#0A0A0A" />
                <rect x="46" y="96" width="16" height="14" fill="#0A0A0A" />
                <rect x="70" y="96" width="12" height="14" fill="#0A0A0A" />
                <rect x="90" y="100" width="20" height="12" fill="#FF6B00" />
              </svg>
            </div>

            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-3 text-xs space-y-1">
              <p className="font-bold text-white">{user.name} • {user.plan} Unlimited</p>
              <p className="text-[#A0A0A0] font-mono">ID: {user.memberId}</p>
            </div>

            <button
              onClick={() => {
                addPoints(10, 'QR Door Check-In Scanned');
                showToast('Turnstile Unlocked! 🟢', 'Welcome to APEX FITNESS! +10 Loyalty Points added.', 'success');
                setIsQrModalOpen(false);
              }}
              className="btn-primary w-full mt-4 py-3 text-xs"
            >
              Simulate Door Scan (+10 Pts)
            </button>
          </div>
        </div>
      )}

      {/* 5. EXIT-INTENT / FREE WEEK PROMO MODAL */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border-2 border-[#FF6B00] rounded-2xl max-w-md w-full p-6 sm:p-8 text-center relative shadow-orange-glow animate-fade-up">
            <button
              onClick={() => setIsPromoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center text-[#A0A0A0] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!promoClaimed ? (
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Limited Visitor Offer
                </span>
                <h3 className="h2-display text-white">
                  WAIT! GET YOUR FIRST WEEK <span className="text-[#FF6B00]">100% FREE</span>
                </h3>
                <p className="text-sm text-[#A0A0A0]">
                  Experience unlimited gym access, group HIIT & Strength classes, and full recovery lounge access for 7 days. <strong className="text-white">No credit card needed.</strong>
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPromoClaimed(true);
                    showToast('7-Day Free Trial Pass Activated! 🎉', 'Check your email for your QR door pass.', 'success');
                  }}
                  className="space-y-3 text-left pt-2"
                >
                  <input
                    type="text"
                    required
                    value={promoName}
                    onChange={(e) => setPromoName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={promoEmail}
                    onChange={(e) => setPromoEmail(e.target.value)}
                    placeholder="Your Best Email Address"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#FF6B00] rounded-lg px-4 py-3 text-sm text-white outline-none"
                  />
                  <button type="submit" className="btn-primary w-full py-4 text-base">
                    Claim My Free 7-Day Pass →
                  </button>
                </form>
                <p className="text-[11px] text-[#A0A0A0]">
                  🔒 Instant QR pass delivery • Zero commitment • Cancel anytime
                </p>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <CheckCircle2 className="w-14 h-14 text-[#22C55E] mx-auto" />
                <h3 className="h3-display text-white">YOUR 7-DAY VIP PASS IS READY!</h3>
                <p className="text-xs text-[#A0A0A0]">
                  Pass Code: <strong className="text-[#FF6B00] font-mono text-sm">APEX-FREE7-VIP</strong>
                </p>
                <p className="text-xs text-[#A0A0A0]">
                  Show this code or your QR Check-In pass at reception to start training today.
                </p>
                <button
                  onClick={() => {
                    setIsPromoModalOpen(false);
                    setIsQrModalOpen(true);
                  }}
                  className="btn-primary w-full py-3"
                >
                  Open My QR Door Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. FLOATING WHATSAPP BUTTON & LIVE CONCIERGE CHAT WIDGET */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-80 sm:w-96 shadow-2xl overflow-hidden animate-fade-up mb-1">
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8524] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                <div>
                  <p className="font-bold text-sm leading-none">APEX Coach Concierge</p>
                  <p className="text-[11px] opacity-90 mt-0.5">Replies in under 60 seconds</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#0A0A0A]">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#FF6B00] text-white font-medium'
                        : 'bg-[#1A1A1A] border border-[#2A2A2A] text-white'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#A0A0A0] mt-1">{m.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-[#1A1A1A] border-t border-[#2A2A2A] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about classes, PT, or trials..."
                className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#FF6B00]"
              />
              <button
                type="submit"
                className="bg-[#FF6B00] text-white px-3 py-2 rounded-lg flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {/* WhatsApp Floating Action Button */}
          <a
            href="https://wa.me/18005552739?text=Hi%20APEX%20FITNESS!%20I%20would%20like%20to%20claim%20a%20free%20trial%20pass."
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            className="w-12 h-12 rounded-full bg-[#22C55E] hover:scale-105 text-white shadow-lg flex items-center justify-center transition"
            aria-label="Chat on WhatsApp"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Live Chat Trigger */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="h-12 px-4 rounded-full bg-[#FF6B00] hover:bg-[#FF8524] text-white font-bold text-xs shadow-btn-orange flex items-center gap-2 transition hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Live Coach Chat</span>
          </button>
        </div>
      </div>

      {/* 7. GDPR COOKIE CONSENT BANNER */}
      {!cookieAccepted && (
        <div className="fixed bottom-20 md:bottom-4 left-4 z-30 max-w-sm bg-[#1A1A1A]/95 backdrop-blur-md border border-[#2A2A2A] rounded-xl p-4 shadow-2xl text-xs hidden sm:block">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-white">🍪 GDPR Privacy & Cookies</p>
              <p className="text-[#A0A0A0] mt-1 leading-relaxed">
                We use encrypted cookies to power real-time gym capacity telemetry and personalize your workout dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => setCookieAccepted(true)}
              className="bg-[#FF6B00] text-white font-bold px-4 py-1.5 rounded-lg text-xs"
            >
              Accept All
            </button>
            <button
              onClick={() => setCookieAccepted(true)}
              className="bg-[#0A0A0A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white px-3 py-1.5 rounded-lg text-xs"
            >
              Essential Only
            </button>
          </div>
        </div>
      )}
    </>
  );
}
