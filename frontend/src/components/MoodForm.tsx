import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';

export default function MoodForm({ onSaved }: { onSaved?: () => void }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await API.post('/mood', data);
      onSaved?.();
      alert('Mood saved');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2">
      <h3 className="font-semibold">Daily Mood</h3>
      <select className="w-full p-2 border rounded" {...register('mood')}>
        <option>😀 Happy</option>
        <option>🙂 Calm</option>
        <option>😐 Neutral</option>
        <option>😟 Anxious</option>
        <option>😢 Sad</option>
        <option>😫 Burned Out</option>
      </select>
      <input type="number" step="0.1" className="w-full p-2 border rounded" placeholder="Sleep hours" {...register('sleepHours')} />
      <input type="number" step="0.1" className="w-full p-2 border rounded" placeholder="Study hours" {...register('studyHours')} />
      <input type="number" min={0} max={10} className="w-full p-2 border rounded" placeholder="Stress level (1-10)" {...register('stressLevel')} />
      <input type="number" min={0} max={10} className="w-full p-2 border rounded" placeholder="Confidence level (1-10)" {...register('confidenceLevel')} />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
    </form>
  );
}
