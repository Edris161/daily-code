'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (!email) {
        setError('Email is required');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Invalid email address');
        return;
      }

      // TODO: Call API endpoint
      // const response = await api.post('/auth/forgot-password', {
      //   email: email,
      // });

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link href="/auth/login" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6">
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="text-text-secondary text-sm mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          {success ? (
            <div className="space-y-6">
              <Alert
                type="success"
                title="Email Sent!"
                message={`We've sent a password reset link to ${email}. Please check your email and follow the instructions.`}
              />
              <p className="text-sm text-text-secondary text-center">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert
                  type="error"
                  message={error}
                  dismissible
                  onClose={() => setError('')}
                />
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Send Reset Link
              </Button>

              <p className="text-center text-sm text-text-secondary">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
