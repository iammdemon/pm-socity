# PM Society - Client

A modern, full-featured Next.js application for the PM Society platform - a professional community for project managers. This client application provides a comprehensive user interface for community engagement, learning resources, event management, and professional networking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Building & Deployment](#building--deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Authentication** - NextAuth integration with JWT token management
- **Dashboard** - Personalized user dashboard with cohorts, events, resources, and forum access
- **Community Forums** - Discussion boards for knowledge sharing
- **Events Management** - Browse and register for PM Society events
- **Learning Resources** - Access to learning materials and courses
- **Blog Platform** - Read and manage blog content
- **Payment Integration** - Stripe-powered payment processing
- **User Profiles** - Manage personal and professional information
- **Admin Panel** - Administrative tools for managing users, blogs, events, and resources
- **AI Chat Integration** - N8N chat integration for AI-powered assistance
- **Responsive Design** - Mobile-first, fully responsive UI with Tailwind CSS

## 🛠 Tech Stack

- **Frontend Framework**: [Next.js 15.3.3](https://nextjs.org) with React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with custom animations
- **UI Components**: [Radix UI](https://www.radix-ui.com)
- **Form Handling**: [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) validation
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org) with [React Redux](https://react-redux.js.org)
- **API Calls**: [Axios](https://axios-http.com) with [TanStack React Query](https://tanstack.com/query)
- **Authentication**: [NextAuth.js 4.24.11](https://next-auth.js.org)
- **Payment**: [Stripe](https://stripe.com) integration
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons)
- **Data Visualization**: [Recharts](https://recharts.org)
- **Theme Management**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski) toast notifications
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (recommended package manager)
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pm-society/pm-society-client
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

## ⚙️ Configuration

Create a `.env.local` file in the root directory with the following environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret-key>

# Authentication Providers
NEXT_AUTH_GITHUB_ID=<your-github-id>
NEXT_AUTH_GITHUB_SECRET=<your-github-secret>

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>

# AI Chat Configuration
NEXT_PUBLIC_N8N_CHAT_ENDPOINT=<your-n8n-chat-endpoint>

# Image CDN Configuration
NEXT_PUBLIC_IMAGE_CDN=https://cdn.thepmsociety.com
```

## 🏃 Running the Application

### Development Mode
Start the development server with Turbopack for faster builds:
```bash
pnpm dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## 📁 Project Structure

```
pm-society-client/
├── app/                           # Next.js App Router
│   ├── about/                     # About page
│   ├── admin/                     # Admin dashboard and management
│   │   ├── blogs-management/
│   │   ├── cohort-management/
│   │   ├── users-management/
│   │   ├── events-management/
│   │   └── ...
│   ├── api/                       # API route handlers
│   │   ├── auth/                  # Auth endpoints
│   │   └── protected/             # Protected endpoints
│   ├── blogs/                     # Blog listing and detail pages
│   ├── connect/                   # Networking/Connection page
│   ├── dashboard/                 # User dashboard
│   │   ├── cohorts/
│   │   ├── events/
│   │   ├── forum/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── resources/
│   ├── login/                     # Login page
│   ├── enroll/                    # Enrollment page
│   ├── payment-success/           # Payment success confirmation
│   ├── privacy-policy/            # Privacy policy page
│   ├── services/                  # Services page
│   ├── terms/                     # Terms of service page
│   ├── components/                # Feature-specific components
│   ├── providers/                 # App providers (Auth, Redux, Theme)
│   ├── redux/                     # Redux store and services
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── login-form.tsx             # Login form component
│   └── ui/                        # Reusable UI components (Radix)
├── hooks/                         # Custom React hooks
│   └── useAuth.ts                 # Authentication hook
├── lib/
│   ├── auth.ts                    # Auth utilities
│   ├── utils.ts                   # Helper utilities
│   └── packages.ts                # Package utilities
├── public/
│   ├── fonts/                     # Custom fonts
│   ├── image/                     # Static images
│   └── video/                     # Static videos
├── types/
│   ├── forum.ts                   # Forum-related types
│   ├── package.ts                 # Package-related types
│   └── user.ts                    # User-related types
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

## 🔑 Key Features

### Authentication
- NextAuth.js integration with JWT tokens
- Secure session management
- Protected routes and API endpoints
- Login/Register functionality

### Dashboard
- User profile management
- Cohort tracking
- Event registration
- Resource access
- Forum participation
- Message inbox
- Notifications
- LinkedIn integration support

### Admin Panel
- User management
- Blog post management
- Event management
- Cohort management
- Resource management
- Contact inquiries

### Payments
- Stripe integration for secure payments
- Payment success/failure handling
- Invoice generation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly UI
- Accessible components

## 🔌 API Integration

The client communicates with the backend API at `http://localhost:5000/api` (configurable).

### Example API Calls
```typescript
// Using Axios
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Fetch with auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🔐 Authentication

Authentication is handled through NextAuth.js with JWT tokens:

1. User logs in via login page
2. Credentials validated by backend
3. JWT tokens stored in secure cookies
4. Protected routes check for valid session
5. Token refresh mechanism for expired tokens

## 🏗️ Building & Deployment

### Production Build
```bash
pnpm build
```

### Deploy to Vercel
```bash
vercel deploy
```

Vercel deployment is configured via `vercel.json`

### Docker Deployment
Configuration available in `nixpacks.toml` for Coolify/Nixpacks deployment

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
pnpm dev -- -p 3001
```

### Dependencies Installation Issues
```bash
pnpm install --force
pnpm install --no-frozen-lockfile
```

### Build Errors
```bash
# Clean build
pnpm build --clean
```

### TypeScript Errors
```bash
# Check TypeScript
pnpm tsc --noEmit
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [NextAuth.js](https://next-auth.js.org)
- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide)
- [React Hook Form](https://react-hook-form.com)

## 📝 License

ISC

## 👥 Contributing

Please follow the existing code structure and conventions. Create feature branches from `main` and submit pull requests for review.
