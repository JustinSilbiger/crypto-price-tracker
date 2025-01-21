export const API_CONFIG = {
  BASE_URL: 'https://api.coingecko.com/api/v3',
  PROXY_URL: '/api', // We'll use this with Vite's proxy
  RATE_LIMIT_MS: 2000, // 2 seconds between requests
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION_MS: 30000, // 30 seconds cache
  API_KEY: import.meta.env.VITE_COINGECKO_API_KEY,
}; 