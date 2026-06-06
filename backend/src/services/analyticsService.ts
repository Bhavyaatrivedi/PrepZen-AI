import MoodEntry from '../models/MoodEntry';
import JournalEntry from '../models/JournalEntry';

function riskFromScore(score: number) {
  if (score >= 70) return 'LOW';
  if (score >= 40) return 'MEDIUM';
  return 'HIGH';
}

export async function computeAnalyticsForUser(userId: any) {
  // Fetch recent 30 days of mood entries
  const entries = await MoodEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(90).lean();
  const journals = await JournalEntry.find({ user: userId }).sort({ createdAt: -1 }).limit(365).lean();

  // Compute simple trends
  const n = entries.length || 1;
  const avgSleep = entries.reduce((s, e) => s + (e.sleepHours || 0), 0) / n;
  const avgStudy = entries.reduce((s, e) => s + (e.studyHours || 0), 0) / n;
  const avgStress = entries.reduce((s, e) => s + (e.stressLevel || 0), 0) / n;

  // mood scores mapping
  const moodMap: Record<string, number> = { '😀 Happy': 5, '🙂 Calm': 4, '😐 Neutral': 3, '😟 Anxious': 2, '😢 Sad': 1, '😫 Burned Out': 0 };
  const avgMood = entries.reduce((s, e) => s + (moodMap[e.mood] || 3), 0) / n;

  // burnout score: higher is better
  const consistencyBonus = Math.max(0, Math.min(10, entries.length / 9));
  const sleepScore = Math.max(0, Math.min(20, (avgSleep / 8) * 20));
  const studyScore = Math.max(0, Math.min(20, (Math.min(avgStudy, 12) / 12) * 20));
  const stressScore = Math.max(0, Math.min(20, ((10 - avgStress) / 10) * 20));
  const moodScore = Math.max(0, Math.min(30, (avgMood / 5) * 30));

  const wellnessScore = Math.round(sleepScore + studyScore + stressScore + moodScore + consistencyBonus);

  const burnoutRisk = riskFromScore(wellnessScore);

  // Trigger detection: simple keyword scan across journal entries
  const triggerCounts: Record<string, number> = {};
  const triggers = ['mock test', 'sleep', 'family', 'results', 'time management', 'scores', 'friends', 'parents'];
  journals.forEach((j: any) => {
    const t = (j.text || '').toLowerCase();
    triggers.forEach(tr => {
      if (t.includes(tr)) triggerCounts[tr] = (triggerCounts[tr] || 0) + 1;
    });
  });

  const detectedTriggers = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t, c]) => ({ trigger: t, count: c }));

  return {
    wellnessScore,
    burnoutRisk,
    averages: { avgSleep, avgStudy, avgStress, avgMood },
    detectedTriggers,
    entriesCount: entries.length,
    journalCount: journals.length
  };
}
