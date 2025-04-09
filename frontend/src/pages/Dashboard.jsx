import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaChartBar, FaSpinner } from 'react-icons/fa';
import JobCard from '../components/JobCard';
import JobFilter from '../components/JobFilter';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0
  });
  
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get('/api/jobs');
        const jobsData = response.data.data;
        
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        calculateStats(jobsData);
      } catch (err) {
        setError('Failed to fetch job applications. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  const calculateStats = (jobsData) => {
    const newStats = {
      total: jobsData.length,
      applied: jobsData.filter(job => job.status === 'Applied').length,
      interview: jobsData.filter(job => job.status === 'Interview').length,
      offer: jobsData.filter(job => job.status === 'Offer').length,
      rejected: jobsData.filter(job => job.status === 'Rejected').length
    };
    
    setStats(newStats);
  };
  
  const handleFilterChange = (filters) => {
    let filtered = [...jobs];
    
    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(job => job.status === filters.status);
    }
    
    // Filter by date range
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(job => new Date(job.applicationDate) >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // End of the day
      filtered = filtered.filter(job => new Date(job.applicationDate) <= endDate);
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(job => 
        job.company.toLowerCase().includes(searchTerm) || 
        job.role.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredJobs(filtered);
  };
  
  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.put(`/api/jobs/${jobId}`, { status: newStatus });
      
      // Update job in state
      const updatedJobs = jobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      );
      
      setJobs(updatedJobs);
      
      // Also update filtered jobs
      const updatedFilteredJobs = filteredJobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      );
      
      setFilteredJobs(updatedFilteredJobs);
      calculateStats(updatedJobs);
    } catch (err) {
      console.error('Error updating job status:', err);
    }
  };
  
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`/api/jobs/${jobId}`);
        
        // Remove job from state
        const updatedJobs = jobs.filter(job => job._id !== jobId);
        setJobs(updatedJobs);
        
        // Also update filtered jobs
        const updatedFilteredJobs = filteredJobs.filter(job => job._id !== jobId);
        setFilteredJobs(updatedFilteredJobs);
        
        calculateStats(updatedJobs);
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Job Applications</h1>
          <p className="text-gray-600">Track and manage your job search process</p>
        </div>
        <Link to="/job/new" className="btn btn-primary flex items-center mt-4 md:mt-0">
          <FaPlus className="mr-2" />
          <span>Add New Job</span>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="card bg-primary-50 border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-1">Total</h3>
          <div className="text-3xl font-bold text-primary-700">{stats.total}</div>
        </div>
        <div className="card bg-blue-50 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-1">Applied</h3>
          <div className="text-3xl font-bold text-blue-700">{stats.applied}</div>
        </div>
        <div className="card bg-yellow-50 border border-yellow-100">
          <h3 className="text-lg font-semibold text-yellow-900 mb-1">Interview</h3>
          <div className="text-3xl font-bold text-yellow-700">{stats.interview}</div>
        </div>
        <div className="card bg-green-50 border border-green-100">
          <h3 className="text-lg font-semibold text-green-900 mb-1">Offers</h3>
          <div className="text-3xl font-bold text-green-700">{stats.offer}</div>
        </div>
        <div className="card bg-red-50 border border-red-100">
          <h3 className="text-lg font-semibold text-red-900 mb-1">Rejected</h3>
          <div className="text-3xl font-bold text-red-700">{stats.rejected}</div>
        </div>
      </div>
      
      {/* Filters */}
      <JobFilter onFilterChange={handleFilterChange} />
      
      {/* Job List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="text-primary-500 text-4xl animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <FaChartBar className="text-gray-300 text-6xl mb-4 mx-auto" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No job applications found</h3>
          <p className="text-gray-500 mb-6">
            {jobs.length === 0 
              ? "You haven't added any job applications yet." 
              : "No jobs match your current filters."}
          </p>
          {jobs.length === 0 && (
            <Link to="/job/new" className="btn btn-primary">
              Add Your First Job
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job._id} 
              job={job} 
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 