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

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd crypto-FE
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

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Testing

Run the test suite:

```bash
npm run test
# or
yarn test
```

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
