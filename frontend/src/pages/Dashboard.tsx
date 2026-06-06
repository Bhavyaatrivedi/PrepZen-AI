import React, { useMemo, useCallback } from 'react';
import MoodForm from '../components/MoodForm';
import JournalForm from '../components/JournalForm';
import { useAnalytics } from '../hooks/useAnalytics';
import { useMoodHistory } from '../hooks/useMoodHistory';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const auth = useAuth();
  const analyticsQuery = useAnalytics();
  const moodHistoryQuery = useMoodHistory();

  const moodTrend = useMemo(
    () => moodHistoryQuery.data?.slice(0, 20).reverse().map((entry: any, index: number) => ({ name: `Day ${index + 1}`, moodScore: entry.confidenceLevel ?? 5 })) || [],
    [moodHistoryQuery.data]
  );

  const wellnessSummary = useMemo(() => {
    if (!analyticsQuery.data) return null;
    return {
      score: analyticsQuery.data.wellnessScore,
      risk: analyticsQuery.data.burnoutRisk,
      sleep: analyticsQuery.data.averages.avgSleep,
      study: analyticsQuery.data.averages.avgStudy,
      stress: analyticsQuery.data.averages.avgStress,
      mood: analyticsQuery.data.averages.avgMood
    };
  }, [analyticsQuery.data]);

  const refreshDashboard = useCallback(() => {
    analyticsQuery.refetch();
    moodHistoryQuery.refetch();
  }, [analyticsQuery, moodHistoryQuery]);

  return (
    <main id="main-content" className="space-y-6 p-4">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {auth.user?.name ?? auth.user?.email}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track your wellbeing, study stress, and exam readiness in one place.</p>
        </div>
        <button type="button" onClick={refreshDashboard} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Refresh insights
        </button>
      </header>

      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <article className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Wellness Overview</h2>
          {analyticsQuery.isLoading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading your wellness insights...</p>
          ) : analyticsQuery.isError ? (
            <p className="text-red-600">Unable to load analytics. Try again later.</p>
          ) : wellnessSummary ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-sm text-gray-500">Wellness score</p>
                <p className="mt-2 text-3xl font-bold">{wellnessSummary.score}</p>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-sm text-gray-500">Burnout risk</p>
                <p className="mt-2 text-3xl font-bold">{wellnessSummary.risk}</p>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-sm text-gray-500">Average sleep</p>
                <p className="mt-2 text-2xl font-semibold">{wellnessSummary.sleep}h</p>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p className="text-sm text-gray-500">Average stress</p>
                <p className="mt-2 text-2xl font-semibold">{wellnessSummary.stress}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">You can begin tracking your first mood entry now.</p>
          )}
        </article>

        <article className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Daily Actions</h2>
          <p className="text-gray-600 dark:text-gray-300">Use mood tracking and journaling to spot study stress and plan recovery strategies.</p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-gray-500">Tracked days</p>
              <p className="mt-2 font-semibold">{moodHistoryQuery.data?.length ?? 0}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-gray-500">Journal entries</p>
              <p className="mt-2 font-semibold">{analyticsQuery.data?.journalCount ?? 0}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Mood Trend</h2>
          </div>
          {moodHistoryQuery.isLoading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading mood history...</p>
          ) : moodTrend.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Record your first mood entry to see a trend graph.</p>
          ) : (
            <div role="img" aria-label="Mood trend over time" className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodTrend} aria-label="Mood trend chart">
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="moodScore" stroke="#6366f1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </article>

        <aside className="space-y-4">
          <MoodForm onSaved={refreshDashboard} />
          <JournalForm onSaved={refreshDashboard} />
        </aside>
      </section>

      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Exam Readiness Insights</h2>
        {analyticsQuery.isLoading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading triggers...</p>
        ) : analyticsQuery.isError ? (
          <p className="text-red-600">Unable to load triggers at the moment.</p>
        ) : analyticsQuery.data?.detectedTriggers?.length ? (
          <ul className="space-y-2">
            {analyticsQuery.data.detectedTriggers.map((trigger: any) => (
              <li key={trigger.trigger} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{trigger.trigger}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mentioned {trigger.count} times in reflections and stress analysis.</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No recurring triggers found yet. Keep journaling to reveal patterns.</p>
        )}
      </section>
    </main>
  );
}
