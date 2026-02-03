import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Adventure Lane', 'San Francisco, CA 94102'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+1 (800) 555-0199', '+1 (415) 555-0123'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@wanderlust.travel', 'support@wanderlust.travel'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon-Fri: 9AM - 6PM PST', 'Sat: 10AM - 4PM PST'],
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Contact form:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

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
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={info.title}
                      className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-soft"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.lines.map((line) => (
                          <p key={line} className="text-sm text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-xl border border-border shadow-card p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-forest" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8"
                  noValidate
                >
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        className={cn(errors.name && 'border-destructive')}
                        aria-invalid={errors.name ? 'true' : 'false'}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1" role="alert">
                          {errors.name.message}
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
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="md:col-span-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        className={cn(errors.subject && 'border-destructive')}
                        aria-invalid={errors.subject ? 'true' : 'false'}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive mt-1" role="alert">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        rows={6}
                        className={cn(errors.message && 'border-destructive')}
                        aria-invalid={errors.message ? 'true' : 'false'}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      variant="coral"
                      size="lg"
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
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
