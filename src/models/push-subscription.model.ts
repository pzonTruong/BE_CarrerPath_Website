import mongoose, { Schema } from 'mongoose';

export interface PushSubscriptionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  createdAt?: Date;
}

const pushSubscriptionSchema = new Schema<PushSubscriptionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const PushSubscriptionModel = mongoose.model<PushSubscriptionDocument>(
  'PushSubscription',
  pushSubscriptionSchema
);
