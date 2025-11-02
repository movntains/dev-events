import { model, models, Schema } from 'mongoose';
import type { IBooking } from '@/types/models';
import Event from './Event';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => EMAIL_REGEX.test(email),
        message: 'Please provide a valid email address.',
      },
    },
  },
  {
    timestamps: true,
  },
);

BookingSchema.pre('save', async function (next) {
  const booking = this as IBooking;

  if (booking.isModified('eventId') || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select('_id');

      if (!eventExists) {
        const error = new Error(`Event with ID ${booking.eventId} does not exist`);

        error.name = 'ValidationError';

        return next(error);
      }
    } catch {
      const validationError = new Error('Invalid event ID format or database error');

      validationError.name = 'ValidationError';

      return next(validationError);
    }
  }

  next();
});

BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email' });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
