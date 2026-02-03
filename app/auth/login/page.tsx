'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Frontend-only (no backend)
    console.log('Login data:', { email, password });

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8"
        >
          ← Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
            <span className="text-white font-bold text-xl">T</span>
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-500">
            Enter your details to access your account.
          </p>
        </motion.div>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>

              {/* ✅ Forgot Password Link */}
              <Link
                href="/auth/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-zinc-900 hover:bg-zinc-800"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Don’t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
