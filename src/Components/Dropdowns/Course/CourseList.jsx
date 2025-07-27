import React from "react"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket } from "react-icons/fa"
import courses from "./Course_data"

const CourseList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200"
              >
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-md mr-4">
                    <span className="text-white text-lg font-bold">{course.company[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                    <p className="text-blue-600 font-semibold">{course.company}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    {course.location}
                  </p>
                  <p className="flex items-center">
                    <FaRegClock className="text-blue-500 mr-2" />
                    {course.duration}
                  </p>
                  <p className="flex items-center">
                    <FaRupeeSign className="text-green-600 mr-2" />
                    ₹{course.stipend}/month
                  </p>
                  <p className="flex items-center">
                    <FaRocket className="text-purple-600 mr-2" />
                    {course.type}
                  </p>
                </div>

                {/* Button */}
                <Link to={`/course/${index}`} className="block">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 active:scale-95">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList
