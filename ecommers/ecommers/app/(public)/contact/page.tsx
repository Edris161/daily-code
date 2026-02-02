'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="container-responsive py-12">
      <h1 className="text-4xl font-bold text-foreground mb-4 text-center">Contact Us</h1>
      <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
        Have a question or feedback? We'd love to hear from you. Get in touch with our team.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex gap-4">
                <Mail className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href="mailto:support@alibaba.com" className="text-primary hover:text-primary-dark">
                    support@alibaba.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <a href="tel:+1234567890" className="text-primary hover:text-primary-dark">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-foreground">Address</p>
                  <p className="text-text-secondary">123 Commerce St, Tech City, TC 12345</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Send us a Message</h2>
            </CardHeader>
            <CardBody>
              {success && (
                <Alert
                  type="success"
                  title="Message Sent!"
                  message="Thank you for your message. We'll get back to you soon."
                  dismissible
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-2 bg-background border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send Message
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
