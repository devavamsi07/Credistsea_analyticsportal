import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  userId: string;
  sessionId: string;
  page: string;
  eventType: string;
  eventData: any;
  timestamp: Date;
  synced: boolean;
}

const EventSchema: Schema = new Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  page: { type: String, required: true },
  eventType: { type: String, required: true },
  eventData: { type: Schema.Types.Mixed, required: false },
  timestamp: { type: Date, default: Date.now },
  synced: { type: Boolean, default: false },
});

export default mongoose.model<IEvent>('Event', EventSchema); 