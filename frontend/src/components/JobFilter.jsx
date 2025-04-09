import { useState } from 'react';
import { FaFilter, FaSearch, FaCalendarAlt } from 'react-icons/fa';

const JobFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    searchTerm: '',
    startDate: '',
    endDate: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const clearFilters = () => {
    const resetFilters = {
      status: '',
      searchTerm: '',
      startDate: '',
      endDate: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-grow mb-4 md:mb-0 md:mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by company or role..."
            className="form-input pl-10"
            value={filters.searchTerm}
            onChange={handleInputChange}
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          type="button"
          className="btn btn-outline flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter className="mr-2" />
          <span>Filters</span>
          {(filters.status || filters.startDate || filters.endDate) && (
            <span className="ml-2 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {[filters.status, filters.startDate, filters.endDate].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="form-label">
                Application Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={filters.status}
                onChange={handleInputChange}
              >
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Date Range - Start */}
            <div>
              <label htmlFor="startDate" className="form-label flex items-center">
                <FaCalendarAlt className="mr-1 text-gray-500" />
                <span>From Date</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="form-input"
                value={filters.startDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Date Range - End */}
            <div>
              <label htmlFor="endDate" className="form-label flex items-center">
                <FaCalendarAlt className="mr-1 text-gray-500" />
                <span>To Date</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-input"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter; 