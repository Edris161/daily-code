export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
export const API_TIMEOUT = 30000;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const getAuthHeader = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiCall = async <T,>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const fullUrl = `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok && response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText,
          details: responseData,
        },
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};

export const api = {
  get: <T,>(url: string) => apiCall<T>('get', url),
  post: <T,>(url: string, data?: unknown) => apiCall<T>('post', url, data),
  put: <T,>(url: string, data?: unknown) => apiCall<T>('put', url, data),
  patch: <T,>(url: string, data?: unknown) => apiCall<T>('patch', url, data),
  delete: <T,>(url: string) => apiCall<T>('delete', url),
};
