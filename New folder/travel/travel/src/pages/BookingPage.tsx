import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users, Send, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { destinations } from '@/data/destinations';
import { tours } from '@/data/tours';
import { cn } from '@/lib/utils';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  destination: z.string().min(1, 'Please select a destination'),
  travelDate: z.string().min(1, 'Please select a travel date'),
  travelers: z.string().min(1, 'Please select number of travelers'),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedDestination = searchParams.get('destination') || '';
  const preselectedTour = searchParams.get('tour') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      destination: preselectedDestination || preselectedTour,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Booking request:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20 bg-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-forest" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Request Received!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your booking request. Our travel experts will contact you
              within 24 hours to finalize your dream trip.
            </p>
            <Button asChild variant="coral">
              <a href="/">Return Home</a>
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page Header */}
      <section
        className="pt-28 pb-12 md:pt-36 md:pb-16 bg-secondary"
        aria-labelledby="page-heading"
      >
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              id="page-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
            >
              Book Your Adventure
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our travel experts will craft the perfect
              itinerary for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className={cn(errors.firstName && 'border-destructive')}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className={cn(errors.lastName && 'border-destructive')}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={cn(errors.email && 'border-destructive')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className={cn(errors.phone && 'border-destructive')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Destination */}
              <div>
                <Label htmlFor="destination">
                  Destination <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watch('destination')}
                  onValueChange={(value) => setValue('destination', value)}
                >
                  <SelectTrigger
                    id="destination"
                    className={cn(errors.destination && 'border-destructive')}
                    aria-invalid={errors.destination ? 'true' : 'false'}
                  >
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id}>
                        {dest.name} - {dest.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              {/* Travel Date */}
              <div>
                <Label htmlFor="travelDate">
                  Preferred Travel Date <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="travelDate"
                    type="date"
                    {...register('travelDate')}
                    className={cn('pl-10', errors.travelDate && 'border-destructive')}
                    aria-invalid={errors.travelDate ? 'true' : 'false'}
                  />
                </div>
                {errors.travelDate && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {errors.travelDate.message}
                  </p>
                )}
              </div>

              {/* Number of Travelers */}
              <div className="md:col-span-2">
                <Label htmlFor="travelers">
                  Number of Travelers <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watch('travelers')}
                  onValueChange={(value) => setValue('travelers', value)}
                >
                  <SelectTrigger
                    id="travelers"
                    className={cn(errors.travelers && 'border-destructive')}
                    aria-invalid={errors.travelers ? 'true' : 'false'}
                  >
                    <SelectValue placeholder="Select number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Traveler</SelectItem>
                    <SelectItem value="2">2 Travelers</SelectItem>
                    <SelectItem value="3-4">3-4 Travelers</SelectItem>
                    <SelectItem value="5-6">5-6 Travelers</SelectItem>
                    <SelectItem value="7+">7+ Travelers (Group)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.travelers && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {errors.travelers.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <Label htmlFor="message">
                  Special Requests or Questions (Optional)
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your travel preferences, dietary requirements, or any questions..."
                  className={cn(errors.message && 'border-destructive')}
                  aria-describedby="message-hint"
                />
                <p id="message-hint" className="text-xs text-muted-foreground mt-1">
                  Max 1000 characters
                </p>
                {errors.message && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <Button
                type="submit"
                variant="coral"
                size="lg"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Booking Request
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                By submitting this form, you agree to our{' '}
                <a href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
