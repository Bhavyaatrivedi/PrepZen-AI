import { Types } from 'mongoose';
import MoodEntry from '../models/MoodEntry';
import JournalEntry from '../models/JournalEntry';
import AIAnalysis from '../models/AIAnalysis';

function riskFromScore(score: number) {
  if (score >= 70) return 'LOW';
  if (score >= 40) return 'MEDIUM';
  return 'HIGH';
}

export async function computeAnalyticsForUser(userId: string | Types.ObjectId) {
  const userObjectId = new Types.ObjectId(userId);
  const [entries, journals, analyses] = await Promise.all([
    MoodEntry.find({ user: userObjectId }).sort({ createdAt: -1 }).limit(90).lean(),
    JournalEntry.find({ user: userObjectId }).sort({ createdAt: -1 }).limit(365).populate('analysis').lean(),
    AIAnalysis.find({ user: userObjectId }).limit(365).lean()
  ]);

  const count = Math.max(entries.length, 1);
  const avgSleep = entries.reduce((total, entry) => total + (entry.sleepHours || 0), 0) / count;
  const avgStudy = entries.reduce((total, entry) => total + (entry.studyHours || 0), 0) / count;
  const avgStress = entries.reduce((total, entry) => total + (entry.stressLevel || 0), 0) / count;

  const moodMap: Record<string, number> = {
    '😀 Happy': 5,
    '🙂 Calm': 4,
    '😐 Neutral': 3,
    '😟 Anxious': 2,
    '😢 Sad': 1,
    '😫 Burned Out': 0
  };
  const avgMood = entries.reduce((total, entry) => total + (moodMap[entry.mood] ?? 3), 0) / count;

  const consistencyBonus = Math.max(0, Math.min(10, entries.length / 9));
  const sleepScore = Math.max(0, Math.min(20, (avgSleep / 8) * 20));
  const studyScore = Math.max(0, Math.min(20, (Math.min(avgStudy, 12) / 12) * 20));
  const stressScore = Math.max(0, Math.min(20, ((10 - avgStress) / 10) * 20));
  const moodScore = Math.max(0, Math.min(30, (avgMood / 5) * 30));
  const wellnessScore = Math.round(sleepScore + studyScore + stressScore + moodScore + consistencyBonus);

  const keywordTriggers = ['mock test', 'sleep', 'family', 'results', 'time management', 'scores', 'friends', 'parents'];
  const triggerCounts: Record<string, number> = {};

  journals.forEach((journal: any) => {
    const normalizedText = (journal.text || '').toLowerCase();
    keywordTriggers.forEach(trigger => {
      if (normalizedText.includes(trigger)) {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
      }
    });
  });

  analyses.forEach(analysis => {
    (analysis.stress_triggers || []).forEach((trigger: string) => {
      const normalized = trigger.toLowerCase();
      triggerCounts[normalized] = (triggerCounts[normalized] || 0) + 1;
    });
  });

  const detectedTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([trigger, count]) => ({ trigger, count }));

  return {
    wellnessScore,
    burnoutRisk: riskFromScore(wellnessScore),
    averages: {
      avgSleep: Number(avgSleep.toFixed(1)),
      avgStudy: Number(avgStudy.toFixed(1)),
      avgStress: Number(avgStress.toFixed(1)),
      avgMood: Number(avgMood.toFixed(1))
    },
    detectedTriggers,
    entriesCount: entries.length,
    journalCount: journals.length,
    analyzedJournals: analyses.length
  };
}
