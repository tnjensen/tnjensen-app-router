'use client';

import { useActionState, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { submitContactForm } from '@/app/actions/contact';

const initialState = {
  success: false,
  message: '',
  errors: {} as Record<string, string[]>,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  const handleFormSubmit = async (formData: FormData) => {
    formAction(formData);
    // Automatically reset Turnstile state after processing
    turnstileRef.current?.reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2> */}

      <form action={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
          {state?.errors?.message && (
            <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>
          )}
        </div>

        {/* Cloudflare Turnstile Integration */}
        <div className="py-2 flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition-opacity"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>

        {/* Global Success / Error Messages */}
        {state?.message && (
          <div
            className={`p-3 rounded text-sm font-medium text-center ${state.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
