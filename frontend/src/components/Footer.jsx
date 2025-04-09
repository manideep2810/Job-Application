import { FaBriefcase, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <FaBriefcase className="text-primary-400 text-2xl mr-2" />
            <span className="font-heading font-bold text-xl">JobTrack</span>
          </div>
          
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="text-gray-300">
              Keep track of your job applications in one place.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {year} JobTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 