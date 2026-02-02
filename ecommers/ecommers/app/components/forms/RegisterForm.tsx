'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | 'very-strong' => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  if (strength <= 1) return 'weak';
  if (strength <= 2) return 'medium';
  if (strength <= 3) return 'strong';
  return 'very-strong';
};

export const RegisterForm = React.forwardRef<HTMLFormElement, RegisterFormProps>(
  ({ onSubmit, isLoading = false, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState<string | null>(error || null);
    const [formData, setFormData] = useState<RegisterFormData>({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthColor =
      passwordStrength === 'weak'
        ? 'error'
        : passwordStrength === 'medium'
          ? 'warning'
          : passwordStrength === 'strong'
            ? 'info'
            : 'success';

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.fullName) newErrors.fullName = 'Name is required';
      else if (formData.fullName.length < 2) newErrors.fullName = 'Name must be at least 2 characters';

      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);
      if (!validateForm()) return;
      try {
        await onSubmit(formData);
      } catch (err) {
        setFormError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };

    return (
      <form ref={ref} onSubmit={handleFormSubmit} className="space-y-4">
        {formError && (
          <Alert
            type="error"
            message={formError}
            dismissible
            onClose={() => setFormError(null)}
          />
        )}

        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={handleChange}
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

        {formData.password && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    passwordStrength === 'weak'
                      ? 'w-1/4 bg-error'
                      : passwordStrength === 'medium'
                        ? 'w-2/4 bg-warning'
                        : passwordStrength === 'strong'
                          ? 'w-3/4 bg-info'
                          : 'w-full bg-success'
                  }`}
                />
              </div>
              <Badge variant={strengthColor === 'error' ? 'error' : 'success'} size="sm">
                {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
              </Badge>
            </div>
            <p className="text-xs text-text-tertiary">
              Password should contain uppercase, lowercase, numbers, and special characters
            </p>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-text-secondary hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 rounded mt-1 flex-shrink-0"
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:text-primary-dark">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:text-primary-dark">
              Privacy Policy
            </a>
          </span>
        </label>

        {errors.agreeToTerms && (
          <p className="text-sm text-error">{errors.agreeToTerms}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:text-primary-dark font-medium">
            Sign in here
          </a>
        </p>
      </form>
    );
  }
);

RegisterForm.displayName = 'RegisterForm';
