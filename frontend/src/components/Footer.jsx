import { FaBriefcase, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-700 text-white border-t border-primary-800">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <FaBriefcase className="text-white text-2xl mr-2" />
            <span className="font-heading font-bold text-xl text-white">JobTrack</span>
          </div>
          
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="text-primary-100 text-sm">
              Keep track of your job applications in one place.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-200 hover:text-white transition-colors p-2 hover:bg-primary-600 rounded-full"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-200 hover:text-white transition-colors p-2 hover:bg-primary-600 rounded-full"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-600 text-center text-primary-200 text-sm">
          <p className="flex items-center justify-center gap-1">
            &copy; {year} JobTrack. Made with <FaHeart className="text-primary-300" /> by Manideep
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
