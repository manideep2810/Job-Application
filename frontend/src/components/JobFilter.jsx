import { useState } from 'react';
import { FaFilter, FaSearch, FaCalendarAlt, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

  const activeFilterCount = [filters.status, filters.startDate, filters.endDate].filter(Boolean).length;
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by company or role..."
            className="form-input pl-11 py-2.5 bg-white rounded-lg shadow-sm"
            value={filters.searchTerm}
            onChange={handleInputChange}
          />
          {filters.searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => {
                const updatedFilters = { ...filters, searchTerm: '' };
                setFilters(updatedFilters);
                onFilterChange(updatedFilters);
              }}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <button
          type="button"
          className={`btn ${isOpen ? 'bg-primary-50 text-primary-700 border-primary-200' : 'btn-outline'} flex items-center whitespace-nowrap px-4`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter className="mr-2" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
          {isOpen ? (
            <FaChevronUp className="ml-2 text-xs" />
          ) : (
            <FaChevronDown className="ml-2 text-xs" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 p-5 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="status" className="form-label flex items-center">
                <span className="text-primary-600 mr-2">●</span>
                <span>Application Status</span>
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

            <div>
              <label htmlFor="startDate" className="form-label flex items-center">
                <FaCalendarAlt className="mr-2 text-primary-600" />
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

            <div>
              <label htmlFor="endDate" className="form-label flex items-center">
                <FaCalendarAlt className="mr-2 text-primary-600" />
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

          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {activeFilterCount > 0 ? (
                <>
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {filters.status && (
                    <span className="inline-flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {filters.status}
                      <button
                        type="button"
                        className="ml-2 text-primary-500 hover:text-primary-700"
                        onClick={() => {
                          const updatedFilters = { ...filters, status: '' };
                          setFilters(updatedFilters);
                          onFilterChange(updatedFilters);
                        }}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                  {filters.startDate && (
                    <span className="inline-flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                      From: {new Date(filters.startDate).toLocaleDateString()}
                      <button
                        type="button"
                        className="ml-2 text-primary-500 hover:text-primary-700"
                        onClick={() => {
                          const updatedFilters = { ...filters, startDate: '' };
                          setFilters(updatedFilters);
                          onFilterChange(updatedFilters);
                        }}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                  {filters.endDate && (
                    <span className="inline-flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                      To: {new Date(filters.endDate).toLocaleDateString()}
                      <button
                        type="button"
                        className="ml-2 text-primary-500 hover:text-primary-700"
                        onClick={() => {
                          const updatedFilters = { ...filters, endDate: '' };
                          setFilters(updatedFilters);
                          onFilterChange(updatedFilters);
                        }}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-500">No active filters</span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter; 
