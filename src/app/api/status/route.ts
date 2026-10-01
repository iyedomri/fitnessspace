import { NextResponse } from 'next/server';
import { INITIAL_CLASSES, HOURLY_CAPACITY_FORECAST } from '@/data/gymData';

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    gym: 'APEX FITNESS PERFORMANCE CLUB',
    liveCapacity: {
      currentOccupancy: 64,
      maxCapacity: 150,
      percentage: 43,
      state: 'MODERATE',
      bestTimeToday: '2:00 PM - 4:00 PM',
      hourlyForecast: HOURLY_CAPACITY_FORECAST,
    },
    classesCount: INITIAL_CLASSES.length,
    timestamp: new Date().toISOString(),
  });
}
