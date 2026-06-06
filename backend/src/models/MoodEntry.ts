import { Schema, model, Document } from 'mongoose';

export interface IMoodEntry extends Document {
  user: Schema.Types.ObjectId;
  mood: string;
  sleepHours: number;
  studyHours: number;
  stressLevel: number;
  confidenceLevel: number;
}

const MoodSchema = new Schema<IMoodEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  mood: { type: String, required: true },
  sleepHours: { type: Number, default: 0 },
  studyHours: { type: Number, default: 0 },
  stressLevel: { type: Number, default: 0 },
  confidenceLevel: { type: Number, default: 0 }
}, { timestamps: true });

export default model<IMoodEntry>('MoodEntry', MoodSchema);
