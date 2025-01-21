# Crypto Price Tracker

A real-time cryptocurrency price tracking application built with React, TypeScript, and Vite. This application uses the CoinGecko API to display live cryptocurrency prices and market data.

## Features

- Real-time cryptocurrency price tracking
- Detailed market information for top cryptocurrencies
- Responsive design with Tailwind CSS
- TypeScript for enhanced type safety
- Modern React hooks and functional components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- CoinGecko API key

## CoinGecko API Registration

[CoinGecko API](https://www.coingecko.com/en/api)


## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/JustinSilbiger/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Copy `.env.example` to create a new `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Add your CoinGecko API key to the `.env` file:
     ```
     VITE_COINGECKO_API_KEY=your_api_key_here
     ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open http://localhost:5173 in your browser

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API requests
- CoinGecko API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


