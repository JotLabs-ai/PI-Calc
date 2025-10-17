# Personal Injury Calculator

A professional single-page application for calculating potential personal injury compensation. Built for Browne Law Group with React, TypeScript, and Tailwind CSS, styled to match the antilawyer.com brand.

## Features

- **7-Step Calculator**: Guides users through incident details, injury severity, medical treatment, lost wages, property damage, fault determination, and lead capture
- **Real-time Validation**: Form validation using React Hook Form and Zod
- **Compensation Estimation**: Algorithm-based calculation showing estimated settlement ranges
- **Professional Design**: Matches Browne Law Group's brand (gold #DC971F, dark gray #333, Arial font)
- **Fully Responsive**: Mobile-first design with breakpoints at 768px and 960px
- **Lead Capture**: Secure email and phone collection with privacy protection messaging

## Tech Stack

- React 18+ with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Hook Form (form management)
- Zod (validation)
- Docker (containerization)

## Development

### Prerequisites

- Node.js 18.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Using Docker Directly

Build the image:
```bash
docker build -t pi-calculator .
```

Run the container:
```bash
docker run -d -p 3000:80 --name pi-calculator pi-calculator
```

### Docker Commands

Stop the container:
```bash
docker-compose down
```

View logs:
```bash
docker-compose logs -f
```

Rebuild after changes:
```bash
docker-compose up -d --build
```

## Netlify Deployment

This project is configured for Netlify deployment:

1. Connect your Git repository to Netlify
2. Netlify will automatically detect the build settings from `netlify.toml`
3. Build command: `npm run build`
4. Publish directory: `dist`

## Project Structure

```
src/
├── components/
│   ├── calculator/       # Calculator steps and logic
│   │   ├── Calculator.tsx
│   │   ├── Step1.tsx - Step7.tsx
│   │   └── Results.tsx
│   ├── common/          # Shared components
│   │   └── ProgressBar.tsx
│   └── layout/          # Layout components
│       ├── Header.tsx
│       ├── Hero.tsx
│       └── Footer.tsx
├── types/               # TypeScript type definitions
├── utils/               # Utilities and helpers
│   ├── calculator.ts    # Compensation calculation logic
│   └── validation.ts    # Zod validation schemas
├── App.tsx              # Main app component
└── index.css            # Tailwind imports
```

## Calculator Logic

The compensation calculator uses industry-standard multipliers based on:

- **Incident Type**: Different base values for car accidents, slip & fall, medical malpractice, etc.
- **Injury Severity**: Multipliers from 1.5x (minor) to 15x (catastrophic)
- **Medical Treatment**: Adds estimated costs for ER visits, hospitalization, surgery, etc.
- **Lost Wages**: Based on time off work duration
- **Property Damage**: Additional compensation for property loss
- **Fault Percentage**: Adjusts final amount based on liability split

## Legal Disclaimers

All compensation estimates are for informational purposes only and do not constitute legal advice. The application includes proper disclaimers in the footer and results page.

## License

Proprietary - Browne Law Group / JotLabs

## Support

For issues or questions, contact the development team.
