import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';

const apiClient = axios.create({
  baseURL: API_CONFIG.PROXY_URL,
  timeout: 10000,
  headers: {
    'x-cg-api-key': API_CONFIG.API_KEY
  }
});

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

// Rate limiting queue
let lastRequestTime = 0;
const requestQueue: Array<() => Promise<void>> = [];
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < API_CONFIG.RATE_LIMIT_MS) {
      await new Promise(resolve => 
        setTimeout(resolve, API_CONFIG.RATE_LIMIT_MS - timeSinceLastRequest)
      );
    }
    
    const request = requestQueue.shift();
    if (request) {
      lastRequestTime = Date.now();
      await request();
    }
  }
  
  isProcessingQueue = false;
};

const addToQueue = <T>(request: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    requestQueue.push(async () => {
      try {
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    processQueue();
  });
};

export const fetchWithCache = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> => {
  const queryString = new URLSearchParams(params).toString();
  const cacheKey = `${endpoint}?${queryString}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION_MS) {
    return cached.data;
  }
  
  // Make the request with rate limiting
  const makeRequest = async (): Promise<T> => {
    try {
      const response = await apiClient.get<T>(endpoint, { 
        params,
        headers: {
          'x-cg-api-key': API_CONFIG.API_KEY
        }
      });
      
      // Update cache
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          // Rate limit hit, retry after delay
          await new Promise(resolve => setTimeout(resolve, API_CONFIG.RATE_LIMIT_MS));
          return makeRequest();
        }
        throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  };
  
  return addToQueue(makeRequest);
};

export const cryptoApi = {
  getMarkets: (params: {
    vs_currency: string;
    order: string;
    per_page: number;
    page: number;
    sparkline: boolean;
  }) => {
    return fetchWithCache('/coins/markets', params);
  },
  
  // Add other API methods as needed
}; 