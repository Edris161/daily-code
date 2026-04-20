"use client";

import React from 'react';

interface Props {
  level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  title: string;
  description: string;
  features: string[];
  duration?: string;
  classes?: string;
  highlighted?: boolean;
}

export default function CourseCardPremium({ level, title, description, features, duration, classes = '', highlighted = false }: Props) {
  return (
    <article className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg transition-transform transform ${highlighted ? 'scale-105 md:scale-105 z-10' : 'hover:scale-105'} ${classes}`} aria-labelledby={`course-${level}`}>
      {/* Most Popular badge for highlighted */}
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Most Popular</div>
      )}

      {/* Level Badge */}
      <div className="mb-3">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/12 border border-white/10 text-white/90">{level}</span>
      </div>

      <h4 id={`course-${level}`} className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-200 mb-4 leading-relaxed">{description}</p>

      <ul className="text-sm text-gray-200 mb-4 space-y-2">
        {features.slice(0,4).map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-white/80">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {duration && <div className="text-sm text-gray-300 mb-4">{duration}</div>}

      <a href="/apply" className="inline-flex items-center justify-center w-full btn btn-primary py-2 px-4 rounded-lg">Enroll Now</a>

    </article>
  );
}
