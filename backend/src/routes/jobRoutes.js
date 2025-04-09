import express from 'express';
import { 
  getJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob 
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes for all authenticated users
router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

export default router; 