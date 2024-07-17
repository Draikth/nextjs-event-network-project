import { NextResponse } from 'next/server';

type RootResponseBodyGet = {
  events: string;
};

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ events: '/api/events' });
}
