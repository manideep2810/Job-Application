import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  FaBuilding, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaLink, 
  FaSpinner, 
  FaCheck 
} from 'react-icons/fa';

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().substr(0, 10), // Current date in YYYY-MM-DD format
    link: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Job ID for editing
  
  // If ID exists, it's an edit operation
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchJob(id);
    }
  }, [id]);
  
  const fetchJob = async (jobId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/jobs/${jobId}`);
      const job = response.data.data;
      
      // Format the date for the input field
      const formattedDate = job.applicationDate 
        ? new Date(job.applicationDate).toISOString().substr(0, 10) 
        : '';
      
      setFormData({
        company: job.company || '',
        role: job.role || '',
        status: job.status || 'Applied',
        applicationDate: formattedDate,
        link: job.link || '',
        notes: job.notes || ''
      });
    } catch (err) {
      setError('Failed to fetch job details. Please try again.');
      console.error('Error fetching job:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    const { company, role, applicationDate } = formData;
    
    if (!company.trim()) {
      errors.company = 'Company name is required';
    }
    
    if (!role.trim()) {
      errors.role = 'Job role is required';
    }
    
    if (!applicationDate) {
      errors.applicationDate = 'Application date is required';
    }
    
    if (formData.link && !isValidUrl(formData.link)) {
      errors.link = 'Please enter a valid URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setError(null);
        
        if (isEdit) {
          // Update existing job
          await axios.put(`/api/jobs/${id}`, formData);
        } else {
          // Create new job
          await axios.post('/api/jobs', formData);
        }
        
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save job application. Please try again.');
        console.error('Error saving job:', err);
        setIsSubmitting(false);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <FaSpinner className="text-primary-500 text-4xl animate-spin" />
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {isEdit ? 'Edit Job Application' : 'Add New Job Application'}
      </h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="company" className="form-label">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className={`form-input pl-10 ${formErrors.company ? 'border-red-500' : ''}`}
                  placeholder="Google, Amazon, etc."
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              {formErrors.company && (
                <p className="mt-1 text-sm text-red-600">{formErrors.company}</p>
              )}
            </div>
            
            
            <div>
              <label htmlFor="role" className="form-label">
                Job Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className={`form-input pl-10 ${formErrors.role ? 'border-red-500' : ''}`}
                  placeholder="Software Engineer, Product Manager, etc."
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              {formErrors.role && (
                <p className="mt-1 text-sm text-red-600">{formErrors.role}</p>
              )}
            </div>
            
            
            <div>
              <label htmlFor="status" className="form-label">
                Application Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            
            <div>
              <label htmlFor="applicationDate" className="form-label flex items-center">
                <FaCalendarAlt className="mr-1 text-gray-500" />
                <span>Application Date</span>
              </label>
              <input
                type="date"
                id="applicationDate"
                name="applicationDate"
                className={`form-input ${formErrors.applicationDate ? 'border-red-500' : ''}`}
                value={formData.applicationDate}
                onChange={handleChange}
              />
              {formErrors.applicationDate && (
                <p className="mt-1 text-sm text-red-600">{formErrors.applicationDate}</p>
              )}
            </div>
            
            
            <div className="md:col-span-2">
              <label htmlFor="link" className="form-label">
                Job Link (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLink className="text-gray-400" />
                </div>
                <input
                  type="url"
                  id="link"
                  name="link"
                  className={`form-input pl-10 ${formErrors.link ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/job"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
              {formErrors.link && (
                <p className="mt-1 text-sm text-red-600">{formErrors.link}</p>
              )}
            </div>
            
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="form-label">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                className="form-input"
                placeholder="Add any notes about this application"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  <span>{isEdit ? 'Update Job' : 'Add Job'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm; 
