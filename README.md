# History of the Day

A React web application presenting historical events with a vintage, newspaper-inspired design. Users can explore events based on specific dates, navigate an interactive map of historical sites, and discover chronicles of Indian history.

## Features

### Home Page
- Vintage poster design with gold-accented typography
- Displays featured historical event for the current date
- Quick navigation to Timeline and Map views

### Explore / Chronicles Page
- Browse historical events by selecting any date
- Interactive date selector with month and day picker
- Events displayed in vintage-styled cards
- Search functionality for discovering events

### Map Page
- Google Maps integration with custom vintage styling
- Interactive markers for historical sites across India
- Filter sites by category
- Detailed information panel for each location

## Technology Stack

- React 19
- Vite 7
- React Router DOM
- TailwindCSS 3
- Google Maps API
- Lucide React (icons)

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Google Maps API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd History_Of_The_Day
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your Google Maps API key to the `.env` file.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local URL shown in the terminal (typically `http://localhost:5173`).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Shared components (Navbar, etc.)
│   ├── home/            # Home page components
│   ├── explore/         # Explore/Timeline components
│   └── map/             # Map page components
├── data/                # Static data files
│   └── history/         # Historical events data (JSON)
├── pages/               # Page-level components
├── services/            # Data fetching and business logic
├── styles/              # Global styles and CSS
└── utils/               # Utility functions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

This project is proprietary software. All rights reserved.
