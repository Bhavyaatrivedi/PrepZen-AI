import { Schema, model, Document } from 'mongoose';

export interface IAIAnalysis extends Document {
  user: Schema.Types.ObjectId;
  journal: Schema.Types.ObjectId;
  emotion: string;
  sentiment: string;
  confidence_level: number;
  stress_triggers: string[];
  burnout_risk: string;
  recommendations: string[];
}

const AIAnalysisSchema = new Schema<IAIAnalysis>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  journal: { type: Schema.Types.ObjectId, ref: 'JournalEntry' },
  emotion: String,
  sentiment: String,
  confidence_level: Number,
  stress_triggers: [String],
  burnout_risk: String,
  recommendations: [String]
}, { timestamps: true });

export default model<IAIAnalysis>('AIAnalysis', AIAnalysisSchema);
