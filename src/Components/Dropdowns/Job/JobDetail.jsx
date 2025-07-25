import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket, FaCalendarAlt, FaLaptop, FaClock } from "react-icons/fa"

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [otherJobs, setOtherJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for applied status
  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || {}
  })

  // Check if this specific job has been applied
  const isApplied = appliedJobs[id] || false

  // Function to apply for the job
  const applyForJob = () => {
    const updatedAppliedJobs = { ...appliedJobs, [id]: true }
    setAppliedJobs(updatedAppliedJobs)
    localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs))
  }

  useEffect(() => {
    console.log("Requested job ID:", id)
  }, [id])

  // Fetch specific job by MongoDB _id
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        
        // Fetch the specific job by ID
        const jobResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/jobs/${id}`, {
          credentials: "include",
        })
        console.log("Job response:", jobResponse)
        
        if (!jobResponse.ok) {
          throw new Error("Job not found")
        }
        
        const jobData = await jobResponse.json()
        setJob(jobData)
        
        // Fetch all jobs for "other jobs" section
        const allJobsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/jobs`, {
          credentials: "include",
        })
        
        if (allJobsResponse.ok) {
          const allJobs = await allJobsResponse.json()
          // Filter out current job and get first 6
          const others = allJobs
            .filter(otherJob => otherJob._id !== id)
            .slice(0, 6)
          setOtherJobs(others)
        }
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <div className="text-xl sm:text-2xl text-blue-600 text-center">Loading job details...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-lg sm:text-2xl text-red-500 px-4 text-center">
        Error: {error}
      </div>
    )
  }

  // Job not found
  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen text-lg sm:text-2xl text-red-500 px-4 text-center">
        Job not found
      </div>
    )
  }

  // Skills are already an array in MongoDB
  const skillsArray = Array.isArray(job.skills) ? job.skills : []

  // Format posted date
  const formatPostedDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return "1 day"
      if (diffDays < 7) return `${diffDays} days`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`
      return `${Math.ceil(diffDays / 30)} months`
    } catch {
      return "Recently"
    }
  }

  // Determine job type based on jobType field
  const getJobType = () => {
    if (!job.jobType) return "Full-time"
    return job.jobType
  }

  // Check if job is remote or part-time based on jobType
  const isRemote = job.jobType?.toLowerCase().includes('remote')
  const isPartTime = job.jobType?.toLowerCase().includes('part-time')

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Main Job Details Section */}
          <div className="w-full xl:w-3/4">
            <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 lg:p-8 h-full">
              {/* Company Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg flex-shrink-0">
                  <span className="text-white text-lg sm:text-2xl font-bold">{job.company?.[0] || 'C'}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 break-words">{job.jobTitle}</h2>
                  <p className="text-blue-600 text-lg sm:text-xl lg:text-2xl font-semibold mt-1 sm:mt-2 break-words">{job.company}</p>
                </div>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-gray-900 text-base sm:text-lg border-t pt-4 sm:pt-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-500 text-lg sm:text-xl flex-shrink-0" /> 
                    <span className="font-bold">Location:</span> 
                    <span className="break-words">{job.location}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FaRegClock className="text-blue-500 text-lg sm:text-xl flex-shrink-0" /> 
                    <span className="font-bold">Experience:</span> 
                    <span className="break-words">{job.experience}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FaCalendarAlt className="text-purple-500 text-lg sm:text-xl flex-shrink-0" /> 
                    <span className="font-bold">Posted:</span> 
                    <span className="break-words">{formatPostedDate(job.postedOn)} ago</span>
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="flex items-center gap-3">
                    <FaRupeeSign className="text-green-600 text-lg sm:text-xl flex-shrink-0" /> 
                    <span className="font-bold">Salary:</span> 
                    <span className="break-words">{job.salary}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <FaRocket className="text-purple-600 text-lg sm:text-xl flex-shrink-0" /> 
                    <span className="font-bold">Job Type:</span> 
                    <span className="break-words">{getJobType()}</span>
                  </p>
                  {isRemote && (
                    <p className="flex items-center gap-3">
                      <FaLaptop className="text-teal-600 text-lg sm:text-xl flex-shrink-0" />
                      <span className="bg-blue-50 text-[#0a66c2] px-2 py-1 rounded-full text-sm whitespace-nowrap">
                        Remote Work Available
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="mt-6 sm:mt-8 text-gray-800">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Job Description</h3>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 whitespace-pre-wrap break-words">{job.description}</p>
              </div>

              {/* Skills */}
              <div className="mt-6 text-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {skillsArray.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium break-words"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 sm:mt-8 text-gray-800">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Eligibility & Details</h3>
                <ul className="list-disc pl-6 space-y-3 sm:space-y-4 text-base sm:text-lg">
                  <li>Flexible working hours</li>
                  <li>Certificate upon completion</li>
                  <li>Opportunities for full-time employment</li>
                  <li>Work on real-world projects</li>
                </ul>
              </div>

              {/* Apply Now Button or Success Message */}
              <div className="mt-6 sm:mt-8 pt-3">
                {isApplied ? (
                  <p className="text-center text-green-600 text-lg sm:text-xl font-bold">
                    You have successfully applied! 🎉
                  </p>
                ) : (
                  <Link to="https://forms.gle/2vaCeRxNQjDnsoi69">
                    <button
                      onClick={applyForJob}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 sm:py-4 rounded-full text-lg sm:text-xl font-extrabold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                    >
                      Apply Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Other Jobs Section */}
          <div className="w-full xl:w-1/4">
            <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">Other Job Offers</h3>
              
              {/* Mobile: Horizontal Scroll, Desktop: Vertical Scroll */}
              <div className="xl:max-h-[calc(100vh-12rem)] xl:overflow-y-auto xl:scrollbar-thin xl:scrollbar-thumb-gray-400 xl:scrollbar-track-transparent">
                <div className="flex xl:flex-col gap-4 xl:gap-6 overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0">
                  {otherJobs.map((otherJob, index) => {
                    const isOtherRemote = otherJob.jobType?.toLowerCase().includes('remote')
                    const isOtherPartTime = otherJob.jobType?.toLowerCase().includes('part-time')
                    
                    return (
                      <div
                        key={otherJob._id}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer flex-shrink-0 w-80 xl:w-full"
                      >
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 break-words">{otherJob.jobTitle}</h4>
                        <p className="text-sm text-gray-600 mb-1 break-words">{otherJob.company}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {isOtherRemote && (
                            <span className="bg-blue-50 text-[#0a66c2] text-xs px-2 py-0.5 rounded-full flex items-center whitespace-nowrap">
                              <FaLaptop className="mr-1" /> Remote
                            </span>
                          )}
                          {isOtherPartTime && (
                            <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center whitespace-nowrap">
                              <FaClock className="mr-1" /> Part-time
                            </span>
                          )}
                        </div>
                        <p className="text-xs flex items-center gap-2 text-gray-500 mb-1">
                          <FaMapMarkerAlt className="text-red-500 flex-shrink-0" /> 
                          <span className="break-words">{otherJob.location}</span>
                        </p>
                        <p className="text-sm font-medium mb-4 break-words">
                          <FaRupeeSign className="inline text-green-600" /> {otherJob.salary}
                        </p>
                        <Link to={`/job/${otherJob._id}`} className="w-full">
                          <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                            View Details
                          </button>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Show "View All Jobs" link on mobile when there are many jobs */}
              {otherJobs.length > 2 && (
                <div className="mt-4 xl:hidden">
                  <Link 
                    to="/jobs" 
                    className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    View All Jobs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail