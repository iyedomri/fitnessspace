export interface GymClass {
  id: string;
  name: string;
  type: 'HIIT' | 'Strength' | 'Yoga' | 'Cardio' | 'Boxing' | 'Mobility';
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  day: string;
  dateLabel: string;
  time: string;
  duration: string;
  spotsLeft: number;
  maxSpots: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  isLiveNow?: boolean;
  calories: string;
  room: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  description: string;
}

export interface TrainerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  resultBadge: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  photo: string;
  actionPhoto: string;
  bio: string;
  certifications: string[];
  specialties: string[];
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  clientsTrained: number;
  instagram: string;
  introVideoDuration: string;
  pricing: {
    single: number;
    pack5: number;
    pack10: number;
  };
  availability: {
    day: string;
    slots: string[];
  }[];
  reviews: TrainerReview[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Supplements' | 'Gear' | 'Apparel' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  badge?: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  flavorsOrSizes?: string[];
}

export interface WorkoutVideo {
  id: string;
  title: string;
  category:
    | 'Featured'
    | 'HIIT Workouts'
    | 'Strength Training'
    | 'Yoga & Flexibility'
    | 'Cardio Burn'
    | 'Beginner Friendly'
    | 'Quick (Under 20 Min)';
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  duration: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  thumbnail: string;
  isPremium: boolean;
  equipment: string[];
  description: string;
  chapters: { time: string; title: string }[];
}

export interface MeasurementEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat: number;
  chest: number;
  waist: number;
  hips: number;
  arms: number;
  legs: number;
}

