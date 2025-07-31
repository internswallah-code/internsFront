import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket } from "react-icons/fa"
import courses from "./Course_data"

const CourseList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Courses</h1>
          <p className="text-lg text-gray-600">Explore and enhance your skills with these curated courses</p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-500">No courses available at the moment</h2>
            <p className="text-gray-400 mt-2">Please check back later for new opportunities</p>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-[1.02] cursor-pointer border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Left Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-md mr-4 flex-shrink-0">
                        <span className="text-white text-lg font-bold">{course.company[0]}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-blue-600 font-semibold">{course.company}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-700 text-base leading-relaxed font-medium">{course.description}</p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-red-500 mr-2 flex-shrink-0" />
                        <span>{course.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRegClock className="text-blue-500 mr-2 flex-shrink-0" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="text-green-600 mr-2 flex-shrink-0" />
                        <span>{course.fees}</span>
                      </div>
                      <div className="flex items-center">
                        <FaRocket className="text-purple-600 mr-2 flex-shrink-0" />
                        <span>{course.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Button */}
                  <div className="mt-6 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                    <Link to={`/course/${index}`} className="block">
                      <button className="w-full lg:w-auto lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 active:scale-95 shadow-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList
