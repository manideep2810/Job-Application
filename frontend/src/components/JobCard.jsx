import { Link } from 'react-router-dom';
import { FaBuilding, FaBriefcase, FaCalendarAlt, FaLink, FaEllipsisV } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const JobCard = ({ job, onDelete, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  
  const { _id, company, role, status, applicationDate, link } = job;
  
  const formattedDate = new Date(applicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const statusClasses = {
    Applied: 'badge-applied',
    Interview: 'badge-interview',
    Offer: 'badge-offer',
    Rejected: 'badge-rejected'
  };
  
  const handleStatusChange = (newStatus) => {
    onStatusChange(_id, newStatus);
    setShowMenu(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        btnRef.current && 
        !btnRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="card mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold mb-2">{role}</h3>
        <div className="relative">
          <button 
            ref={btnRef}
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaEllipsisV className="text-gray-500" />
          </button>
          
          {showMenu && (
            <div 
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              <Link 
                to={`/job/${_id}/edit`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Application
              </Link>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <div className="px-4 py-1 text-xs text-gray-500">Change Status</div>
              {['Applied', 'Interview', 'Offer', 'Rejected'].map((statusOption) => (
                <button
                  key={statusOption}
                  className={`block w-full text-left px-4 py-2 text-sm 
                    ${status === statusOption ? 'text-primary-500 font-medium' : 'text-gray-700'} 
                    hover:bg-gray-100`}
                  onClick={() => handleStatusChange(statusOption)}
                  disabled={status === statusOption}
                >
                  {statusOption}
                </button>
              ))}
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => onDelete(_id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2">
          <FaBuilding className="mr-2" />
          <span>{company}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaBriefcase className="mr-2" />
          <span>{role}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2" />
          <span>Applied on {formattedDate}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className={`badge ${statusClasses[status]}`}>
          {status}
        </div>
        
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600 flex items-center"
          >
            <FaLink className="mr-1" />
            <span className="text-sm">View Job</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default JobCard; 