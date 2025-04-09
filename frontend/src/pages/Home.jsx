import { Link } from 'react-router-dom';
import { FaBriefcase, FaChartLine, FaCheckCircle, FaBell, FaFilter, FaClipboardList, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FaClipboardList className="text-purple-500 text-2xl mb-4" />,
      title: 'Track Applications',
      description: 'Keep all your job applications organized in one place with detailed status tracking.'
    },
    {
      icon: <FaChartLine className="text-purple-500 text-2xl mb-4" />,
      title: 'Monitor Progress',
      description: 'Get insights into your job search with stats on application status and response rates.'
    },
    {
      icon: <FaCheckCircle className="text-purple-500 text-2xl mb-4" />,
      title: 'Never Miss Deadlines',
      description: 'Set reminders for interviews, follow-ups, and important application milestones.'
    },
    {
      icon: <FaFilter className="text-purple-500 text-2xl mb-4" />,
      title: 'Powerful Filtering',
      description: 'Filter and search through your applications by company, role, status, and date.'
    }
  ];

  return (
    <div className="bg-white">
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-200 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="py-24 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white p-3 rounded-xl shadow-md border border-purple-100">
                  <FaBriefcase className="text-purple-600 text-4xl" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Your <span className="text-purple-600">Job Applications</span> Tracker
                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl">Simplified & Organized</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Take control of your career journey by efficiently managing all your job applications, 
                interviews, and offers in one beautiful dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="btn bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 text-lg shadow-md w-full sm:w-auto rounded-lg"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="btn bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 text-lg shadow-md w-full sm:w-auto rounded-lg"
                    >
                      Get Started — It's Free
                    </Link>
                    <Link 
                      to="/login" 
                      className="btn border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3.5 text-lg w-full sm:w-auto rounded-lg"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How JobTrack Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple yet powerful way to manage your entire job search process from application to offer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">All Your Applications in One Place</h2>
              <p className="text-lg text-gray-600 mb-6">
                JobTrack gives you a clear overview of your entire job search. Keep track of every application, interview, and follow-up in a single dashboard.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Save time with our easy application tracking',
                  'Get reminders for upcoming interviews and follow-ups',
                  'Track your application success rate with detailed analytics',
                  'Organize your job search with custom filters and tags'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-purple-500 mt-1.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={isAuthenticated ? '/dashboard' : '/register'} className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="bg-gray-100 p-3 rounded-xl shadow-md">
                
                <div className="bg-white rounded-lg p-4 shadow-inner border border-gray-200">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">Job Applications Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { company: 'Google', role: 'Frontend Developer', status: 'Interview', color: 'bg-amber-100 text-amber-800' },
                      { company: 'Microsoft', role: 'Software Engineer', status: 'Applied', color: 'bg-blue-100 text-blue-800' },
                      { company: 'Apple', role: 'UI/UX Designer', status: 'Offer', color: 'bg-emerald-100 text-emerald-800' }
                    ].map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{job.company}</div>
                          <div className="text-sm text-gray-600">{job.role}</div>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${job.color}`}>
                          {job.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to organize your job search?</h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who use JobTrack to stay organized and land their dream job faster.
          </p>
          <Link 
            to={isAuthenticated ? '/dashboard' : '/register'} 
            className="inline-block bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-medium shadow-md transition-colors duration-200"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 
