import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';

interface MoodFormValues {
  mood: string;
  sleepHours: number;
  studyHours: number;
  stressLevel: number;
  confidenceLevel: number;
}

export default React.memo(function MoodForm({ onSaved }: { onSaved?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MoodFormValues>({ defaultValues: { mood: '😀 Happy', sleepHours: 0, studyHours: 0, stressLevel: 5, confidenceLevel: 5 } });

  const onSubmit = useCallback(
    async (data: MoodFormValues) => {
      try {
        await API.post('/mood', data);
        onSaved?.();
        alert('Mood saved successfully');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Save failed. Please try again.');
      }
    },
    [onSaved]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4" aria-label="Daily mood entry form">
      <h3 className="text-lg font-semibold">Daily Mood Tracker</h3>

      <label className="block">
        <span className="text-sm font-medium">Mood</span>
        <select id="mood" className="mt-1 w-full p-2 border rounded" {...register('mood', { required: true })}>
          <option>😀 Happy</option>
          <option>🙂 Calm</option>
          <option>😐 Neutral</option>
          <option>😟 Anxious</option>
          <option>😢 Sad</option>
          <option>😫 Burned Out</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Sleep hours</span>
        <input id="sleepHours" type="number" step="0.1" className="mt-1 w-full p-2 border rounded" {...register('sleepHours', { valueAsNumber: true, min: 0, max: 24 })} />
        {errors.sleepHours && <span className="text-sm text-red-600">Sleep must be between 0 and 24 hours.</span>}
      </label>

      <label className="block">
        <span className="text-sm font-medium">Study hours</span>
        <input id="studyHours" type="number" step="0.1" className="mt-1 w-full p-2 border rounded" {...register('studyHours', { valueAsNumber: true, min: 0, max: 24 })} />
        {errors.studyHours && <span className="text-sm text-red-600">Study hours must be between 0 and 24.</span>}
      </label>

      <label className="block">
        <span className="text-sm font-medium">Stress level</span>
        <input id="stressLevel" type="number" min={1} max={10} className="mt-1 w-full p-2 border rounded" {...register('stressLevel', { valueAsNumber: true, min: 1, max: 10 })} />
        {errors.stressLevel && <span className="text-sm text-red-600">Stress level must be between 1 and 10.</span>}
      </label>

      <label className="block">
        <span className="text-sm font-medium">Confidence level</span>
        <input id="confidenceLevel" type="number" min={1} max={10} className="mt-1 w-full p-2 border rounded" {...register('confidenceLevel', { valueAsNumber: true, min: 1, max: 10 })} />
        {errors.confidenceLevel && <span className="text-sm text-red-600">Confidence level must be between 1 and 10.</span>}
      </label>

      <button type="submit" className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Save Mood
      </button>
    </form>
  );
});
