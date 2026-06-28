# SaaSy Solutions

A B2B SaaS analytics dashboard built to demonstrate modern frontend engineering patterns — featuring real-time data visualization, GraphQL integration, global state management, and production deployment on Vercel.

🔗 **Live Demo:** [saasy-orpin.vercel.app](https://saasy-orpin.vercel.app)

---

## Overview

SaaSy Solutions is a full-featured analytics and reporting dashboard designed for a fictional B2B SaaS company. The project serves as a vehicle for building and demonstrating production-grade frontend skills across data visualization, API integration, state management, and cloud deployment.

The dashboard includes multi-section reporting views, interactive charts, GraphQL-powered data fetching, and Redux-managed global state — all built with Next.js and TypeScript.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Visualization | Recharts |
| API Layer | GraphQL |
| State Management | Redux |
| Deployment | Vercel |
| Containerization | Docker (Next.js standalone mode) |

---

## Key Features

- **Interactive analytics dashboard** — Multi-chart reporting views with Recharts (line, bar, area charts)
- **GraphQL data layer** — Structured API queries replacing traditional REST patterns
- **Redux state management** — Global state for dashboard filters, user preferences, and shared data
- **Next.js App Router** — Leverages server components, layouts, and nested routing
- **Docker support** — Containerized using Next.js standalone mode for portable deployment
- **TypeScript throughout** — Strict typing across components, API responses, and Redux slices
- **Responsive layout** — Mobile-aware dashboard design with Tailwind CSS utility classes

---

## Project Structure

```
SaasySolutions/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard home
│   └── [section]/          # Feature route segments
├── lib/                    # GraphQL queries, Redux store, utilities
├── styles/                 # Global CSS
├── public/                 # Static assets
├── next.config.ts          # Next.js config (standalone output)
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

---

## Docker Deployment

This project is configured for Docker using Next.js standalone output mode, which produces a minimal self-contained build optimized for containerized environments.

```bash
# Build the image
docker build -t saasy-solutions .

# Run the container
docker run -p 3000:3000 saasy-solutions
```

Deployable to any container platform: GCP Cloud Run, AWS ECS, Azure Container Apps, Fly.io, Railway, etc.

---

## Motivation

This project was built to develop and demonstrate hands-on experience with technologies commonly required in senior frontend roles — particularly GraphQL, Redux, and data visualization — within a realistic B2B product context. It has evolved continuously as a learning platform for new tools and deployment patterns.

---

## Related Projects

- [CSRA Intranet Modernization](https://github.com/SurfBDeployments/csra) — SharePoint 2010 → React 19 enterprise intranet rebuild, deployed to GCP Cloud Run via Docker
