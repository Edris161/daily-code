'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  ({ onSubmit, isLoading = false, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(error || null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);
      if (!validateForm()) return;
      try {
        await onSubmit({ email, password, rememberMe });
      } catch (err) {
        setFormError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      }
    };

    return (
      <form ref={ref} onSubmit={handleFormSubmit} className="space-y-6">
        {formError && (
          <Alert
            type="error"
            message={formError}
            dismissible
            onClose={() => setFormError(null)}
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-text-secondary hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <a href="/register" className="text-primary hover:text-primary-dark font-medium">
            Create one
          </a>
        </p>
      </form>
    );
  }
);

LoginForm.displayName = 'LoginForm';
