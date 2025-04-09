# Job Application Tracker API

This is a RESTful API for a Job Application Tracker built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Role-based authorization (User and Admin roles)
- CRUD operations for job applications
- Filtering jobs by status and date

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get token
- `GET /api/users/me` - Get current user info

### Job Applications

- `GET /api/jobs` - Get all jobs for current user (admins can see all jobs)
- `POST /api/jobs` - Create a new job application
- `GET /api/jobs/:id` - Get a specific job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application

## Query Parameters for Filtering

- `status` - Filter by application status (Applied, Interview, Offer, Rejected)
- `startDate` and `endDate` - Filter by application date range
- `sortBy` - Sort by field (default: -applicationDate, descending) 