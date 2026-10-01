import type { Metadata } from 'next';
import './globals.css';
import { GymProvider } from '@/context/GymContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalWidgets from '@/components/GlobalWidgets';

export const metadata: Metadata = {
  title: 'APEX FITNESS | Transform Your Body. Elevate Your Life.',
  description:
    'Join APEX FITNESS — The Smarter Way to Train. 50+ weekly HIIT, Strength & Yoga classes, 15 championship personal trainers, real-time gym capacity, on-demand workout library, and pro supplement store.',
  keywords: ['gym', 'fitness', 'HIIT', 'strength training', 'personal trainers', 'workout classes', 'APEX FITNESS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-[#FFFFFF] min-h-screen flex flex-col selection:bg-[#FF6B00] selection:text-white">
        <GymProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalWidgets />
        </GymProvider>
      </body>
    </html>
  );
}
