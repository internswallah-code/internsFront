import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt } from "react-icons/fa"
import internshipData from "../Intern/Internship_data"

const InternshipList = () => {
  const [internships, setInternships] = useState([])

  useEffect(() => {
    setInternships(internshipData)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Internships</h1>
          <p className="text-lg text-gray-600">Find your dream internship from our latest postings</p>
        </div>

        {internships.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-500">No internships available at the moment</h2>
            <p className="text-gray-400 mt-2">Please check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((intern, index) => {
              const skills = Array.isArray(intern.skills)
                ? intern.skills
                : (intern.skills || "").split(",")

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200"
                >
                  {/* Company Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-md mr-4">
                      <span className="text-white text-lg font-bold">{intern.company?.[0] || "C"}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{intern.title}</h3>
                      <p className="text-blue-600 font-semibold">{intern.company}</p>
                    </div>
                  </div>

                  {/* Internship Type Badge */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {intern.type}
                    </span>
                  </div>

                  {/* Internship Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      {intern.location}
                    </p>
                    <p className="flex items-center">
                      <FaRupeeSign className="text-green-600 mr-2" />
                      {intern.stipend}
                    </p>
                    <p className="flex items-center">
                      <FaCalendarAlt className="text-purple-500 mr-2" />
                      {intern.posted}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/internship/${index}`} className="block">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 active:scale-95">
                      View Details
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default InternshipList