export interface PersonalRecord {
  id: string;
  lift: string;
  weight: number;
  unit: string;
  date: string;
  improvement: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  category: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface PointsHistoryItem {
  id: string;
  action: string;
  points: number;
  date: string;
  type: 'earned' | 'redeemed';
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'Basic' | 'Pro' | 'Elite';
  status: 'Active' | 'Paused' | 'Suspended';
  joinDate: string;
  points: number;
  lastCheckIn: string;
  monthlySpend: number;
}

export const INITIAL_CLASSES: GymClass[] = [
  {
    id: 'cls-1',
    name: 'INFERNO METCON 45',
    type: 'HIIT',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80',
    day: 'Today',
    dateLabel: 'Thu, Oct 1',
    time: '07:00 AM',
    duration: '45 min',
    spotsLeft: 2,
    maxSpots: 20,
    difficulty: 4,
    isLiveNow: true,
    calories: '650-800 kcal',
    room: 'Studio A — Red Zone',
    level: 'Intermediate',
    description: 'High-octane metabolic conditioning combining assault bikes, kettlebell complexes, and explosive plyometrics.',
  },
  {
    id: 'cls-2',
    name: 'TITAN BARBELL CLUB',
    type: 'Strength',
    trainerId: 'tr-1',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
    day: 'Today',
    dateLabel: 'Thu, Oct 1',
    time: '09:30 AM',
    duration: '60 min',
    spotsLeft: 6,
    maxSpots: 16,
    difficulty: 5,
    isLiveNow: false,
    calories: '500-650 kcal',
    room: 'Main Lifting Platform',
    level: 'Advanced',
    description: 'Compound strength progression focusing on squat, bench, and deadlift mechanics with velocity-based feedback.',
  },
  {
    id: 'cls-3',
    name: 'ATHLETIC FLOW & MOBILITY',
    type: 'Yoga',
    trainerId: 'tr-3',
    trainerName: 'Kenji Takahashi',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    day: 'Today',
    dateLabel: 'Thu, Oct 1',
    time: '12:00 PM',
    duration: '50 min',
    spotsLeft: 9,
    maxSpots: 24,
    difficulty: 2,
    isLiveNow: false,
    calories: '320-420 kcal',
    room: 'Zen Loft — Floor 2',
    level: 'All Levels',
    description: 'Decompress joints, unlock hip and thoracic mobility, and accelerate nervous system recovery.',
  },
  {
    id: 'cls-4',
    name: 'APEX BOXING & BAG BURN',
    type: 'Boxing',
    trainerId: 'tr-5',
    trainerName: 'Tariq Al-Mansoor',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    day: 'Today',
    dateLabel: 'Thu, Oct 1',
    time: '05:30 PM',
    duration: '50 min',
    spotsLeft: 3,
    maxSpots: 18,
    difficulty: 4,
    isLiveNow: false,
    calories: '700-850 kcal',
    room: 'Combat Arena',
    level: 'All Levels',
    description: '10 rounds of sharp boxing combinations, heavy bag intervals, footwork drills, and fighter core conditioning.',
  },
  {
    id: 'cls-5',
    name: 'NITRO ENDURANCE SPRINT',
    type: 'Cardio',
    trainerId: 'tr-6',
    trainerName: 'Chloe Moreau',
    trainerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    day: 'Today',
    dateLabel: 'Thu, Oct 1',
    time: '06:45 PM',
    duration: '45 min',
    spotsLeft: 1,
    maxSpots: 22,
    difficulty: 4,
    isLiveNow: false,
    calories: '600-750 kcal',
    room: 'Cardio Lab',
    level: 'Intermediate',
    description: 'Skillmill curved treadmill sprints paired with Concept2 SkiErg and RowErg VO2-max intervals.',
  },
  {
    id: 'cls-6',
    name: 'OLYMPIC LIFTING FOUNDATIONS',
    type: 'Strength',
    trainerId: 'tr-4',
    trainerName: 'Sarah Jenkins',
    trainerAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80',
    day: 'Friday',
    dateLabel: 'Fri, Oct 2',
    time: '08:00 AM',
    duration: '60 min',
    spotsLeft: 7,
    maxSpots: 14,
    difficulty: 3,
    isLiveNow: false,
    calories: '480-600 kcal',
    room: 'Main Lifting Platform',
    level: 'Beginner',
    description: 'Master the snatch and clean & jerk with technical progressions, pulls, and overhead stability work.',
  },
  {
    id: 'cls-7',
    name: 'SHRED 360 CIRCUIT',
    type: 'HIIT',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80',
    day: 'Friday',
    dateLabel: 'Fri, Oct 2',
    time: '05:00 PM',
    duration: '45 min',
    spotsLeft: 0,
    maxSpots: 20,
    difficulty: 5,
    isLiveNow: false,
    calories: '750-900 kcal',
    room: 'Studio A — Red Zone',
    level: 'Advanced',
    description: 'Full-body fat-incinerating 12-station turf circuit with sled pushes, battle ropes, and dumbbell thrusters.',
  },
  {
    id: 'cls-8',
    name: 'SATURDAY WARRIOR HYPERTROPHY',
    type: 'Strength',
    trainerId: 'tr-1',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
    day: 'Saturday',
    dateLabel: 'Sat, Oct 3',
    time: '10:00 AM',
    duration: '75 min',
    spotsLeft: 5,
    maxSpots: 20,
    difficulty: 4,
    isLiveNow: false,
    calories: '620-780 kcal',
    room: 'Main Lifting Platform',
    level: 'Intermediate',
    description: 'High-volume upper and lower body hypertrophy supersets engineered for maximum muscle fiber recruitment.',
  },
  {
    id: 'cls-9',
    name: 'SUNDAY DEEP RECOVERY & BREATH',
    type: 'Yoga',
    trainerId: 'tr-3',
    trainerName: 'Kenji Takahashi',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    day: 'Sunday',
    dateLabel: 'Sun, Oct 4',
    time: '11:00 AM',
    duration: '60 min',
    spotsLeft: 12,
    maxSpots: 25,
    difficulty: 1,
    isLiveNow: false,
    calories: '240-320 kcal',
    room: 'Zen Loft — Floor 2',
    level: 'Beginner',
    description: 'Guided myofascial release, yin yoga holds, and box breathing to reset cortisol and prepare for the week.',
  },
  {
    id: 'cls-10',
    name: 'MONDAY POWER IGNITION',
    type: 'HIIT',
    trainerId: 'tr-5',
    trainerName: 'Tariq Al-Mansoor',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    day: 'Monday',
    dateLabel: 'Mon, Oct 5',
    time: '06:30 AM',
    duration: '45 min',
    spotsLeft: 4,
    maxSpots: 20,
    difficulty: 4,
    isLiveNow: false,
    calories: '680-820 kcal',
    room: 'Studio A — Red Zone',
    level: 'All Levels',
    description: 'Kickstart your week with explosive medicine ball slams, sprint intervals, and functional core work.',
  },
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Marcus Vance',
    role: 'Head of Strength & Performance',
    photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    bio: 'Former NCAA Division I strength coach with 9+ years transforming everyday athletes and competitive lifters. Marcus specializes in evidence-based hypertrophy, powerlifting mechanics, and sustainable body recomposition.',
    certifications: ['NSCA-CSCS', 'USA Powerlifting Club Coach', 'Precision Nutrition L2', 'FMS Level 2'],
    specialties: ['Strength & Conditioning', 'Bodybuilding', 'Powerlifting', 'Body Recomposition'],
    rating: 4.98,
    reviewsCount: 142,
    experienceYears: 9,
    clientsTrained: 480,
    instagram: '@marcusvance.strength',
    introVideoDuration: '0:30',
    pricing: {
      single: 85,
      pack5: 390,
      pack10: 720,
    },
    availability: [
      { day: 'Thu, Oct 1', slots: ['11:00 AM', '02:00 PM', '04:30 PM'] },
      { day: 'Fri, Oct 2', slots: ['08:00 AM', '10:30 AM', '03:00 PM', '06:00 PM'] },
      { day: 'Sat, Oct 3', slots: ['09:00 AM', '01:00 PM'] },
      { day: 'Mon, Oct 5', slots: ['07:00 AM', '11:00 AM', '04:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'David K.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 weeks ago',
        text: 'Added 65 lbs to my deadlift and dropped 4% body fat in 12 weeks with Marcus. His cueing on compound lifts is unmatched.',
        resultBadge: '+65 lbs Deadlift',
      },
      {
        id: 'rev-2',
        author: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 month ago',
        text: 'I was intimidated by the free weight floor before working with Marcus. Now I squat 185 lbs with zero knee pain!',
        resultBadge: '-14 lbs Fat Loss',
      },
      {
        id: 'rev-3',
        author: 'Liam O’Connor',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 month ago',
        text: 'Every session is tracked to the pound and rep. Worth every single dollar if you want real measurable progress.',
        resultBadge: '+11 lbs Lean Mass',
      },
      {
        id: 'rev-4',
        author: 'Nadia Ben-Ali',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 months ago',
        text: 'Best investment I made this year. The custom nutrition targets combined with his 4-day split transformed my physique.',
        resultBadge: 'Pro Stage Ready',
      },
      {
        id: 'rev-5',
        author: 'Jason Wu',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 months ago',
        text: 'Marcus fixed my shoulder impingement in two sessions and helped me hit my first 225 lb bench press.',
        resultBadge: '225 lb Bench PR',
      },
      {
        id: 'rev-6',
        author: 'Carlos Mendez',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 months ago',
        text: 'Unbelievable energy and accountability. Checks in every week on macros and sleep recovery.',
        resultBadge: '-22 lbs in 16 Wks',
      },
    ],
  },
  {
    id: 'tr-2',
    name: 'Elena Rostova',
    role: 'HIIT & Metabolic Specialist',
    photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    bio: 'High-energy metabolic conditioning architect and former national track sprinter. Elena designs fat-torching HIIT protocols that preserve lean muscle while skyrocketing VO2 max and athletic stamina.',
    certifications: ['NASM-CPT', 'TRX Master Instructor', 'Hyrox Performance Coach', 'ISSN Sports Nutrition'],
    specialties: ['Weight Loss', 'HIIT & MetCon', 'Hyrox Prep', 'Athletic Conditioning'],
    rating: 4.96,
    reviewsCount: 118,
    experienceYears: 7,
    clientsTrained: 390,
    instagram: '@elena.metcon',
    introVideoDuration: '0:30',
    pricing: {
      single: 75,
      pack5: 340,
      pack10: 620,
    },
    availability: [
      { day: 'Thu, Oct 1', slots: ['10:00 AM', '01:30 PM', '05:00 PM'] },
      { day: 'Fri, Oct 2', slots: ['09:00 AM', '12:00 PM', '04:00 PM'] },
      { day: 'Sat, Oct 3', slots: ['11:00 AM', '02:30 PM'] },
    ],
    reviews: [
      {
        id: 'rev-201',
        author: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 week ago',
        text: 'Lost 18 lbs in 10 weeks with Elena! Her energy in 1-on-1 sessions and Inferno MetCon classes is contagious.',
        resultBadge: '-18 lbs Weight Loss',
      },
      {
        id: 'rev-202',
        author: 'Omar Farooq',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 weeks ago',
        text: 'Prepared me for my first Hyrox race in under 8 weeks. Shaved 9 minutes off my target finish time!',
        resultBadge: 'Hyrox Finisher',
      },
      {
        id: 'rev-203',
        author: 'Hannah Abbott',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 month ago',
        text: 'Elena knows exactly when to push you and when to adjust intensity. Never felt stronger or leaner.',
        resultBadge: '-6% Body Fat',
      },
      {
        id: 'rev-204',
        author: 'Marcus Lin',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 months ago',
        text: 'My resting heart rate dropped from 74 to 56 bpm after 2 months of Elena’s conditioning blocks.',
        resultBadge: 'VO2 Max +19%',
      },
      {
        id: 'rev-205',
        author: 'Zoe Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 months ago',
        text: 'Zero boredom. Every single session feels like training like a pro athlete.',
        resultBadge: '100% Consistency',
      },
    ],
  },
  {
    id: 'tr-3',
    name: 'Kenji Takahashi',
    role: 'Mobility, Yoga & Recovery Master',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
    bio: 'Blending FRC (Functional Range Conditioning), power vinyasa yoga, and sports physical therapy principles, Kenji helps lifters and executives eliminate chronic stiffness and move pain-free.',
    certifications: ['E-RYT 500 Yoga Alliance', 'FRCms Mobility Specialist', 'Oxygen Advantage Breathwork', 'Kinstretch L2'],
    specialties: ['Yoga & Flexibility', 'Joint Mobility', 'Injury Prevention', 'Breathwork & Recovery'],
    rating: 4.97,
    reviewsCount: 96,
    experienceYears: 8,
    clientsTrained: 310,
    instagram: '@kenji.flowstate',
    introVideoDuration: '0:30',
    pricing: {
      single: 70,
      pack5: 320,
      pack10: 590,
    },
    availability: [
      { day: 'Thu, Oct 1', slots: ['09:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Sat, Oct 3', slots: ['10:00 AM', '01:30 PM', '03:30 PM'] },
      { day: 'Sun, Oct 4', slots: ['09:30 AM', '01:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-301',
        author: 'Arthur Pendelton',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '5 days ago',
        text: 'Years of desk work wrecked my lower back. After 5 sessions with Kenji, my hip mobility and squat depth are brand new.',
        resultBadge: 'Pain-Free Squat',
      },
      {
        id: 'rev-302',
        author: 'Elena G.',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 weeks ago',
        text: 'His athletic flow sessions are the secret weapon for my marathon recovery.',
        resultBadge: 'Full Splits Unlocked',
      },
    ],
  },
  {
    id: 'tr-4',
    name: 'Sarah Jenkins',
    role: 'Olympic Lifting & Glute Sculpt Coach',
    photo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
    bio: 'USAW National Coach and physique transformation specialist. Sarah empowers members to master technical barbell lifts, build lower-body power, and develop bullet-proof core stability.',
    certifications: ['USAW Level 2 Coach', 'ACE-CPT', 'BioLayne Nutrition Cert', 'Pre/Post-Natal Fitness'],
    specialties: ['Olympic Lifting', 'Glute & Lower Body', 'Strength Training', 'Nutrition Coaching'],
    rating: 4.94,
    reviewsCount: 84,
    experienceYears: 6,
    clientsTrained: 260,
    instagram: '@sarahjenkins.lifts',
    introVideoDuration: '0:30',
    pricing: {
      single: 75,
      pack5: 345,
      pack10: 640,
    },
    availability: [
      { day: 'Fri, Oct 2', slots: ['10:00 AM', '01:00 PM', '04:30 PM'] },
      { day: 'Sat, Oct 3', slots: ['08:30 AM', '12:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-401',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 weeks ago',
        text: 'Sarah broke down the clean and jerk so clearly that I hit a 135 lb PR within my first month!',
        resultBadge: '135 lb Clean & Jerk',
      },
    ],
  },
  {
    id: 'tr-5',
    name: 'Tariq Al-Mansoor',
    role: 'Combat Conditioning & Boxing Pro',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1000&q=80',
    bio: 'Undefeated amateur Golden Gloves champion with 10 years of coaching pro fighters and executives. Tariq combines sweet-science pad work with relentless fight-camp conditioning.',
    certifications: ['USA Boxing Certified Coach', 'ISSA Strength & Conditioning', 'Kettlebell Athletics L2'],
    specialties: ['Boxing & Striking', 'Weight Loss', 'Core Shred', 'Speed & Agility'],
    rating: 4.99,
    reviewsCount: 165,
    experienceYears: 10,
    clientsTrained: 520,
    instagram: '@tariq.combatlab',
    introVideoDuration: '0:30',
    pricing: {
      single: 80,
      pack5: 365,
      pack10: 680,
    },
    availability: [
      { day: 'Thu, Oct 1', slots: ['01:00 PM', '03:30 PM', '07:00 PM'] },
      { day: 'Fri, Oct 2', slots: ['11:00 AM', '02:30 PM', '06:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-501',
        author: 'Sami Ben-Youssef',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '4 days ago',
        text: 'Pad work with Tariq burns 900 calories in an hour and melts stress away instantly. Best coach in the city.',
        resultBadge: '-24 lbs in 12 Wks',
      },
    ],
  },
  {
    id: 'tr-6',
    name: 'Chloe Moreau',
    role: 'Endurance, Core & Athletic Pilates',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    actionPhoto: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1000&q=80',
    bio: 'Triathlete and functional core specialist from Lyon. Chloe bridges high-output cardio intervals with deep core stabilization so you look sculpted and perform effortlessly.',
    certifications: ['ACSM-CPT', 'STOTT Pilates Reformer & Mat', 'Ironman Certified Coach'],
    specialties: ['Cardio Endurance', 'Core & Pilates', 'Toning & Sculpt', 'Beginner Friendly'],
    rating: 4.92,
    reviewsCount: 73,
    experienceYears: 5,
    clientsTrained: 215,
    instagram: '@chloemoreau.fit',
    introVideoDuration: '0:30',
    pricing: {
      single: 65,
      pack5: 300,
      pack10: 550,
    },
    availability: [
      { day: 'Thu, Oct 1', slots: ['08:30 AM', '12:30 PM', '04:00 PM'] },
      { day: 'Sat, Oct 3', slots: ['09:30 AM', '11:30 AM'] },
    ],
    reviews: [
      {
        id: 'rev-601',
        author: 'Claire Dubois',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 week ago',
        text: 'Chloe helped me go from struggling to run 2km to finishing my first half-marathon pain-free!',
        resultBadge: '21K Finisher',
      },
    ],
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prd-1',
    name: 'APEX ISO-PURE WHEY PROTEIN (5 LBS)',
    category: 'Supplements',
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=80',
    badge: 'FLASH SALE -21%',
    inStock: true,
    stockCount: 42,
    description: '27g ultra-filtered cold-processed whey isolate per scoop, 6.2g BCAAs, zero added sugar, instant mixability.',
    flavorsOrSizes: ['Double Rich Chocolate', 'Vanilla Bean Ice Cream', 'Salted Caramel'],
  },
  {
    id: 'prd-2',
    name: 'IGNITE OVERDRIVE PRE-WORKOUT',
    category: 'Supplements',
    price: 36.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviewsCount: 248,
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
    badge: 'BEST SELLER 🔥',
    inStock: true,
    stockCount: 28,
    description: 'Clinical doses of L-Citrulline (8g), Beta-Alanine (3.2g), Alpha-GPC, and 300mg natural caffeine for skin-splitting pumps.',
    flavorsOrSizes: ['Electric Blood Orange', 'Sour Green Apple', 'Blue Raspberry Ice'],
  },
  {
    id: 'prd-3',
    name: 'TITAN 10MM LEVER POWER BELT',
    category: 'Gear',
    price: 99.00,
    originalPrice: 125.00,
    rating: 5.0,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
    badge: 'SAVE $26',
    inStock: true,
    stockCount: 15,
    description: 'IPF-approved genuine suede leather 10mm belt with aircraft-grade matte black quick-release lever buckle.',
    flavorsOrSizes: ['Small (26-31")', 'Medium (31-36")', 'Large (35-41")', 'XL (40-46")'],
  },
  {
    id: 'prd-4',
    name: 'APEX STEALTH PERFORMANCE HOODIE',
    category: 'Apparel',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80',
    badge: 'LIMITED DROP',
    inStock: true,
    stockCount: 19,
    description: '4-way stretch moisture-wicking ballistic fleece with athletic tapered shoulders and hidden zippered phone pocket.',
    flavorsOrSizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'prd-5',
    name: 'CARBON GRIP LIFTING STRAPS & WRAPS PRO',
    category: 'Gear',
    price: 27.00,
    originalPrice: 36.00,
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    badge: 'SALE -25%',
    inStock: true,
    stockCount: 54,
    description: 'Heavy-duty neoprene padded figure-8 lifting straps + 18-inch competition thumb-loop wrist wraps.',
    flavorsOrSizes: ['One Size Fits All'],
  },
  {
    id: 'prd-6',
    name: 'ULTRAPURE CREATINE MONOHYDRATE (500G)',
    category: 'Supplements',
    price: 29.99,
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=80',
    inStock: true,
    stockCount: 65,
    description: '100% pharmaceutical-grade micronized creatine monohydrate (100 servings) for explosive ATP regeneration.',
    flavorsOrSizes: ['Unflavored (100 Servings)'],
  },
  {
    id: 'prd-7',
    name: 'OVERSIZED PUMP TEE — OBSIDIAN & ORANGE',
    category: 'Apparel',
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
    badge: 'NEW ARRIVAL',
    inStock: true,
    stockCount: 33,
    description: 'Heavyweight 260gsm combed cotton drop-shoulder pump cover with high-density 3D puff print APEX branding.',
    flavorsOrSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prd-8',
    name: 'THERMO-LOCK STAINLESS SHAKER (28 OZ)',
    category: 'Accessories',
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.9,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=80',
    badge: 'MEMBER FAVORITE',
    inStock: true,
    stockCount: 47,
    description: 'Double-wall vacuum insulated stainless steel shaker with silent integrated agitator grid and supplement storage pod.',
    flavorsOrSizes: ['Matte Black / Orange', 'Brushed Titanium'],
  },
  {
    id: 'prd-9',
    name: 'APEX PRO PERCUSSIVE THERAPY MASSAGE GUN',
    category: 'Accessories',
    price: 129.00,
    originalPrice: 169.00,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80',
    badge: 'SOLD OUT',
    inStock: false,
    stockCount: 0,
    description: 'Brushless high-torque quiet motor with 16mm amplitude deep-tissue percussion and 6 titanium recovery attachments.',
    flavorsOrSizes: ['Pro Kit + Travel Case'],
  },
];

export const INITIAL_VIDEOS: WorkoutVideo[] = [
  {
    id: 'vid-1',
    title: '30-Min Full Body Metabolic Afterburn',
    category: 'Featured',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=80',
    duration: '32:15',
    durationMinutes: 32,
    difficulty: 'Intermediate',
    calories: 520,
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    isPremium: false,
    equipment: ['Dumbbells', 'Mat'],
    description: 'Torch calories for 24 hours post-workout with this relentless 40s-on / 20s-off full-body dumbbell and bodyweight circuit.',
    chapters: [
      { time: '00:00', title: 'Dynamic Neural Warmup & Joint Prep' },
      { time: '04:30', title: 'Block 1: Lower Body Explosive Power' },
      { time: '13:00', title: 'Block 2: Upper Push/Pull Supersets' },
      { time: '22:15', title: 'Block 3: Redline Tabata Finisher' },
      { time: '28:40', title: 'Parasympathetic Cooldown & Stretch' },
    ],
  },
  {
    id: 'vid-2',
    title: 'Chest & Back Hypertrophy Masterclass',
    category: 'Strength Training',
    trainerId: 'tr-1',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=80',
    duration: '48:00',
    durationMinutes: 48,
    difficulty: 'Advanced',
    calories: 610,
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    isPremium: true,
    equipment: ['Barbell', 'Dumbbells', 'Cables', 'Bench'],
    description: 'Antagonist superset training pairing heavy incline presses with chest-supported rows for maximum upper-torso thickness.',
    chapters: [
      { time: '00:00', title: 'Scapular Activation & Rotator Cuff Prep' },
      { time: '06:00', title: 'Superset A: Incline Barbell + Pendlay Row' },
      { time: '20:00', title: 'Superset B: Flat DB Press + Weighted Pull-ups' },
      { time: '35:00', title: 'Mechanical Drop Set Cable Flyes & Lat Pulldowns' },
    ],
  },
  {
    id: 'vid-3',
    title: '15-Min Morning Hip & Spine Unlock',
    category: 'Quick (Under 20 Min)',
    trainerId: 'tr-3',
    trainerName: 'Kenji Takahashi',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    duration: '15:40',
    durationMinutes: 15,
    difficulty: 'Beginner',
    calories: 140,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    isPremium: false,
    equipment: ['Yoga Mat'],
    description: 'Wake up your nervous system, open tight hip flexors, and restore thoracic rotation in just 15 minutes.',
    chapters: [
      { time: '00:00', title: 'Diaphragmatic Box Breathing' },
      { time: '03:00', title: '90/90 Hip Controlled Articular Rotations' },
      { time: '09:00', title: 'Thoracic Windmills & Deep Squat Hold' },
    ],
  },
  {
    id: 'vid-4',
    title: 'Shadowboxing & Core Conditioning Ignite',
    category: 'HIIT Workouts',
    trainerId: 'tr-5',
    trainerName: 'Tariq Al-Mansoor',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    duration: '28:20',
    durationMinutes: 28,
    difficulty: 'Intermediate',
    calories: 490,
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=80',
    isPremium: true,
    equipment: ['No Equipment'],
    description: '8 championship 3-minute rounds combining crisp boxing combinations, head movement, and hollow-body core burn.',
    chapters: [
      { time: '00:00', title: 'Stance, Footwork & Jab-Cross Mechanics' },
      { time: '05:00', title: 'Rounds 1-4: High-Volume Combo Flow' },
      { time: '17:00', title: 'Rounds 5-8: Slip-Counter + Sprawls' },
      { time: '25:00', title: '3-Minute Fighter Abs Finisher' },
    ],
  },
  {
    id: 'vid-5',
    title: 'Posterior Chain & Glute Builder',
    category: 'Strength Training',
    trainerId: 'tr-4',
    trainerName: 'Sarah Jenkins',
    trainerAvatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=200&q=80',
    duration: '42:10',
    durationMinutes: 42,
    difficulty: 'Intermediate',
    calories: 460,
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    isPremium: true,
    equipment: ['Barbell', 'Resistance Band', 'Bench'],
    description: 'Build explosive hamstrings and sculpted glutes through heavy hip thrusts, Romanian deadlifts, and Bulgarian split squats.',
    chapters: [
      { time: '00:00', title: 'Banded Glute Medius Activation' },
      { time: '06:30', title: 'Barbell Hip Thrust Pyramid' },
      { time: '19:00', title: 'Deficit Romanian Deadlifts' },
      { time: '31:00', title: 'Bulgarian Split Squat Burnout' },
    ],
  },
  {
    id: 'vid-6',
    title: 'Zero-Impact Cardio Sweat & Core',
    category: 'Beginner Friendly',
    trainerId: 'tr-6',
    trainerName: 'Chloe Moreau',
    trainerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    duration: '24:00',
    durationMinutes: 24,
    difficulty: 'Beginner',
    calories: 310,
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    isPremium: false,
    equipment: ['Mat'],
    description: 'Joint-friendly, apartment-safe cardio and core sculpting designed for beginners or active recovery days.',
    chapters: [
      { time: '00:00', title: 'Low-Impact Cardio Pulse Warmup' },
      { time: '06:00', title: 'Standing Core & Tempo Squats' },
      { time: '15:00', title: 'Mat Pilates Deep Ab Series' },
    ],
  },
  {
    id: 'vid-7',
    title: 'Power Vinyasa Flow for Lifters',
    category: 'Yoga & Flexibility',
    trainerId: 'tr-3',
    trainerName: 'Kenji Takahashi',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    duration: '35:00',
    durationMinutes: 35,
    difficulty: 'Intermediate',
    calories: 290,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    isPremium: true,
    equipment: ['Yoga Mat', 'Blocks'],
    description: 'Open tight pecs, lats, and hamstrings so you can hit deeper positions under the barbell.',
    chapters: [
      { time: '00:00', title: 'Breath & Shoulder Dislocates' },
      { time: '10:00', title: 'Warrior Flow & Lizard Lunge Progression' },
      { time: '25:00', title: 'Pigeon Pose & Supine Decompression' },
    ],
  },
  {
    id: 'vid-8',
    title: '18-Min Core & Oblique Torch',
    category: 'Quick (Under 20 Min)',
    trainerId: 'tr-6',
    trainerName: 'Chloe Moreau',
    trainerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    duration: '18:00',
    durationMinutes: 18,
    difficulty: 'Intermediate',
    calories: 230,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    isPremium: false,
    equipment: ['Mat'],
    description: '360-degree anti-rotation, plank variations, and V-ups to carve a rock-solid midsection in 18 minutes.',
    chapters: [
      { time: '00:00', title: 'Transverse Abdominis Bracing' },
      { time: '04:00', title: 'Hollow Rock & Deadbug Ladder' },
      { time: '12:00', title: 'Side Plank Hip Dips & Russian Twists' },
    ],
  },
  {
    id: 'vid-9',
    title: 'VO2 Max Assault & Erg Interval Lab',
    category: 'Cardio Burn',
    trainerId: 'tr-2',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=80',
    duration: '30:00',
    durationMinutes: 30,
    difficulty: 'Advanced',
    calories: 590,
    thumbnail: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=80',
    isPremium: true,
    equipment: ['RowErg / Bike / Treadmill'],
    description: 'Guided pyramid intervals you can perform on any cardio machine or outdoor track to push your anaerobic threshold.',
    chapters: [
      { time: '00:00', title: 'Progressive Ramp-Up Zone 2 to Zone 4' },
      { time: '07:00', title: 'Pyramid Intervals: 30s / 60s / 90s / 60s / 30s' },
      { time: '24:00', title: 'All-Out Sprint & Flush Recovery' },
    ],
  },
];

export const INITIAL_MEASUREMENTS: MeasurementEntry[] = [
  { id: 'm-1', date: '2026-08-13', weight: 192.0, bodyFat: 18.4, chest: 41.0, waist: 34.8, hips: 39.5, arms: 15.0, legs: 23.2 },
  { id: 'm-2', date: '2026-08-20', weight: 190.4, bodyFat: 17.9, chest: 41.2, waist: 34.3, hips: 39.3, arms: 15.1, legs: 23.4 },
  { id: 'm-3', date: '2026-08-27', weight: 188.8, bodyFat: 17.2, chest: 41.4, waist: 33.9, hips: 39.1, arms: 15.2, legs: 23.5 },
  { id: 'm-4', date: '2026-09-03', weight: 187.2, bodyFat: 16.5, chest: 41.5, waist: 33.4, hips: 38.9, arms: 15.4, legs: 23.7 },
  { id: 'm-5', date: '2026-09-10', weight: 185.6, bodyFat: 15.9, chest: 41.8, waist: 32.9, hips: 38.7, arms: 15.5, legs: 23.9 },
  { id: 'm-6', date: '2026-09-17', weight: 184.1, bodyFat: 15.3, chest: 42.0, waist: 32.5, hips: 38.5, arms: 15.6, legs: 24.1 },
  { id: 'm-7', date: '2026-09-24', weight: 182.8, bodyFat: 14.7, chest: 42.2, waist: 32.1, hips: 38.4, arms: 15.8, legs: 24.2 },
  { id: 'm-8', date: '2026-10-01', weight: 181.4, bodyFat: 14.2, chest: 42.5, waist: 31.6, hips: 38.2, arms: 16.0, legs: 24.5 },
];

export const INITIAL_PRS: PersonalRecord[] = [
  { id: 'pr-1', lift: 'Barbell Bench Press', weight: 245, unit: 'lbs', date: '2026-09-28', improvement: '+20 lbs this quarter' },
  { id: 'pr-2', lift: 'Back Squat (ATG)', weight: 335, unit: 'lbs', date: '2026-09-24', improvement: '+35 lbs this quarter' },
  { id: 'pr-3', lift: 'Conventional Deadlift', weight: 405, unit: 'lbs', date: '2026-09-19', improvement: '+45 lbs this quarter' },
  { id: 'pr-4', lift: 'Strict Overhead Press', weight: 155, unit: 'lbs', date: '2026-09-15', improvement: '+15 lbs this quarter' },
];

export const REWARDS_MARKETPLACE: RewardItem[] = [
  {
    id: 'rew-1',
    title: '10% Store Discount Voucher',
    pointsCost: 300,
    category: 'Store Perk',
    description: 'Instant 10% stackable discount code valid on all APEX supplements, apparel, and lifting gear.',
    badge: 'POPULAR',
    iconName: 'ShoppingBag',
  },
  {
    id: 'rew-2',
    title: 'Free Specialty Group Class Pass',
    pointsCost: 500,
    category: 'Class Access',
    description: 'Bring a guest or unlock a priority VIP spot in any sold-out signature class.',
    iconName: 'Calendar',
  },
  {
    id: 'rew-3',
    title: 'APEX Branded Gym Merch Pack',
    pointsCost: 800,
    category: 'Merchandise',
    description: 'Includes the Obsidian Pump Tee + Thermo-Lock Stainless Shaker bottle picked up at the front desk.',
    badge: 'LIMITED',
    iconName: 'Gift',
  },
  {
    id: 'rew-4',
    title: 'Free 1-on-1 Personal Training Session',
    pointsCost: 1500,
    category: 'Coaching',
    description: '60-minute private assessment, form breakdown, and custom program tune-up with any Master Trainer.',
    badge: 'HIGH VALUE',
    iconName: 'Award',
  },
  {
    id: 'rew-5',
    title: 'Free Month Pro Membership',
    pointsCost: 5000,
    category: 'Membership',
    description: '100% complimentary month of Pro Unlimited Membership ($59 value) credited to your billing cycle.',
    badge: 'ULTIMATE REWARD',
    iconName: 'Crown',
  },
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Sami Ben-Youssef', points: 4820, tier: 'Platinum', streak: 31, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { rank: 2, name: 'Sophia Martinez', points: 4390, tier: 'Platinum', streak: 27, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { rank: 3, name: 'Liam O’Connor', points: 3910, tier: 'Gold', streak: 24, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
  { rank: 4, name: 'Nadia Ben-Ali', points: 3540, tier: 'Gold', streak: 21, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80' },
  { rank: 5, name: 'Jason Wu', points: 2890, tier: 'Gold', streak: 19, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80' },
  { rank: 6, name: 'Claire Dubois', points: 2150, tier: 'Silver', streak: 16, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  { rank: 7, name: 'Alex Rivera (You)', points: 1450, tier: 'Silver', streak: 14, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', isCurrentUser: true },
  { rank: 8, name: 'Carlos Mendez', points: 1320, tier: 'Silver', streak: 12, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' },
  { rank: 9, name: 'Hannah Abbott', points: 1180, tier: 'Silver', streak: 10, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
  { rank: 10, name: 'Omar Farooq', points: 960, tier: 'Bronze', streak: 8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
];

export const INITIAL_POINTS_HISTORY: PointsHistoryItem[] = [
  { id: 'ph-1', action: 'QR Door Check-In — Morning Session', points: 10, date: 'Today, 07:12 AM', type: 'earned' },
  { id: 'ph-2', action: 'Booked Class: Inferno MetCon 45', points: 15, date: 'Yesterday, 06:30 PM', type: 'earned' },
  { id: 'ph-3', action: 'Completed Video: 30-Min Metabolic Afterburn', points: 20, date: 'Sep 29, 2026', type: 'earned' },
  { id: 'ph-4', action: 'Referred Friend: Karim T. Joined Pro Plan!', points: 200, date: 'Sep 26, 2026', type: 'earned' },
  { id: 'ph-5', action: 'Left 5-Star Trainer Review for Marcus Vance', points: 50, date: 'Sep 24, 2026', type: 'earned' },
  { id: 'ph-6', action: 'Store Order #APX-904 (ISO-Pure Whey)', points: 55, date: 'Sep 21, 2026', type: 'earned' },
  { id: 'ph-7', action: 'Redeemed: 10% Store Discount Voucher', points: -300, date: 'Sep 18, 2026', type: 'redeemed' },
];

export const INITIAL_ADMIN_MEMBERS: AdminMember[] = [
  { id: 'MEM-001', name: 'Alex Rivera', email: 'alex.rivera@apexfitness.io', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', plan: 'Pro', status: 'Active', joinDate: '2026-01-14', points: 1450, lastCheckIn: 'Today, 07:12 AM', monthlySpend: 114 },
  { id: 'MEM-002', name: 'Sami Ben-Youssef', email: 'sami.by@gmail.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', plan: 'Elite', status: 'Active', joinDate: '2025-09-02', points: 4820, lastCheckIn: 'Today, 06:45 AM', monthlySpend: 245 },
  { id: 'MEM-003', name: 'Sophia Martinez', email: 'sophia.m@outlook.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', plan: 'Elite', status: 'Active', joinDate: '2025-11-19', points: 4390, lastCheckIn: 'Yesterday', monthlySpend: 189 },
  { id: 'MEM-004', name: 'Liam O’Connor', email: 'liam.oconnor@tech.co', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', plan: 'Pro', status: 'Active', joinDate: '2026-03-08', points: 3910, lastCheckIn: 'Today, 08:30 AM', monthlySpend: 96 },
  { id: 'MEM-005', name: 'Nadia Ben-Ali', email: 'nadia.ba@studio.tn', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80', plan: 'Elite', status: 'Active', joinDate: '2026-02-11', points: 3540, lastCheckIn: '2 days ago', monthlySpend: 175 },
  { id: 'MEM-006', name: 'Arthur Pendelton', email: 'arthur.p@lawfirm.com', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', plan: 'Basic', status: 'Paused', joinDate: '2026-05-22', points: 620, lastCheckIn: '12 days ago', monthlySpend: 29 },
  { id: 'MEM-007', name: 'Claire Dubois', email: 'claire.dubois@paris.fr', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', plan: 'Pro', status: 'Active', joinDate: '2026-04-01', points: 2150, lastCheckIn: 'Today, 12:00 PM', monthlySpend: 84 },
  { id: 'MEM-008', name: 'Marcus Lin', email: 'mlin@venture.io', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', plan: 'Basic', status: 'Suspended', joinDate: '2026-06-15', points: 210, lastCheckIn: '3 weeks ago', monthlySpend: 29 },
];

export const HOURLY_CAPACITY_FORECAST = [
  { hour: '6 AM', pct: 48 },
  { hour: '7 AM', pct: 72 },
  { hour: '8 AM', pct: 64 },
  { hour: '9 AM', pct: 45 },
  { hour: '10 AM', pct: 32 },
  { hour: '11 AM', pct: 28 },
  { hour: '12 PM', pct: 52 },
  { hour: '1 PM', pct: 38 },
  { hour: '2 PM', pct: 22 },
  { hour: '3 PM', pct: 24 },
  { hour: '4 PM', pct: 46 },
  { hour: '5 PM', pct: 82 },
  { hour: '6 PM', pct: 91 },
  { hour: '7 PM', pct: 85 },
  { hour: '8 PM', pct: 62 },
  { hour: '9 PM', pct: 39 },
  { hour: '10 PM', pct: 21 },
];

export const WEEKLY_HEATMAP_DATA = [
  { day: 'Mon', hours: [50, 78, 42, 30, 55, 25, 48, 88, 92, 65, 35] },
  { day: 'Tue', hours: [45, 72, 38, 28, 48, 24, 42, 84, 89, 60, 32] },
  { day: 'Wed', hours: [35, 58, 26, 18, 40, 20, 38, 76, 82, 54, 28] },
  { day: 'Thu', hours: [48, 72, 45, 32, 52, 22, 46, 82, 91, 62, 39] },
  { day: 'Fri', hours: [44, 68, 40, 30, 50, 28, 52, 74, 68, 45, 25] },
  { day: 'Sat', hours: [30, 55, 75, 84, 78, 62, 48, 40, 32, 24, 18] },
  { day: 'Sun', hours: [20, 38, 58, 66, 60, 48, 36, 28, 22, 18, 12] },
];

export const HEATMAP_HOUR_LABELS = ['6a', '8a', '10a', '12p', '1p', '2p', '4p', '5p', '6p', '8p', '10p'];
