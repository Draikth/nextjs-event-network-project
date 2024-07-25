// import { NextRequest, NextResponse } from 'next/server';
// import { deleteEvent } from '../../../../database/events';

// type DeleteEventResponseBody =
//   | { message: string; event?: any }
//   | { message: string; error?: string };

// export async function DELETE(
//   request: NextRequest,
// ): Promise<NextResponse<DeleteEventResponseBody>> {
//   const { searchParams } = new URL(request.url);
//   const eventId = searchParams.get('eventId');
//   const { sessionToken } = await request.json();

//   if (!sessionToken || !eventId) {
//     return NextResponse.json(
//       {
//         message: 'Invalid request',
//         error: 'Session token or eventId is missing',
//       },
//       { status: 400 },
//     );
//   }

//   try {
//     const event = await deleteEvent(sessionToken, parseInt(eventId, 10));
//     if (event) {
//       return NextResponse.json(
//         { message: 'Event deleted successfully', event },
//         { status: 200 },
//       );
//     } else {
//       return NextResponse.json(
//         { message: 'Event not found or session expired' },
//         { status: 404 },
//       );
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Internal server error', error: (error as Error).message },
//       { status: 500 },
//     );
//   }
// }
