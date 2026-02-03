'use client';

import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordContent() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Frontend-only simulation
    console.log('Reset link requested for:', email);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      heroContent={
        <>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Secure your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Account
            </span>{' '}
            access.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Resetting your password helps keep your Tradigoo account safe and
            secure.
          </p>
        </>
      }
    >
      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8"
        >
          ← Back to login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
            <span className="text-white font-bold text-xl">?</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-zinc-500">
            Enter your email and we’ll send you a reset link.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Check your email
            </h3>
            <p className="text-green-700 text-sm mb-6">
              If an account exists for <strong>{email}</strong>, a reset link has
              been sent.
            </p>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800"
              disabled={loading}
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </motion.div>
    </AuthLayout>
  );
}
