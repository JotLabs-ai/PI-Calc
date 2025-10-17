# Deployment Information

## Vercel Deployment

**Production URL:** https://pi-calc-9bbb3gqku-ianhedgelands-projects.vercel.app

**Project Dashboard:** https://vercel.com/ianhedgelands-projects/pi-calc

**GitHub Repository:** https://github.com/JotLabs-ai/PI-Calc

## Auto-Deployment

The project is connected to GitHub and configured for automatic deployments:

- **Push to `main` branch** → Automatic production deployment
- **Pull requests** → Automatic preview deployments

Every push to the `main` branch will automatically trigger a new deployment to Vercel.

## Manual Deployment

To deploy manually from the command line:

```bash
vercel --prod
```

## Configuration

- **Build Command:** `vite build`
- **Output Directory:** `dist`
- **Development Command:** `vite --port $PORT`
- **Framework:** Vite (React)

## Vercel Project Settings

To modify domain, environment variables, or build settings:
https://vercel.com/ianhedgelands-projects/pi-calc/settings
