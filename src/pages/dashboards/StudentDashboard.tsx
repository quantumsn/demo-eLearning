import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Clock, Trophy, TrendingUp, Calendar, FileText, Star, BarChart3, Target, Award, Activity } from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const StudentDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentOverview />} />
      <Route path="/courses" element={<StudentCourses />} />
      <Route path="/bought-courses" element={<BoughtCourses />} />
      <Route path="/course/:courseId" element={<CourseDetail />} />
      <Route path="/course/:courseId/lecture/:lectureId" element={<LectureView />} />
      <Route path="/search" element={<CourseSearch />} />
      <Route path="/schedule" element={<StudentSchedule />} />
      <Route path="/assignments" element={<StudentAssignments />} />
      <Route path="/grades" element={<StudentGrades />} />
      <Route path="/analytics" element={<StudentAnalytics />} />
    </Routes>
  );
};

const StudentOverview: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Active Courses', value: '6', color: 'blue' },
    { icon: Clock, label: 'Hours Studied', value: '42', color: 'green' },
    { icon: Trophy, label: 'Completed', value: '8', color: 'yellow' },
    { icon: TrendingUp, label: 'Average Grade', value: '87%', color: 'purple' }
  ];

  const recentCourses = [
    { id: 1, title: 'Advanced Mathematics', instructor: 'Dr. Smith', progress: 75, image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Web Development', instructor: 'John Doe', progress: 60, image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Data Science', instructor: 'Jane Wilson', progress: 90, image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Math Quiz 3', course: 'Advanced Mathematics', due: '2024-01-15', priority: 'high' },
    { id: 2, title: 'React Project', course: 'Web Development', due: '2024-01-18', priority: 'medium' },
    { id: 3, title: 'Data Analysis Report', course: 'Data Science', due: '2024-01-20', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <div className="text-sm text-gray-600">Welcome back, John!</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center space-x-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">{assignment.due}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    assignment.priority === 'high' ? 'bg-red-100 text-red-800' :
                    assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {assignment.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentCourses: React.FC = () => {
  const courses = [
    { id: 1, title: 'Advanced Mathematics', instructor: 'Dr. Smith', progress: 75, students: 120, rating: 4.8, image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, title: 'Web Development', instructor: 'John Doe', progress: 60, students: 85, rating: 4.9, image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, title: 'Data Science', instructor: 'Jane Wilson', progress: 90, students: 95, rating: 4.7, image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, title: 'Digital Marketing', instructor: 'Mike Johnson', progress: 30, students: 150, rating: 4.6, image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Browse Courses
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
              <div className="flex items-center mb-3">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                <span className="text-sm text-gray-500 ml-2">({course.students} students)</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BoughtCourses: React.FC = () => {
  const navigate = useNavigate();
  
  const boughtCourses = [
    { 
      id: 1, 
      title: 'Complete Web Development Bootcamp', 
      instructor: 'John Doe', 
      progress: 75, 
      rating: 4.8, 
      students: 12543,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '40 hours',
      lectures: 156,
      purchaseDate: '2024-01-10'
    },
    { 
      id: 2, 
      title: 'Advanced React & Redux', 
      instructor: 'Jane Smith', 
      progress: 60, 
      rating: 4.9, 
      students: 8765,
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '25 hours',
      lectures: 89,
      purchaseDate: '2024-01-08'
    },
    { 
      id: 3, 
      title: 'Python for Data Science', 
      instructor: 'Mike Johnson', 
      progress: 90, 
      rating: 4.7, 
      students: 15432,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '35 hours',
      lectures: 124,
      purchaseDate: '2024-01-05'
    },
    { 
      id: 4, 
      title: 'Digital Marketing Mastery', 
      instructor: 'Sarah Wilson', 
      progress: 30, 
      rating: 4.6, 
      students: 9876,
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '20 hours',
      lectures: 67,
      purchaseDate: '2024-01-03'
    },
    { 
      id: 5, 
      title: 'Machine Learning Fundamentals', 
      instructor: 'Dr. Anderson', 
      progress: 45, 
      rating: 4.8, 
      students: 11234,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '50 hours',
      lectures: 178,
      purchaseDate: '2024-01-01'
    },
    { 
      id: 6, 
      title: 'UI/UX Design Complete Course', 
      instructor: 'Emily Davis', 
      progress: 85, 
      rating: 4.9, 
      students: 7654,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '30 hours',
      lectures: 95,
      purchaseDate: '2023-12-28'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Bought Courses</h1>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Courses</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Not Started</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by Progress</option>
            <option>Sort by Purchase Date</option>
            <option>Sort by Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boughtCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {course.duration}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({course.students.toLocaleString()} students)</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.lectures} lectures</span>
                <span>Purchased: {course.purchaseDate}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Mock course data - in real app, this would be fetched based on courseId
  const course = {
    id: courseId,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Doe',
    rating: 4.8,
    students: 12543,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. This comprehensive course covers everything you need to become a full-stack web developer.',
    duration: '40 hours',
    lectures: 156,
    progress: 75,
    lastWatched: 'Introduction to React Hooks',
    certificate: true,
    level: 'Beginner to Advanced'
  };

  const lectures = [
    { 
      id: 1, 
      title: 'Introduction to Web Development', 
      duration: '15:30', 
      completed: true,
      section: 'Getting Started'
    },
    { 
      id: 2, 
      title: 'HTML Fundamentals', 
      duration: '25:45', 
      completed: true,
      section: 'HTML Basics'
    },
    { 
      id: 3, 
      title: 'CSS Styling and Layout', 
      duration: '32:20', 
      completed: true,
      section: 'CSS Fundamentals'
    },
    { 
      id: 4, 
      title: 'JavaScript Basics', 
      duration: '28:15', 
      completed: false,
      section: 'JavaScript'
    },
    { 
      id: 5, 
      title: 'DOM Manipulation', 
      duration: '22:30', 
      completed: false,
      section: 'JavaScript'
    },
    { 
      id: 6, 
      title: 'Introduction to React', 
      duration: '35:10', 
      completed: false,
      section: 'React Framework'
    }
  ];

  const groupedLectures = lectures.reduce((acc, lecture) => {
    if (!acc[lecture.section]) {
      acc[lecture.section] = [];
    }
    acc[lecture.section].push(lecture);
    return acc;
  }, {} as Record<string, typeof lectures>);

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{course.rating}</span>
                  <span className="text-gray-500 ml-1">({course.students.toLocaleString()} students)</span>
                </div>
                <span className="text-gray-600">{course.duration}</span>
                <span className="text-gray-600">{course.lectures} lectures</span>
                <span className="text-gray-600">{course.level}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Last watched: <span className="font-medium">{course.lastWatched}</span>
              </p>
            </div>
            
            <div className="ml-6">
              <p className="text-sm text-gray-600 mb-2">Instructor</p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{course.instructor}</p>
                  <p className="text-sm text-gray-600">Web Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h2>
          
          <div className="space-y-4">
            {Object.entries(groupedLectures).map(([section, sectionLectures]) => (
              <div key={section} className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-medium text-gray-900">{section}</h3>
                  <p className="text-sm text-gray-600">{sectionLectures.length} lectures</p>
                </div>
                <div className="divide-y">
                  {sectionLectures.map((lecture) => (
                    <div 
                      key={lecture.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      onClick={() => navigate(`/student/course/${courseId}/lecture/${lecture.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lecture.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          {lecture.completed ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{lecture.title}</p>
                          <p className="text-sm text-gray-600">{lecture.duration}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {lecture.completed ? 'Rewatch' : 'Watch'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LectureView: React.FC = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  
  // Mock lecture data
  const currentLecture = {
    id: lectureId,
    title: 'JavaScript Basics - Variables and Data Types',
    duration: '28:15',
    videoUrl: 'https://example.com/video.mp4', // In real app, this would be actual video URL
    notes: 'https://example.com/lecture-notes.pdf'
  };

  const upcomingLectures = [
    { id: 5, title: 'DOM Manipulation', duration: '22:30', thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 6, title: 'Introduction to React', duration: '35:10', thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 7, title: 'React Components', duration: '30:45', thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 8, title: 'State Management', duration: '25:20', thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=200' }
  ];

  return (
    <div className="flex gap-6 h-full">
      {/* Main Video Section */}
      <div className="flex-1 space-y-4">
        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden aspect-video">
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">Video Player</p>
              <p className="text-sm text-gray-400">Click to play: {currentLecture.title}</p>
            </div>
          </div>
        </div>

        {/* Video Controls and Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">{currentLecture.title}</h1>
            <span className="text-sm text-gray-600">{currentLecture.duration}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(`/student/course/${courseId}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Course
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Mark as Complete
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Add to Favorites
            </button>
          </div>
        </div>

        {/* Lecture Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lecture Notes</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 mb-2">Lecture Notes PDF</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Download Notes
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Upcoming Lectures */}
      <div className="w-80 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Up Next</h2>
        <div className="space-y-3">
          {upcomingLectures.map((lecture) => (
            <div 
              key={lecture.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate(`/student/course/${courseId}/lecture/${lecture.id}`)}
            >
              <img
                src={lecture.thumbnail}
                alt={lecture.title}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{lecture.title}</h3>
                <p className="text-xs text-gray-600">{lecture.duration}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            View All Lectures
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedRating, setSelectedRating] = React.useState('all');
  
  const allCourses = [
    { 
      id: 1, 
      title: 'Complete Web Development Bootcamp', 
      instructor: 'John Doe', 
      rating: 4.8, 
      students: 12543,
      price: '$89.99',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      level: 'Beginner'
    },
    { 
      id: 2, 
      title: 'Advanced React & Redux', 
      instructor: 'Jane Smith', 
      rating: 4.9, 
      students: 8765,
      price: '$79.99',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Web Development',
      level: 'Advanced'
    },
    { 
      id: 3, 
      title: 'Python for Data Science', 
      instructor: 'Mike Johnson', 
      rating: 4.7, 
      students: 15432,
      price: '$94.99',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Data Science',
      level: 'Intermediate'
    },
    { 
      id: 4, 
      title: 'Digital Marketing Mastery', 
      instructor: 'Sarah Wilson', 
      rating: 4.6, 
      students: 9876,
      price: '$69.99',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Marketing',
      level: 'Beginner'
    },
    { 
      id: 5, 
      title: 'Machine Learning Fundamentals', 
      instructor: 'Dr. Anderson', 
      rating: 4.8, 
      students: 11234,
      price: '$109.99',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Data Science',
      level: 'Advanced'
    },
    { 
      id: 6, 
      title: 'UI/UX Design Complete Course', 
      instructor: 'Emily Davis', 
      rating: 4.9, 
      students: 7654,
      price: '$84.99',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Design',
      level: 'Intermediate'
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || course.rating >= parseFloat(selectedRating);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Search Courses</h1>
        <span className="text-sm text-gray-600">{filteredCourses.length} courses found</span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search for courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
          <select 
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{course.title}</h3>
                <span className="text-lg font-bold text-blue-600 ml-2">{course.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({course.students.toLocaleString()})</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{course.level}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{course.category}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or browse all courses.</p>
        </div>
      )}
    </div>
  );
};

const StudentSchedule: React.FC = () => {
  const schedule = [
    { id: 1, time: '09:00 AM', course: 'Advanced Mathematics', instructor: 'Dr. Smith', type: 'Lecture', room: 'Room A101' },
    { id: 2, time: '11:00 AM', course: 'Web Development', instructor: 'John Doe', type: 'Lab', room: 'Computer Lab 1' },
    { id: 3, time: '02:00 PM', course: 'Data Science', instructor: 'Jane Wilson', type: 'Seminar', room: 'Room B205' },
    { id: 4, time: '04:00 PM', course: 'Digital Marketing', instructor: 'Mike Johnson', type: 'Workshop', room: 'Online' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">Today, January 15, 2024</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h2>
          <div className="space-y-4">
            {schedule.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{item.time}</div>
                    <div className="text-sm text-gray-600">{item.type}</div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.course}</h3>
                    <p className="text-sm text-gray-600">{item.instructor}</p>
                    <p className="text-sm text-gray-500">{item.room}</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Join Class
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentAssignments: React.FC = () => {
  const assignments = [
    { id: 1, title: 'Math Quiz 3', course: 'Advanced Mathematics', due: '2024-01-15', status: 'pending', priority: 'high' },
    { id: 2, title: 'React Project', course: 'Web Development', due: '2024-01-18', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Data Analysis Report', course: 'Data Science', due: '2024-01-20', status: 'pending', priority: 'low' },
    { id: 4, title: 'Marketing Campaign', course: 'Digital Marketing', due: '2024-01-22', status: 'submitted', priority: 'medium' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">{assignments.filter(a => a.status === 'pending').length} pending</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{assignment.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{assignment.due}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                      assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      assignment.priority === 'high' ? 'bg-red-100 text-red-800' :
                      assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {assignment.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    {assignment.status !== 'submitted' && (
                      <button className="text-green-600 hover:text-green-900">Submit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StudentGrades: React.FC = () => {
  const grades = [
    { id: 1, course: 'Advanced Mathematics', assignment: 'Quiz 1', grade: 'A', score: 92, total: 100, date: '2024-01-10' },
    { id: 2, course: 'Web Development', assignment: 'Project 1', grade: 'B+', score: 87, total: 100, date: '2024-01-08' },
    { id: 3, course: 'Data Science', assignment: 'Lab Report', grade: 'A-', score: 90, total: 100, date: '2024-01-05' },
    { id: 4, course: 'Digital Marketing', assignment: 'Case Study', grade: 'B', score: 83, total: 100, date: '2024-01-03' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">GPA: 3.7</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{grade.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{grade.assignment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      grade.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{grade.score}/{grade.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{grade.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StudentAnalytics: React.FC = () => {
  // Learning Progress Chart Data
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hours Studied',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Assignments Completed',
        data: [8, 12, 10, 15, 14, 18],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Course Progress Doughnut Chart
  const courseProgressData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Grade Distribution Chart
  const gradeData = {
    labels: ['A', 'B+', 'B', 'C+', 'C'],
    datasets: [
      {
        label: 'Number of Assignments',
        data: [8, 12, 6, 3, 1],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(251, 191, 36)',
          'rgb(249, 115, 22)',
          'rgb(239, 68, 68)',
        ],
      },
    ],
  };

  const learningStats = [
    { icon: Clock, label: 'Total Study Time', value: '127 hrs', change: '+12%', color: 'blue' },
    { icon: Target, label: 'Goals Achieved', value: '8/10', change: '+2', color: 'green' },
    { icon: Award, label: 'Certificates Earned', value: '3', change: '+1', color: 'yellow' },
    { icon: Activity, label: 'Learning Streak', value: '15 days', change: '+3', color: 'purple' }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3.5, assignments: 2 },
    { day: 'Tue', hours: 2.8, assignments: 1 },
    { day: 'Wed', hours: 4.2, assignments: 3 },
    { day: 'Thu', hours: 3.1, assignments: 2 },
    { day: 'Fri', hours: 2.5, assignments: 1 },
    { day: 'Sat', hours: 5.0, assignments: 4 },
    { day: 'Sun', hours: 1.8, assignments: 1 }
  ];

  const courseProgress = [
    { course: 'Advanced Mathematics', progress: 85, timeSpent: '32 hrs', lastActivity: '2 hours ago' },
    { course: 'Web Development', progress: 72, timeSpent: '28 hrs', lastActivity: '1 day ago' },
    { course: 'Data Science', progress: 94, timeSpent: '45 hrs', lastActivity: '3 hours ago' },
    { course: 'Digital Marketing', progress: 45, timeSpent: '18 hrs', lastActivity: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Progress</h1>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-600">Last 30 days</span>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
          <div className="h-64">
            <Line 
              data={progressData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Course Progress Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Progress Overview</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-48 h-48">
              <Doughnut 
                data={courseProgressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
          <div className="h-64">
            <Bar 
              data={gradeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h2>
          <div className="space-y-3">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 w-8">{day.day}</span>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{day.hours}h</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">{day.assignments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Course Progress */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Course Progress</h2>
          <div className="space-y-4">
            {courseProgress.map((course, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{course.course}</h3>
                  <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Time spent: {course.timeSpent}</span>
                  <span>Last activity: {course.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;