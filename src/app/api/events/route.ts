import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import type { IEvent } from '@/types/models';

type EventInput = Omit<IEvent, keyof Document | 'createdAt' | 'updatedAt'>;

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json({ message: 'Events fetched successfully.', events }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Event fetching failed.',
        error: error instanceof Error ? error.message : 'Unknown',
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event: EventInput;

    try {
      event = Object.fromEntries(formData.entries()) as unknown as EventInput;
    } catch (_) {
      return NextResponse.json({ message: 'Invalid JSON data format.' }, { status: 400 });
    }

    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ message: 'Image file is required.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadFileToCloudinary({
      buffer,
      resourceType: 'image',
      uploadPreset: 'dev-events',
    });

    event.image = uploadResult.secure_url;

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: 'Event created successfully.', event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: error instanceof Error ? error.message : 'Unknown',
      },
      { status: 500 },
    );
  }
}
