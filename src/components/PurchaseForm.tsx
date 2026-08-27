'use client';

import { useActionState } from 'react';
import { submitPurchase } from '@/app/api/purchase';

const initialState = {
  success: false,
  message: '',
  errors: {} as Record<string, string[]>,
};

export default function PurchaseForm() {
  const [state, formAction, isPending] = useActionState(submitPurchase, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GitHub username</label>
        <input
          type="text"
          name="githubUser"
          required
          placeholder="e.g. myusername"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        {state?.errors?.githubUser && (
          <p className="text-red-500 text-xs mt-1">{state.errors.githubUser[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none disabled:opacity-50 transition-opacity"
      >
        {isPending ? 'Sending...' : 'Request GitHub access'}
      </button>

      {state?.message && (
        <div
          className={`p-3 rounded text-sm font-medium text-center ${
            state.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}
