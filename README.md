# Collexus - Student Networking Platform

## Overview
Collexus is a comprehensive student networking platform designed for NIT and IIT students to connect, collaborate, and create meaningful relationships across colleges.

## Tech Stack
- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Real-time:** Socket.io
- **Authentication:** JWT

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (v5.0+)
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd collexus-platform

# Backend setup
cd backend
npm install
cp .env.example .env
# Configure .env file
npm run dev

# Frontend setup (new terminal)
cd ../frontend
npm install
npm start
```

### Default Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Features
- ✅ User Authentication & Email Verification
- ✅ Profile Management
- ✅ Club Creation & Management
- ✅ Event Scheduling
- ✅ Real-time Messaging
- ✅ Search & Filtering
- ✅ Content Reporting
- ✅ Role-based Access Control

## Project Structure
```
collexus-platform/
├── frontend/          # React.js application
├── backend/           # Node.js API server
├── database/          # MongoDB schemas
├── docs/              # Documentation
└── README.md          # This file
```

## Support
For issues and questions, please create a GitHub issue.

## License
MIT License
