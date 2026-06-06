import React, { useEffect, useState } from 'react';
import MoodForm from '../components/MoodForm';
import JournalForm from '../components/JournalForm';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const auth = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  const loadAnalytics = async () => {
    try {
      const res = await API.get('/analytics');
      setAnalytics(res.data);
    } catch (err) {
      // ignore
    }
  };

  const loadMoodHistory = async () => {
    try {
      const res = await API.get('/mood/history');
      setMoodHistory(res.data.slice(0, 20).reverse().map((e: any, i: number) => ({ name: i + 1, moodScore: (e.confidenceLevel || 5) })));
    } catch (err) {}
  };

  useEffect(() => {
    loadAnalytics();
    loadMoodHistory();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="font-semibold">Wellness Overview</h2>
            {analytics ? (
              <div className="mt-2">
                <div>Wellness Score: {analytics.wellnessScore}</div>
                <div>Burnout Risk: {analytics.burnoutRisk}</div>
                <div>Avg Sleep: {analytics.averages.avgSleep.toFixed(1)}</div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="font-semibold mb-2">Mood Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodHistory}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="moodScore" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <MoodForm onSaved={() => { loadAnalytics(); loadMoodHistory(); }} />
          <div className="mt-4">
            <JournalForm onSaved={() => loadAnalytics()} />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="font-semibold">Detected Triggers</h3>
        {analytics?.detectedTriggers?.length ? (
          <ul>
            {analytics.detectedTriggers.map((t: any) => (
              <li key={t.trigger}>{t.trigger} — {t.count}</li>
            ))}
          </ul>
        ) : (
          <div>No triggers detected yet.</div>
        )}
      </div>
    </div>
  );
}
