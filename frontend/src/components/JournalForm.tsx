import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';

interface JournalFormValues {
  text: string;
}

export default React.memo(function JournalForm({ onSaved }: { onSaved?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<JournalFormValues>();

  const onSubmit = useCallback(
    async (data: JournalFormValues) => {
      try {
        await API.post('/journal', { text: data.text });
        onSaved?.();
        alert('Journal saved and analyzed successfully');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Save failed. Please try again.');
      }
    },
    [onSaved]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4" aria-label="Journal entry form">
      <h3 className="text-lg font-semibold">Emotional Reflection Journal</h3>
      <label className="block">
        <span className="text-sm font-medium">Daily reflection</span>
        <textarea
          id="journal-text"
          className="mt-1 w-full p-2 border rounded"
          rows={6}
          placeholder="Write about your day, triggers, and exam anxiety..."
          {...register('text', { required: true, minLength: 10 })}
        />
      </label>
      {errors.text && <span className="text-sm text-red-600">Please write at least 10 characters.</span>}
      <button type="submit" className="inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-rose-500">
        Save & Analyze
      </button>
    </form>
  );
});
