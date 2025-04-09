import { FaBriefcase, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <FaBriefcase className="text-primary-500 text-2xl mr-2" />
            <span className="font-heading font-bold text-xl text-gray-900">JobTrack</span>
          </div>
          
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="text-gray-600 text-sm">
              Keep track of your job applications in one place.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-full"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            &copy; {year} JobTrack. Made with <FaHeart className="text-primary-500" /> by Your Name
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 