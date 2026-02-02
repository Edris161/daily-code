'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I create an account?',
    answer:
      'Visit our registration page and choose whether you want to register as a buyer or seller. Fill in your details and verify your email to get started.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit cards, debit cards, bank transfers, digital wallets, and cash on delivery in select regions.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery times vary depending on your location and the seller. Most orders are delivered within 5-15 business days. You can track your order in real-time.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for most items. If you\'re not satisfied with your purchase, you can initiate a return through your account.',
  },
  {
    question: 'How do I become a seller?',
    answer:
      'Click on "Become a Seller" and complete the registration process. You\'ll need to provide business information and go through verification.',
  },
  {
    question: 'Is my personal information secure?',
    answer:
      'Yes, we use enterprise-grade encryption and security measures to protect your personal and payment information.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container-responsive py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-text-secondary text-center mb-12">
          Find answers to common questions about using Alibaba
        </p>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <Card
              key={index}
              clickable
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <button className="w-full flex items-start justify-between gap-4 text-left">
                <span className="font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-primary transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <p className="mt-4 pt-4 border-t border-border-light text-text-secondary">
                  {faq.answer}
                </p>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
          <p className="text-blue-900 dark:text-blue-100">
            Still have questions?{' '}
            <a href="/contact" className="font-semibold hover:underline">
              Contact our support team
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
