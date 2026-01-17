// src/lib/api/hooks/useDestinations.ts
import { useState, useEffect } from 'react';
import { destinationsService, Destination } from '../services/destinations';

export const useDestinations = (params?: any) => {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDestinations();
  }, [JSON.stringify(params)]); // Re-fetch when params change

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await destinationsService.getAll(params);
      setData(response.results);
      setTotal(response.count);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchDestinations();
  };

  return { data, loading, error, total, refetch };
};

export const useFeaturedDestinations = () => {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        setLoading(true);
        const destinations = await destinationsService.getFeatured();
        setData(destinations);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch featured destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDestinations();
  }, []);

  return { data, loading, error };
};

export const useDestination = (slug: string) => {
  const [data, setData] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchDestination = async () => {
      try {
        setLoading(true);
        const destination = await destinationsService.getBySlug(slug);
        setData(destination);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch destination');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  return { data, loading, error };
};