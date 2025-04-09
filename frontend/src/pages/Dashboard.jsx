import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaChartBar, FaSpinner, FaBriefcase, FaFilter, FaSlidersH, FaInbox } from 'react-icons/fa';
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
    
    if (filters.status) {
      filtered = filtered.filter(job => job.status === filters.status);
    }
    
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(job => new Date(job.applicationDate) >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(job => new Date(job.applicationDate) <= endDate);
    }
    
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
      
      const updatedJobs = jobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      );
      
      setJobs(updatedJobs);
      
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
        
        const updatedJobs = jobs.filter(job => job._id !== jobId);
        setJobs(updatedJobs);
        
        const updatedFilteredJobs = filteredJobs.filter(job => job._id !== jobId);
        setFilteredJobs(updatedFilteredJobs);
        
        calculateStats(updatedJobs);
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="font-heading mb-2">Job Applications</h1>
          <p className="text-gray-600">Track and manage your job search process</p>
        </div>
        <Link 
          to="/job/new" 
          className="btn btn-primary flex items-center mt-4 md:mt-0 shadow-md"
        >
          <FaPlus className="mr-2" />
          <span>Add New Application</span>
        </Link>
      </div>
      
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <div className="stat-card bg-gray-50 border border-gray-200">
          <span className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <FaBriefcase className="text-gray-700" />
          </span>
          <div className="stat-number text-gray-900">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        
        <div className="stat-card bg-blue-50 border border-blue-100">
          <span className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <span className="text-xl">📝</span>
          </span>
          <div className="stat-number text-blue-700">{stats.applied}</div>
          <div className="stat-label">Applied</div>
        </div>
        
        <div className="stat-card bg-amber-50 border border-amber-100">
          <span className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
            <span className="text-xl">🗣️</span>
          </span>
          <div className="stat-number text-amber-700">{stats.interview}</div>
          <div className="stat-label">Interview</div>
        </div>
        
        <div className="stat-card bg-emerald-50 border border-emerald-100">
          <span className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
            <span className="text-xl">🎉</span>
          </span>
          <div className="stat-number text-emerald-700">{stats.offer}</div>
          <div className="stat-label">Offers</div>
        </div>
        
        <div className="stat-card bg-rose-50 border border-rose-100">
          <span className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
            <span className="text-xl">❌</span>
          </span>
          <div className="stat-number text-rose-700">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>
      
      
      <div className="section">
        <div className="flex items-center mb-4">
          <FaSlidersH className="text-gray-500 mr-2" />
          <h2 className="text-lg font-medium">Filter Applications</h2>
        </div>
        <JobFilter onFilterChange={handleFilterChange} />
      </div>
      
      
      <div className="section">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaInbox className="text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Your Applications</h2>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Showing {filteredJobs.length} of {jobs.length} applications
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <FaSpinner className="text-primary-500 text-4xl animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-rose-50 text-rose-700 p-6 rounded-xl border border-rose-200 flex items-center">
            <div className="mr-4 bg-rose-100 rounded-full p-3 text-rose-500">⚠️</div>
            <div>
              <h3 className="font-medium">Error loading data</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartBar className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No job applications found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {jobs.length === 0 
                ? "You haven't added any job applications yet." 
                : "No jobs match your current filters."}
            </p>
            {jobs.length === 0 && (
              <Link to="/job/new" className="btn btn-primary inline-flex items-center">
                <FaPlus className="mr-2" />
                <span>Add Your First Job</span>
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
    </div>
  );
};

export default Dashboard; 
