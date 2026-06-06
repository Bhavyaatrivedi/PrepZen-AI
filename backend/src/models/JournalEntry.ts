import { Schema, model, Document } from 'mongoose';

export interface IJournalEntry extends Document {
  user: Schema.Types.ObjectId;
  text: string;
  analysis?: Schema.Types.ObjectId;
}

const JournalSchema = new Schema<IJournalEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  text: { type: String, required: true },
  analysis: { type: Schema.Types.ObjectId, ref: 'AIAnalysis' }
}, { timestamps: true });

export default model<IJournalEntry>('JournalEntry', JournalSchema);
