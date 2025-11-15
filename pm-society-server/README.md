# PM Society - Server

A robust Express.js backend server for the PM Society platform. This server provides RESTful APIs for user authentication, community management, events, learning resources, payments, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Authentication](#authentication)
- [File Storage](#file-storage)
- [Email & Notifications](#email--notifications)
- [Payment Processing](#payment-processing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Management** - Registration, authentication, profile management
- **Role-Based Access Control** - Admin, moderator, and user roles
- **Authentication & Authorization** - JWT-based token authentication with refresh tokens
- **Community Features** - Discussions, forums, and user connections
- **Event Management** - Create, update, and manage events
- **Learning Resources** - Course and learning material management
- **Blog Management** - Blog creation and publication system
- **Achievement Tracking** - Track user achievements and progress
- **File Upload** - MinIO object storage for file management
- **Email Notifications** - Nodemailer integration for transactional emails
- **Mailchimp Integration** - Email marketing and newsletter management
- **Payment Processing** - Stripe integration for secure payments
- **Search Functionality** - Full-text search across resources
- **CORS Protection** - Cross-origin request handling
- **Error Handling** - Comprehensive error management and logging

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org) with TypeScript
- **Framework**: [Express.js 5.1.0](https://expressjs.com)
- **Database**: [MongoDB](https://www.mongodb.com) with [Mongoose 8.16.1](https://mongoosejs.com)
- **Authentication**: [JWT](https://jwt.io) with [jsonwebtoken 9.0.2](https://github.com/auth0/node-jsonwebtoken)
- **Encryption**: [bcrypt 6.0.0](https://github.com/kelektiv/node.bcrypt.js)
- **File Storage**: [MinIO 8.0.6](https://min.io)
- **Email**: [Nodemailer 7.0.5](https://nodemailer.com)
- **Marketing**: [Mailchimp API 3.0.80](https://mailchimp.com)
- **Payments**: [Stripe 18.2.1](https://stripe.com)
- **CORS**: [cors 2.8.5](https://github.com/expressjs/cors)
- **Environment**: [dotenv 16.6.1](https://github.com/motdotla/dotenv)
- **File Upload**: [multer 2.0.2](https://github.com/expressjs/multer)
- **Language**: TypeScript 5.8.3

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16 or higher
- **npm** or **pnpm**: v8 or higher
- **MongoDB**: Local or remote instance
- **Git**: For version control

Optional but recommended:
- **Docker**: For containerized deployment
- **MinIO**: For local file storage testing

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pm-society/pm-society-server
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following environment variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_URL=mongodb://localhost:27017/pm-society

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=30d

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=10

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@thepmsociety.com

# Mailchimp Configuration
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_AUDIENCE_ID=your-mailchimp-audience-id

# MinIO Configuration (File Storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
BUCKET_NAME=pm-society

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-key

# AI API Keys
GROQ_API_KEY=your-groq-api-key
GEMINI_API_KEY=your-gemini-api-key
```

## 🏃 Running the Application

### Development Mode
Start the development server with automatic restart on file changes:
```bash
pnpm dev
```
The server will run on `http://localhost:5000`

### Production Build
```bash
pnpm build
```

### Production Start
```bash
pnpm start
```

### Run Tests
```bash
pnpm test
```

## 📁 Project Structure

```
pm-society-server/
├── src/
│   ├── app.ts                     # Express app configuration
│   ├── server.ts                  # Server entry point
│   └── app/
│       ├── config/
│       │   └── index.ts           # Environment variables config
│       ├── middlewares/           # Express middlewares
│       │   ├── auth.ts            # JWT authentication
│       │   ├── errorHandler.ts    # Error handling middleware
│       │   └── notFound.ts        # 404 handler
│       ├── modules/               # Feature modules
│       │   ├── auth/              # Authentication module
│       │   ├── users/             # User management
│       │   ├── blogs/             # Blog management
│       │   ├── cohort/            # Cohort management
│       │   ├── events/            # Event management
│       │   ├── learning-resources/# Learning resources
│       │   ├── forums/            # Forum/Discussion module
│       │   ├── goal/              # Goals management
│       │   ├── achievement/       # Achievement tracking
│       │   ├── contact/           # Contact form handling
│       │   ├── search/            # Search functionality
│       │   ├── mailchimp/         # Email marketing
│       │   └── ...
│       ├── routes/                # API route definitions
│       │   └── index.ts           # Main router
│       └── utils/                 # Utility functions
│           ├── validators.ts      # Input validation
│           ├── errors.ts          # Custom error classes
│           └── helpers.ts         # Helper functions
├── dist/                          # Compiled JavaScript (after build)
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── .env                           # Environment variables
└── README.md                      # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/:id/profile` - Get user profile details

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog (admin/author)
- `PUT /api/blogs/:id` - Update blog (admin/owner)
- `DELETE /api/blogs/:id` - Delete blog (admin/owner)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `POST /api/events/:id/register` - Register for event

### Learning Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Create resource (admin)
- `PUT /api/resources/:id` - Update resource (admin)
- `DELETE /api/resources/:id` - Delete resource (admin)

### Cohorts
- `GET /api/cohorts` - Get all cohorts
- `GET /api/cohorts/:id` - Get cohort by ID
- `POST /api/cohorts` - Create cohort (admin)
- `PUT /api/cohorts/:id` - Update cohort (admin)
- `DELETE /api/cohorts/:id` - Delete cohort (admin)

### Forums/Discussions
- `GET /api/discussions` - Get all discussions
- `POST /api/discussions` - Create discussion
- `GET /api/discussions/:id` - Get discussion details
- `POST /api/discussions/:id/reply` - Reply to discussion

### Search
- `GET /api/search?q=keyword` - Search across resources

## 🗄️ Database

### MongoDB Connection
The server uses MongoDB through Mongoose ORM for data persistence.

**Connection String Format**:
```
mongodb://[username]:[password]@[host]:[port]/[database]
```

**Collections**:
- `users` - User accounts and profiles
- `blogs` - Blog posts
- `events` - Events
- `cohorts` - Cohort groups
- `resources` - Learning resources
- `discussions` - Forum discussions
- `goals` - User goals
- `achievements` - User achievements
- `contacts` - Contact submissions

## 🔐 Authentication

### JWT Tokens
- **Access Token**: Short-lived token (7 days) for API requests
- **Refresh Token**: Long-lived token (30 days) for token renewal

### Headers
```
Authorization: Bearer <access_token>
```

### Token Refresh Flow
1. Client receives access token and refresh token on login
2. Access token included in Authorization header for requests
3. When token expires, use refresh token to get new access token
4. If refresh token expires, user must login again

## 📁 File Storage

### MinIO Integration
Files are uploaded to MinIO object storage (S3-compatible).

**Configuration**:
- Endpoint: `localhost:9000` (development)
- Access Key: `minioadmin`
- Secret Key: `minioadmin`
- Bucket: `pm-society`

**Supported File Types**:
- Documents: PDF, DOC, DOCX, XLS, XLSX
- Images: JPG, JPEG, PNG, GIF, WebP
- Videos: MP4, MOV, AVI, WebM

**Upload Endpoint**:
```
POST /api/upload
Content-Type: multipart/form-data
```

## 📧 Email & Notifications

### Nodemailer
Transactional emails are sent via Nodemailer.

**Email Types**:
- Welcome emails
- Password reset
- Event notifications
- Cohort updates
- Achievement awards

### Mailchimp Integration
Newsletter and marketing emails managed through Mailchimp API.

## 💳 Payment Processing

### Stripe Integration
Handles payments for courses and premium features.

**Payment Flow**:
1. Client creates payment intent
2. User confirms payment
3. Server validates payment
4. Update user subscription status

**Webhook Events**:
- `payment_intent.succeeded` - Payment successful
- `payment_intent.payment_failed` - Payment failed
- `customer.subscription.updated` - Subscription updated

## 🚀 Deployment

### Docker Deployment
The server can be containerized using Docker. Configuration available in `Dockerfile`.

### Vercel Deployment
Configuration available in `vercel.json`.

### Coolify Deployment
Configuration available in `coolify.json`.

### CORS Configuration
By default, CORS is enabled for:
- `http://localhost:3000` (development)
- `https://pm-society.vercel.app` (production)
- `https://www.thepmsociety.com`
- `https://thepmsociety.com`

### Environment Setup
Set `NODE_ENV=production` for production deployments.

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check MongoDB is running
# Verify DB_URL in .env
# Test connection string
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### JWT Token Errors
```bash
# Regenerate JWT_SECRET
# Clear existing tokens
# User needs to login again
```

### File Upload Issues
```bash
# Check MinIO is running
# Verify MINIO credentials
# Check bucket exists
# Verify disk space
```

### Email Not Sending
```bash
# Check EMAIL credentials in .env
# Verify SMTP settings
# Check firewall/port 587
# Review error logs
```

### Build Errors
```bash
# Clear node_modules and rebuild
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Guide](https://jwt.io/introduction)
- [Stripe API](https://stripe.com/docs/api)
- [MinIO Documentation](https://docs.min.io)
- [Nodemailer Guide](https://nodemailer.com)

## 📝 License

ISC

## 👥 Contributing

Please follow the existing code structure and conventions. Create feature branches from `main` and submit pull requests for review.

## 📞 Support

For issues or questions, please open an issue on the GitHub repository or contact the development team.
