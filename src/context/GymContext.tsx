'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  GymClass,
  Trainer,
  Product,
  WorkoutVideo,
  MeasurementEntry,
  PersonalRecord,
  PointsHistoryItem,
  AdminMember,
  INITIAL_CLASSES,
  INITIAL_TRAINERS,
  INITIAL_PRODUCTS,
  INITIAL_VIDEOS,
  INITIAL_MEASUREMENTS,
  INITIAL_PRS,
  INITIAL_POINTS_HISTORY,
  INITIAL_ADMIN_MEMBERS,
} from '@/data/gymData';

export type Language = 'en' | 'fr' | 'ar';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  plan: 'Basic' | 'Pro' | 'Elite';
  role: 'member' | 'trainer' | 'admin';
  memberId: string;
  streakDays: number;
  classesThisMonth: number;
  joinDate: string;
  expiryDate: string;
  autoRenew: boolean;
  fitnessGoal: string;
  fitnessLevel: string;
  assignedTrainerId: string;
}

interface GymContextType {
  gymName: string;
  setGymName: (name: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  isLoggedIn: boolean;
  user: UserProfile;
  login: (email?: string, role?: 'member' | 'trainer' | 'admin', plan?: 'Basic' | 'Pro' | 'Elite', name?: string) => void;
  logout: () => void;
  updateUser: (partial: Partial<UserProfile>) => void;

  // Live Capacity
  occupancyCount: number;
  maxCapacity: number;
  occupancyPct: number;
  setOccupancyCount: (count: number) => void;
  notifyWhenQuiet: boolean;
  setNotifyWhenQuiet: (val: boolean) => void;

  // Classes & Booking
  classes: GymClass[];
  bookedClassIds: string[];
  waitlistClassIds: string[];
  activeBookingClass: GymClass | null;
  setActiveBookingClass: (cls: GymClass | null) => void;
  bookClass: (classId: string) => void;
  cancelClassBooking: (classId: string) => void;
  joinClassWaitlist: (classId: string) => void;
  addAdminClass: (newClass: Omit<GymClass, 'id'>) => void;
  deleteAdminClass: (classId: string) => void;

  // Trainers
  trainers: Trainer[];
  bookedSessions: { id: string; trainerName: string; packageType: string; date: string; slot: string; price: number }[];
  bookTrainerSession: (trainerName: string, packageType: string, date: string, slot: string, price: number) => void;

  // Store & Cart
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, option?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  orders: { id: string; items: number; total: number; status: string; date: string; customer: string }[];
  placeOrder: (customerName: string, total: number) => string;
  addAdminProduct: (prod: Omit<Product, 'id'>) => void;

  // Videos
  videos: WorkoutVideo[];
  favoriteVideoIds: string[];
  completedVideoIds: string[];
  toggleFavoriteVideo: (videoId: string) => void;
  markVideoComplete: (videoId: string) => void;

  // Progress
  measurements: MeasurementEntry[];
  prs: PersonalRecord[];
  goalWeight: number;
  goalDate: string;
  addMeasurement: (entry: Omit<MeasurementEntry, 'id'>) => void;
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id'>) => void;
  updateGoal: (weight: number, date: string) => void;

  // Loyalty & Rewards
  points: number;
  pointsHistory: PointsHistoryItem[];
  redeemedCodes: { title: string; code: string; date: string }[];
  addPoints: (amount: number, reason: string) => void;
  redeemReward: (title: string, cost: number) => string | null;

  // Admin Members
  adminMembers: AdminMember[];
  updateAdminMemberStatus: (id: string, status: 'Active' | 'Paused' | 'Suspended') => void;
  updateAdminMemberPlan: (id: string, plan: 'Basic' | 'Pro' | 'Elite') => void;

  // Global Modals & Toasts
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  isPromoModalOpen: boolean;
  setIsPromoModalOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    nav_home: 'Home',
    nav_classes: 'Classes',
    nav_trainers: 'Trainers',
    nav_store: 'Store',
    nav_pricing: 'Pricing',
    nav_videos: 'Videos',
    nav_capacity: 'Live Capacity',
    nav_rewards: 'Rewards',
    nav_dashboard: 'Dashboard',
    nav_admin: 'Admin',
    nav_login: 'Login',
    nav_join: 'Join Now',
    hero_headline: 'TRANSFORM YOUR BODY. ELEVATE YOUR LIFE.',
    hero_sub: 'Join APEX FITNESS — The Smarter Way to Train',
    cta_trial: 'Start Free Trial',
    cta_explore: 'Explore Classes',
    status_quiet: 'QUIET',
    status_moderate: 'MODERATE',
    status_busy: 'BUSY',
  },
  fr: {
    nav_home: 'Accueil',
    nav_classes: 'Cours',
    nav_trainers: 'Coachs',
    nav_store: 'Boutique',
    nav_pricing: 'Tarifs',
    nav_videos: 'Vidéos',
    nav_capacity: 'Affluence Live',
    nav_rewards: 'Fidélité',
    nav_dashboard: 'Espace Membre',
    nav_admin: 'Admin',
    nav_login: 'Connexion',
    nav_join: 'Rejoindre',
    hero_headline: 'TRANSFORMEZ VOTRE CORPS. ÉLEVEZ VOTRE VIE.',
    hero_sub: 'Rejoignez APEX FITNESS — La Façon Intelligente de S’entraîner',
    cta_trial: 'Essai Gratuit 7 Jours',
    cta_explore: 'Voir les Cours',
    status_quiet: 'CALME',
    status_moderate: 'MODÉRÉ',
    status_busy: 'CHARGÉ',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_classes: 'الحصص',
    nav_trainers: 'المدربون',
    nav_store: 'المتجر',
    nav_pricing: 'الاشتراكات',
    nav_videos: 'الفيديوهات',
    nav_capacity: 'الازدحام المباشر',
    nav_rewards: 'المكافآت',
    nav_dashboard: 'لوحة العضو',
    nav_admin: 'الإدارة',
    nav_login: 'دخول',
    nav_join: 'اشترك الآن',
    hero_headline: 'حوّل جسدك. ارتقِ بحياتك.',
    hero_sub: 'انضم إلى APEX FITNESS — الطريقة الأذكى للتدريب',
    cta_trial: 'ابدأ التجربة المجانية',
    cta_explore: 'استكشف الحصص',
    status_quiet: 'هادئ',
    status_moderate: 'متوسط',
    status_busy: 'مزدحم',
  },
};

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: React.ReactNode }) {
  const [gymName, setGymName] = useState('APEX FITNESS');
  const [lang, setLang] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Rivera',
    email: 'alex.rivera@apexfitness.io',
    phone: '+1 (555) 839-2041',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    plan: 'Pro',
    role: 'member',
    memberId: 'APEX-88421-PRO',
    streakDays: 14,
    classesThisMonth: 18,
    joinDate: 'Jan 14, 2026',
    expiryDate: 'Nov 01, 2026',
    autoRenew: true,
    fitnessGoal: 'Lean Muscle & Athletic Conditioning',
    fitnessLevel: 'Intermediate',
    assignedTrainerId: 'tr-1',
  });

  // Live Capacity
  const [occupancyCount, setOccupancyCount] = useState(64);
  const maxCapacity = 150;
  const occupancyPct = Math.round((occupancyCount / maxCapacity) * 100);
  const [notifyWhenQuiet, setNotifyWhenQuiet] = useState(false);

  // Classes & Booking
  const [classes, setClasses] = useState<GymClass[]>(INITIAL_CLASSES);
  const [bookedClassIds, setBookedClassIds] = useState<string[]>(['cls-1', 'cls-2', 'cls-4']);
  const [waitlistClassIds, setWaitlistClassIds] = useState<string[]>([]);
  const [activeBookingClass, setActiveBookingClass] = useState<GymClass | null>(null);

  // Trainers
  const [trainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [bookedSessions, setBookedSessions] = useState([
    {
      id: 'ses-101',
      trainerName: 'Marcus Vance',
      packageType: 'Single 1-on-1 Session',
      date: 'Fri, Oct 2',
      slot: '10:30 AM',
      price: 85,
    },
  ]);

  // Store & Cart
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedOption: 'Double Rich Chocolate',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 'ORD-9042', items: 2, total: 91.98, status: 'Pending Fulfillment', date: 'Today, 09:14 AM', customer: 'Sami Ben-Youssef' },
    { id: 'ORD-9041', items: 1, total: 99.00, status: 'Pending Fulfillment', date: 'Today, 08:02 AM', customer: 'Sophia Martinez' },
    { id: 'ORD-9040', items: 3, total: 128.98, status: 'Shipped', date: 'Yesterday', customer: 'Liam O’Connor' },
    { id: 'ORD-9039', items: 1, total: 54.99, status: 'Delivered', date: 'Sep 29, 2026', customer: 'Alex Rivera' },
  ]);

  // Videos
  const [videos] = useState<WorkoutVideo[]>(INITIAL_VIDEOS);
  const [favoriteVideoIds, setFavoriteVideoIds] = useState<string[]>(['vid-1', 'vid-2']);
  const [completedVideoIds, setCompletedVideoIds] = useState<string[]>(['vid-3']);

  // Progress
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>(INITIAL_MEASUREMENTS);
  const [prs, setPrs] = useState<PersonalRecord[]>(INITIAL_PRS);
  const [goalWeight, setGoalWeight] = useState(176.0);
  const [goalDate, setGoalDate] = useState('2026-12-15');

  // Loyalty & Rewards
  const [points, setPoints] = useState(1450);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryItem[]>(INITIAL_POINTS_HISTORY);
  const [redeemedCodes, setRedeemedCodes] = useState<{ title: string; code: string; date: string }[]>([]);

  // Admin Members
  const [adminMembers, setAdminMembers] = useState<AdminMember[]>(INITIAL_ADMIN_MEMBERS);

  // Modals & Toasts
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = 'tst-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const login = (
    email = 'alex.rivera@apexfitness.io',
    role: 'member' | 'trainer' | 'admin' = 'member',
    plan: 'Basic' | 'Pro' | 'Elite' = 'Pro',
    name = 'Alex Rivera'
  ) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      email,
      role,
      plan,
      name,
    }));
    showToast(`Welcome back, ${name}! 💪`, `Logged in as ${plan} ${role.toUpperCase()}`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Signed Out', 'You have been safely logged out of your account.', 'info');
  };

  const updateUser = (partial: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...partial }));
    showToast('Profile Updated', 'Your settings and membership preferences have been saved.', 'success');
  };

  const addPoints = (amount: number, reason: string) => {
    setPoints((prev) => prev + amount);
    setPointsHistory((prev) => [
      {
        id: 'ph-' + Date.now(),
        action: reason,
        points: amount,
        date: 'Just now',
        type: amount >= 0 ? 'earned' : 'redeemed',
      },
      ...prev,
    ]);
  };

  const bookClass = (classId: string) => {
    const target = classes.find((c) => c.id === classId);
    if (!target) return;
    if (bookedClassIds.includes(classId)) {
      showToast('Already Booked', `Youalready have a reserved spot in ${target.name}.`, 'info');
      return;
    }
    setBookedClassIds((prev) => [...prev, classId]);
    setClasses((prev) =>
      prev.map((c) => (c.id === classId && c.spotsLeft > 0 ? { ...c, spotsLeft: c.spotsLeft - 1 } : c))
    );
    setUser((prev) => ({ ...prev, classesThisMonth: prev.classesThisMonth + 1 }));
    addPoints(15, `Booked Class: ${target.name}`);
    showToast(
      `Class Booked: ${target.name}`,
      `SMS & Email confirmation sent to ${user.email}. (+15 Loyalty Pts!)`,
      'success'
    );
  };

  const cancelClassBooking = (classId: string) => {
    const target = classes.find((c) => c.id === classId);
    setBookedClassIds((prev) => prev.filter((id) => id !== classId));
    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, spotsLeft: Math.min(c.maxSpots, c.spotsLeft + 1) } : c))
    );
    showToast('Booking Cancelled', target ? `Your spot in ${target.name} has been released.` : 'Spot released.', 'info');
  };

  const joinClassWaitlist = (classId: string) => {
    const target = classes.find((c) => c.id === classId);
    if (!waitlistClassIds.includes(classId)) {
      setWaitlistClassIds((prev) => [...prev, classId]);
    }
    showToast(
      'Added to Priority Waitlist',
      `We will notify you via SMS the second a spot opens in ${target?.name || 'this class'}.`,
      'info'
    );
  };

  const addAdminClass = (newClass: Omit<GymClass, 'id'>) => {
    const created: GymClass = { ...newClass, id: 'cls-' + Date.now() };
    setClasses((prev) => [created, ...prev]);
    showToast('Class Created', `${created.name} added to live schedule.`, 'success');
  };

  const deleteAdminClass = (classId: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    showToast('Class Removed', 'The class has been removed from the schedule.', 'info');
  };

  const bookTrainerSession = (trainerName: string, packageType: string, date: string, slot: string, price: number) => {
    setBookedSessions((prev) => [
      { id: 'ses-' + Date.now(), trainerName, packageType, date, slot, price },
      ...prev,
    ]);
    addPoints(50, `Booked PT Session with ${trainerName}`);
    showToast(
      `Session Confirmed with ${trainerName}!`,
      `${packageType} scheduled for ${date} at ${slot}. (+50 Loyalty Pts)`,
      'success'
    );
  };

  const addToCart = (product: Product, option?: string) => {
    if (!product.inStock) {
      showToast('Out of Stock', 'This item is currently sold out.', 'error');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, selectedOption: option || product.flavorsOrSizes?.[0] }];
    });
    showToast('Added to Cart 🛒', `${product.name} added to your gear bag.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerName: string, total: number) => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const itemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    setOrders((prev) => [
      {
        id: orderId,
        items: itemsCount,
        total,
        status: 'Pending Fulfillment',
        date: 'Just now',
        customer: customerName,
      },
      ...prev,
    ]);
    const earnedPts = Math.round(total);
    addPoints(earnedPts, `Store Order #${orderId}`);
    clearCart();
    showToast(
      `Order #${orderId} Confirmed!`,
      `Receipt sent to ${user.email}. You earned +${earnedPts} Loyalty Points!`,
      'success'
    );
    return orderId;
  };

  const addAdminProduct = (prod: Omit<Product, 'id'>) => {
    const created: Product = { ...prod, id: 'prd-' + Date.now() };
    setProducts((prev) => [created, ...prev]);
    showToast('Product Added', `${created.name} is now live in the store.`, 'success');
  };

  const toggleFavoriteVideo = (videoId: string) => {
    setFavoriteVideoIds((prev) => {
      const exists = prev.includes(videoId);
      showToast(
        exists ? 'Removed from Favorites' : 'Saved to Favorites ❤️',
        exists ? 'Video removed from your saved list.' : 'Video bookmarked in your library.',
        'info'
      );
      return exists ? prev.filter((id) => id !== videoId) : [...prev, videoId];
    });
  };

  const markVideoComplete = (videoId: string) => {
    if (!completedVideoIds.includes(videoId)) {
      setCompletedVideoIds((prev) => [...prev, videoId]);
      const vid = videos.find((v) => v.id === videoId);
      addPoints(20, `Completed Workout: ${vid?.title || 'Video Session'}`);
      showToast('Workout Complete! 🔥', 'Awesome effort! +20 Loyalty Points added to your balance.', 'success');
    } else {
      showToast('Already Completed', 'You already logged this workout session today.', 'info');
    }
  };

  const addMeasurement = (entry: Omit<MeasurementEntry, 'id'>) => {
    const created: MeasurementEntry = { ...entry, id: 'm-' + Date.now() };
    setMeasurements((prev) => [...prev, created]);
    addPoints(15, 'Logged Body Progress Check-In');
    showToast('Progress Logged 📈', 'Your body measurements & charts have been updated! (+15 Pts)', 'success');
  };

  const addPersonalRecord = (pr: Omit<PersonalRecord, 'id'>) => {
    const created: PersonalRecord = { ...pr, id: 'pr-' + Date.now() };
    setPrs((prev) => [created, ...prev]);
    addPoints(25, `New Personal Record: ${pr.lift} (${pr.weight} ${pr.unit})`);
    showToast('NEW PR UNLOCKED! 🏆', `${pr.lift}: ${pr.weight} ${pr.unit} (+25 Loyalty Points!)`, 'success');
  };

  const updateGoal = (weight: number, date: string) => {
    setGoalWeight(weight);
    setGoalDate(date);
    showToast('Target Goal Updated', `New target: ${weight} lbs by ${date}. Let's get it!`, 'success');
  };

  const redeemReward = (title: string, cost: number): string | null => {
    if (points < cost) {
      showToast('Insufficient Points', `You need ${cost - points} more points to unlock ${title}.`, 'error');
      return null;
    }
    const code = 'APEX-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setPoints((prev) => prev - cost);
    setPointsHistory((prev) => [
      {
        id: 'ph-' + Date.now(),
        action: `Redeemed: ${title}`,
        points: -cost,
        date: 'Just now',
        type: 'redeemed',
      },
      ...prev,
    ]);
    setRedeemedCodes((prev) => [{ title, code, date: 'Today' }, ...prev]);
    showToast('Reward Unlocked! 🎁', `Use voucher code ${code} at checkout or front desk.`, 'success');
    return code;
  };

  const updateAdminMemberStatus = (id: string, status: 'Active' | 'Paused' | 'Suspended') => {
    setAdminMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    showToast('Member Status Updated', `Member ${id} is now ${status}.`, 'info');
  };

  const updateAdminMemberPlan = (id: string, plan: 'Basic' | 'Pro' | 'Elite') => {
    setAdminMembers((prev) => prev.map((m) => (m.id === id ? { ...m, plan } : m)));
    showToast('Member Plan Updated', `Member ${id} switched to ${plan} plan.`, 'success');
  };

  return (
    <GymContext.Provider
      value={{
        gymName,
        setGymName,
        lang,
        setLang,
        t,
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
        occupancyCount,
        maxCapacity,
        occupancyPct,
        setOccupancyCount,
        notifyWhenQuiet,
        setNotifyWhenQuiet,
        classes,
        bookedClassIds,
        waitlistClassIds,
        activeBookingClass,
        setActiveBookingClass,
        bookClass,
        cancelClassBooking,
        joinClassWaitlist,
        addAdminClass,
        deleteAdminClass,
        trainers,
        bookedSessions,
        bookTrainerSession,
        products,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        placeOrder,
        addAdminProduct,
        videos,
        favoriteVideoIds,
        completedVideoIds,
        toggleFavoriteVideo,
        markVideoComplete,
        measurements,
        prs,
        goalWeight,
        goalDate,
        addMeasurement,
        addPersonalRecord,
        updateGoal,
        points,
        pointsHistory,
        redeemedCodes,
        addPoints,
        redeemReward,
        adminMembers,
        updateAdminMemberStatus,
        updateAdminMemberPlan,
        isQrModalOpen,
        setIsQrModalOpen,
        isPromoModalOpen,
        setIsPromoModalOpen,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const ctx = useContext(GymContext);
  if (!ctx) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return ctx;
}
