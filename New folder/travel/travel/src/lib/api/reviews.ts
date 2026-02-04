import api from './axios';

export interface Review {
  id: number;
  user: {
    id: number;
    email: string;
    full_name: string;
  };
  tour: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewData {
  tour_id: number;
  rating: number;
  comment: string;
}

export interface ReviewListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
  statistics: {
    average_rating: number;
    total_reviews: number;
  };
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  distribution: {
    [key: number]: number;
  };
}

export const reviewsApi = {
  // Create review
  createReview: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post('/reviews/', data);
    return response.data;
  },

  // Get tour reviews
  getTourReviews: async (tourSlug: string): Promise<ReviewListResponse> => {
    const response = await api.get(`/reviews/tour/${tourSlug}/`);
    return response.data;
  },

  // Get review statistics
  getReviewStats: async (tourSlug: string): Promise<ReviewStats> => {
    const response = await api.get(`/reviews/tour/${tourSlug}/stats/`);
    return response.data;
  },

  // Get user reviews
  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get('/reviews/my/');
    return response.data;
  },

  // Update review
  updateReview: async (reviewId: number, data: Partial<Review>): Promise<Review> => {
    const response = await api.put(`/reviews/${reviewId}/`, data);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId: number): Promise<void> => {
    await api.delete(`/reviews/${reviewId}/delete/`);
  },
};