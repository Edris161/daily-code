// src/lib/api/hooks/useTours.ts
import { useState, useEffect } from 'react';
import { toursService, Tour } from '../services/tours';

export const useTours = (filters?: any) => {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTours();
  }, [JSON.stringify(filters)]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await toursService.getAll(filters);
      setData(response.results);
      setTotal(response.count);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchTours();
  };

  return { data, loading, error, total, refetch };
};

export const useTour = (slug: string) => {
  const [data, setData] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTour = async () => {
      try {
        setLoading(true);
        const tour = await toursService.getBySlug(slug);
        setData(tour);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch tour');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  return { data, loading, error };
};