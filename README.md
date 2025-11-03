# Collexus - Student Networking Platform

A comprehensive 3D MERN stack platform connecting students across NITs, IITs, and universities worldwide.

## Features

- **Authentication System**: JWT-based login with role-based access
- **Student Dashboard**: Personalized dashboard with quick stats
- **Clubs & Communities**: Join, create, and manage student clubs
- **Events System**: Discover events and RSVP with capacity tracking
- **Real-time Messaging**: Direct and group chat with typing indicators
- **Job Board**: Browse internships and full-time opportunities
- **Recruiter Panel**: Post jobs and track applicants
- **Admin Dashboard**: Content moderation and platform analytics
- **3D Design**: Modern glassmorphic UI with smooth animations

## Tech Stack

### Frontend
- React.js + Next.js 15
- TailwindCSS v4
- TypeScript
- ShadcN UI Components
- GSAP for animations

### Backend
- Node.js + Express.js
- Socket.io for real-time features
- MongoDB + Mongoose ORM
- JWT Authentication
- Bcrypt for password hashing

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Quick Start

### Frontend
\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Backend Setup
\`\`\`bash
cd server
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
\`\`\`

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/verify

### Clubs
- GET /api/clubs
- POST /api/clubs
- PUT /api/clubs/:id
- DELETE /api/clubs/:id

### Events
- GET /api/events
- POST /api/events
- POST /api/events/:id/rsvp

### Jobs
- GET /api/jobs
- POST /api/jobs
- POST /api/jobs/:id/apply

### Users
- GET /api/users/:id/profile
- PUT /api/users/:id/profile

### Admin
- GET /api/admin/reports
- POST /api/admin/reports
- PATCH /api/admin/reports/:id

## Environment Variables

\`\`\`
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
SOCKET_IO_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

## Role-Based Access

1. **Student**: Access dashboard, join clubs, browse jobs
2. **Club Admin**: Manage club, create events, moderate members
3. **Recruiter**: Post jobs, view candidates, track applications
4. **Institution**: Verify clubs, monitor engagement, send announcements
5. **Super Admin**: Full platform control, content moderation

## Deployment

### Deploy to Vercel
\`\`\`bash
vercel deploy
\`\`\`

### Deploy to Render
\`\`\`bash
# Connect your GitHub repository to Render
# Set environment variables
# Deploy with git push
\`\`\`

## Contributing

Pull requests are welcome! Please follow the existing code style and add tests for new features.

## License

MIT License - feel free to use this for educational purposes.
\`\`\`
