import { Link } from 'react-router-dom';
import { FaBuilding, FaBriefcase, FaCalendarAlt, FaLink, FaEllipsisH, FaEdit, FaExchangeAlt, FaTrashAlt } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const JobCard = ({ job, onDelete, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  
  const { _id, company, role, status, applicationDate, link, notes } = job;
  
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
  
  const statusIcons = {
    Applied: '📝',
    Interview: '🗣️',
    Offer: '🎉',
    Rejected: '❌'
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
    <div className="card">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 text-primary-700 border border-primary-100">
            <FaBuilding className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{role}</h3>
            <p className="text-gray-600 text-sm mt-1 mb-1">{company}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            ref={btnRef}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menu"
          >
            <FaEllipsisH />
          </button>
          
          {showMenu && (
            <div 
              ref={menuRef}
              className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-100"
            >
              <Link 
                to={`/job/${_id}/edit`}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <FaEdit className="text-gray-400 mr-2" />
                <span>Edit Application</span>
              </Link>
              
              <div className="border-t border-gray-100"></div>
              
              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">Change Status</div>
              {['Applied', 'Interview', 'Offer', 'Rejected'].map((statusOption) => (
                <button
                  key={statusOption}
                  className={`flex items-center w-full text-left px-4 py-2.5 text-sm 
                    ${status === statusOption ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleStatusChange(statusOption)}
                  disabled={status === statusOption}
                >
                  <span className="mr-2">{statusIcons[statusOption]}</span>
                  <span>{statusOption}</span>
                  {status === statusOption && (
                    <span className="ml-auto bg-primary-100 rounded-full w-2 h-2"></span>
                  )}
                </button>
              ))}
              
              <div className="border-t border-gray-100"></div>
              
              <button
                className="flex items-center w-full text-left px-4 py-3 text-sm text-rose-600 hover:bg-rose-50"
                onClick={() => onDelete(_id)}
              >
                <FaTrashAlt className="mr-2" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 mb-4 flex flex-col space-y-2">
        <div className="flex items-center text-gray-600 text-sm">
          <FaCalendarAlt className="mr-2 text-gray-400" />
          <span>Applied on {formattedDate}</span>
        </div>
        
        {notes && notes.trim() && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-2 border-gray-300">
            {notes.length > 120 ? `${notes.substring(0, 120)}...` : notes}
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className={`badge ${statusClasses[status]}`}>
          <span className="mr-1">{statusIcons[status]}</span>
          <span>{status}</span>
        </div>
        
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
          >
            <FaLink className="mr-1" />
            <span>View Listing</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default JobCard; 