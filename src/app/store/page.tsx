'use client';

import React, { useState, useEffect } from 'react';
import { useGym } from '@/context/GymContext';
import { ShoppingBag, Star, Flame, Clock, Search, Check } from 'lucide-react';

export default function StorePage() {
  const { products, addToCart, setIsCartOpen, cart, user } = useGym();
  const [category, setCategory] = useState<'All' | 'Supplements' | 'Gear' | 'Apparel' | 'Accessories'>('All');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hrs: 4, mins: 42, secs: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        return { hrs: 4, mins: 59, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter((p) => category === 'All' || p.category === category);

  return (
    <div className="min-h-screen bg-[#0A0A0A] section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* FLASH SALE BANNER WITH COUNTDOWN TIMER */}
        <div className="gym-card bg-gradient-to-r from-[#FF6B00] via-[#e05500] to-[#1A1A1A] border-none p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center shrink-0">
              <Flame className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full">
                24-Hour Athlete Flash Drop
              </span>
              <h2 className="h3-display text-white mt-1">
                UP TO 25% OFF PRO SUPPLEMENTS & POWERLIFTING GEAR
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0A0A0A]/90 px-5 py-3 rounded-xl border border-white/15">
            <Clock className="w-5 h-5 text-[#FF6B00]" />
            <span className="text-xs uppercase font-bold text-[#A0A0A0]">Ends In:</span>
            <span className="font-display text-2xl text-white tracking-wider">
              0{timeLeft.hrs}h : {String(timeLeft.mins).padStart(2, '0')}m : {String(timeLeft.secs).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Header + Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="h1-display text-white">APEX PRO STORE</h1>
            <p className="text-sm text-[#A0A0A0]">
              Your <strong className="text-[#FF6B00]">{user.plan} Member Discount</strong> is automatically applied at checkout.
            </p>
          </div>

          <button onClick={() => setIsCartOpen(true)} className="btn-primary btn-compact self-start md:self-auto">
            <ShoppingBag className="w-4 h-4" /> View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Supplements', 'Gear', 'Apparel', 'Accessories'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition min-h-[44px] ${
                category === cat
                  ? 'bg-[#FF6B00] text-white shadow-btn-orange'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid (3 col desktop, 2 col tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isHovered = hoveredProductId === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="gym-card p-0 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image container with second angle on hover + Out of Stock overlay */}
                  <div className="relative h-64 overflow-hidden bg-[#0A0A0A]">
                    <img
                      src={isHovered ? product.hoverImage : product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                          !product.inStock ? 'bg-[#EF4444] text-white' : 'bg-[#FF6B00] text-white shadow'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded bg-black/75 text-[10px] text-[#A0A0A0]">
                      {isHovered ? 'Angle 2 Preview' : 'Hover for 2nd Angle'}
                    </span>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-5 py-2 rounded-xl border-2 border-[#EF4444] text-[#EF4444] font-display text-2xl tracking-wider uppercase">
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#FF6B00] font-bold uppercase">{product.category}</span>
                      <div className="flex items-center gap-1 text-white font-semibold">
                        <Star className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                        <span>{product.rating}</span>
                        <span className="text-[#A0A0A0]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-white">{product.name}</h3>
                    <p className="text-xs text-[#A0A0A0] line-clamp-2">{product.description}</p>

                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="font-display text-3xl text-white">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#A0A0A0] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    disabled={!product.inStock}
                    onClick={() => {
                      addToCart(product);
                      setIsCartOpen(true);
                    }}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                      product.inStock
                        ? 'btn-primary'
                        : 'bg-[#2A2A2A] text-[#A0A0A0] cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
