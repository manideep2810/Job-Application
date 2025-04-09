# Job Application Tracker

A full-stack web application to help job seekers track their job applications, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication and authorization
- Create, read, update, and delete job applications
- Filter and search job applications
- Track application status (Applied, Interview, Offer, Rejected)
- Add notes and links to job applications
- Responsive design for mobile and desktop
- Company logos via Clearbit Logo API

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## Deployment

The application is deployed with:
- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com)

### Deployment Instructions

#### Backend Deployment on Render

1. Create a new Web Service on Render
2. Link your GitHub repository
3. Use the following settings:
   - Environment: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Add the following environment variables:
   - `PORT`: 10000
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `JWT_EXPIRE`: 30d

#### Frontend Deployment on Vercel

1. Import your GitHub repository in Vercel
2. Configure the following settings:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
3. Add the following environment variables:
   - `VITE_API_URL`: Your backend API URL (e.g., https://job-application-tracker-api.onrender.com/api)

## Development Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables
   - Create a `.env` file in the backend directory with:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRE=30d
     ```
   - Create a `.env` file in the frontend directory with:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. Run the development servers
```bash
# Run backend server
cd backend
npm run dev

# Run frontend server
cd ../frontend
npm run dev
```

## License

[MIT](LICENSE) 