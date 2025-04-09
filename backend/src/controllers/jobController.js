import Job from '../models/Job.js';

// @desc    Create new job application
// @route   POST /api/jobs
// @access  Private
export const createJob = async (req, res) => {
  try {
    // Add user to request body
    req.body.user = req.user.id;
    
    // Create job
    const job = await Job.create(req.body);
    
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all job applications
// @route   GET /api/jobs
// @access  Private
export const getJobs = async (req, res) => {
  try {
    let query;
    
    // Check if user is admin
    if (req.user.role === 'admin') {
      // If admin, get all jobs
      query = Job.find();
    } else {
      // If user, get only their jobs
      query = Job.find({ user: req.user.id });
    }
    
    // Filter by status
    if (req.query.status) {
      query = query.find({ status: req.query.status });
    }
    
    // Filter by date
    if (req.query.startDate && req.query.endDate) {
      query = query.find({
        applicationDate: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        }
      });
    }
    
    // Sort by application date
    const sortBy = req.query.sortBy || '-applicationDate';
    query = query.sort(sortBy);
    
    // Execute query
    const jobs = await query;
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single job application
// @route   GET /api/jobs/:id
// @access  Private
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Make sure user owns job or is admin
    if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this job'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update job application
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Make sure user owns job or is admin
    if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }
    
    // Update job
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete job application
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Make sure user owns job or is admin
    if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }
    
    await job.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}; 