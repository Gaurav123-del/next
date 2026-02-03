'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/auth-layout';

type UserRole = 'retailer' | 'wholesaler';

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business_name: '',
    location: '',
    email: '',
    password: '',
    role: 'retailer' as UserRole,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Frontend only (no backend)
    console.log('Signup data:', formData);

    // Simulate success
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <AuthLayout
      heroContent={
        <>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Grow your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Business
            </span>{' '}
            today.
          </h1>

          <p className="text-zinc-400 text-lg mb-8">
            Join Tradigoo to connect with verified wholesalers and retailers.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs text-white"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-300">
                <span className="text-white font-semibold">2,000+</span> users joined this week
              </p>
            </div>
          </div>
        </>
      }
    >
      {/* Header */}
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 inline-block mb-6">
        ← Back to home
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-zinc-900">Create an account</h2>
        <p className="text-zinc-500">Choose your role to get started.</p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          {(['retailer', 'wholesaler'] as UserRole[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({ ...formData, role })}
              className={`p-4 rounded-xl border text-left transition ${
                formData.role === role
                  ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                  : 'border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <div className="font-semibold capitalize">{role}</div>
              <div className="text-xs text-zinc-500">
                {role === 'retailer'
                  ? 'I want to buy products'
                  : 'I want to sell products'}
              </div>
            </button>
          ))}
        </div>

        {/* Inputs */}
        {[
          ['name', 'Full Name'],
          ['phone', 'Phone'],
          ['business_name', 'Business Name'],
          ['location', 'Location'],
          ['email', 'Email'],
          ['password', 'Password'],
        ].map(([key, label]) => (
          <div key={key} className="space-y-1">
            <Label>{label}</Label>
            <Input
              type={key === 'password' ? 'password' : 'text'}
              value={(formData as any)[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              required
            />
          </div>
        ))}

        <Button type="submit" className="w-full h-11" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </motion.form>

      <p className="text-center text-sm text-zinc-600 mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 font-medium">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
