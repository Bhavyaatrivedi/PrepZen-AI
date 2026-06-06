import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';

export default function JournalForm({ onSaved }: { onSaved?: () => void }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const res = await API.post('/journal', { text: data.text });
      onSaved?.();
      alert('Journal saved and analyzed');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-2">
      <h3 className="font-semibold">Journal</h3>
      <textarea className="w-full p-2 border rounded" rows={6} placeholder="Write about your day..." {...register('text')} />
      <button className="px-4 py-2 bg-rose-600 text-white rounded">Save & Analyze</button>
    </form>
  );
}
