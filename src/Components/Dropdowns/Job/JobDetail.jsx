import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket,
  FaCalendarAlt, FaLaptop, FaClock
} from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || {};
  });

  const isApplied = appliedJobs[id] || false;

  const applyForJob = () => {
    const updatedAppliedJobs = { ...appliedJobs, [id]: true };
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const jobRes = await fetch(`${import.meta.env.VITE_BASE_URL}/jobs/${id}`, {
          credentials: "include"
        });
        if (!jobRes.ok) throw new Error("Job not found");
        const jobData = await jobRes.json();
        setJob(jobData);

        const allJobsRes = await fetch(`${import.meta.env.VITE_BASE_URL}/jobs`, {
          credentials: "include"
        });
        if (allJobsRes.ok) {
          const allJobs = await allJobsRes.json();
          const others = allJobs.filter(j => j._id !== id).slice(0, 6);
          setOtherJobs(others);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const formatPostedDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const diff = Math.abs(new Date() - date);
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (days === 1) return "1 day";
      if (days < 7) return `${days} days`;
      if (days < 30) return `${Math.ceil(days / 7)} weeks`;
      return `${Math.ceil(days / 30)} months`;
    } catch {
      return "Recently";
    }
  };

  const getJobType = () => job.jobType || "Full-time";

  const isRemote = job?.jobType?.toLowerCase().includes("remote");
  const isPartTime = job?.jobType?.toLowerCase().includes("part-time");

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center h-screen flex items-center justify-center">{error}</div>;
  if (!job) return <div className="text-red-500 text-center h-screen flex items-center justify-center">Job not found</div>;

  const skillsArray = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-6 xl:flex gap-8">
      {/* Left Section */}
      <div className="w-full xl:w-3/4 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 h-full mb-8 xl:mb-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Company Header */}
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-4 sm:mr-6">
            <span className="text-white text-xl sm:text-2xl font-bold">{job.company?.[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">{job.jobTitle}</h2>
            <p className="text-blue-600 text-lg sm:text-2xl font-semibold mt-1">{job.company}</p>
          </div>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-gray-900 text-base sm:text-lg">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-red-500" /><strong>Location:</strong> {job.location}</p>
            <p className="flex items-center gap-3"><FaRegClock className="text-blue-500" /><strong>Experience:</strong> {job.experience}</p>
            <p className="flex items-center gap-3"><FaCalendarAlt className="text-purple-500" /><strong>Posted:</strong> {formatPostedDate(job.postedOn)} ago</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3"><FaRupeeSign className="text-green-600" /><strong>Salary:</strong> {job.salary}</p>
            <p className="flex items-center gap-3"><FaRocket className="text-purple-600" /><strong>Job Type:</strong> {getJobType()}</p>
            {isRemote && <p className="flex items-center gap-3"><FaLaptop className="text-teal-600" /><span className="bg-blue-50 text-[#0a66c2] px-2 py-1 rounded-full text-sm">Remote Work Available</span></p>}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Description</h3>
          <p className="text-base sm:text-lg whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Additional Details */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Eligibility & Details</h3>
          <ul className="list-disc pl-6 space-y-3 text-base sm:text-lg">
            <li>Flexible working hours</li>
            <li>Certificate upon completion</li>
            <li>Opportunities for full-time employment</li>
            <li>Work on real-world projects</li>
            {isRemote && <li>Remote work available</li>}
            {isPartTime && <li>Part-time option available</li>}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-8 pt-3">
          {isApplied ? (
            <p className="text-center text-green-600 text-xl font-bold">
              You have successfully applied! 🎉
            </p>
          ) : (
            <Link to="https://forms.gle/2vaCeRxNQjDnsoi69">
              <button
                onClick={applyForJob}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-full text-xl font-extrabold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                Apply Now
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Right Section - Other Jobs */}
      <div className="w-full xl:w-1/4 bg-white shadow-2xl rounded-2xl p-6 xl:h-screen xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Other Job Offers</h3>
        <div className="flex xl:flex-col gap-4 overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0">
          {otherJobs.map((j) => (
            <div key={j._id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-lg min-w-[260px] xl:min-w-0 hover:scale-105 hover:shadow-xl transition-all transform">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{j.jobTitle}</h4>
              <p className="text-sm text-gray-600 mb-1">{j.company}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {j.jobType?.toLowerCase().includes("remote") && (
                  <span className="bg-blue-50 text-[#0a66c2] text-xs px-2 py-0.5 rounded-full flex items-center">
                    <FaLaptop className="mr-1" /> Remote
                  </span>
                )}
                {j.jobType?.toLowerCase().includes("part-time") && (
                  <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <FaClock className="mr-1" /> Part-time
                  </span>
                )}
              </div>
              <p className="text-xs flex items-center gap-2 text-gray-500 mb-1">
                <FaMapMarkerAlt className="text-red-500" /> {j.location}
              </p>
              <p className="text-sm font-medium mb-4">
                <FaRupeeSign className="inline text-green-600" /> {j.salary}
              </p>
              <Link to={`/job/${j._id}`}>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

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
  );
};

export default JobDetail;
