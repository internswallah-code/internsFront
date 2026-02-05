import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRegClock,
  FaRupeeSign,
  FaRocket,
  FaCalendarAlt,
  FaLaptop,
} from "react-icons/fa";

const InternshipDetail = () => {
  const { id } = useParams();

  const [internship, setInternship] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [appliedInternships, setAppliedInternships] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedInternships")) || {};
  });

  const isApplied = appliedInternships[id] || false;

  const applyForInternship = () => {
    const updated = { ...appliedInternships, [id]: true };
    setAppliedInternships(updated);
    localStorage.setItem("appliedInternships", JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailRes, listRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/internships/${id}`),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/internships`),
        ]);

        const detailData = await detailRes.json();
        const listData = await listRes.json();

        setInternship(detailData);
        setInternships(listData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatPostedDate = (dateString) => {
    try {
      const diffDays = Math.floor(
        (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24),
      );

      if (diffDays < 1) return "Today";
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;

      const weeks = Math.floor(diffDays / 7);
      if (weeks === 1) return "1 week ago";
      if (weeks < 4) return `${weeks} weeks ago`;

      const months = Math.floor(diffDays / 30);
      if (months === 1) return "1 month ago";
      if (months < 12) return `${months} months ago`;

      const years = Math.floor(diffDays / 365);
      if (years === 1) return "1 year ago";
      return `${years} years ago`;
    } catch {
      return "Recently posted";
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-xl">Loading...</div>;
  }

  if (!internship) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-red-500">
        Internship not found
      </div>
    );
  }

  const getInternshipType = () => {
    if (internship.isRemote && internship.isPartTime)
      return "Remote, Part-time";
    if (internship.isRemote) return "Remote";
    if (internship.isPartTime) return "Part-time";
    return "Full-time";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8 gap-8">
      {/* LEFT */}
      <div className="w-full xl:w-3/4 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 h-full mb-8 xl:mb-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-4 md:mr-6">
            <span className="text-white text-xl md:text-2xl font-bold">
              {internship.company[0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">
              {internship.title}
            </h2>
            <p className="text-blue-600 text-lg md:text-2xl font-semibold mt-1">
              {internship.company}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 text-base md:text-lg border-t pt-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 md:gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <b>Location:</b> {internship.location}
            </p>

            <p className="flex items-center gap-2 md:gap-3">
              <FaRegClock className="text-blue-500" />
              <b>Duration:</b> {internship.duration}
            </p>

            <p className="flex items-center gap-2 md:gap-3">
              <FaCalendarAlt className="text-purple-500" />
              <b>Posted:</b> {formatPostedDate(internship.createdAt)}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 md:gap-3">
              <FaRupeeSign className="text-green-600" />
              <b>Stipend:</b> ₹{internship.stipendValue}
            </p>

            <p className="flex items-center gap-2 md:gap-3">
              <FaRocket className="text-purple-600" />
              <b>Type:</b> {getInternshipType()}
            </p>

            {internship.isRemote && (
              <p className="flex items-center gap-2 md:gap-3">
                <FaLaptop className="text-teal-600" />
                Remote Work Available
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Skills Required
          </h3>
          <div className="flex flex-wrap gap-2">
            {internship.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Description</h3>
          <p className="text-base md:text-lg">{internship.description}</p>
        </div>

        {/* Apply */}
        <div className="mt-8">
          {isApplied ? (
            <p className="text-center text-green-600 text-xl font-bold">
              You have successfully applied! 🎉
            </p>
          ) : (
            <Link to="https://forms.gle/2vaCeRxNQjDnsoi69">
              <button
                onClick={applyForInternship}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-full text-lg md:text-xl font-extrabold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                Apply Now
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/4 bg-white shadow-2xl rounded-2xl p-6 xl:h-screen xl:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">
          Other Internship Offers
        </h3>

        <div className="flex xl:flex-col gap-4 overflow-x-auto xl:overflow-x-visible pb-4 xl:pb-0">
          {internships.map((j) => (
            <div
              key={j._id}
              className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg shadow-lg min-w-[260px] xl:min-w-0 hover:scale-105 hover:shadow-xl transition-all transform"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {j.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1">{j.company}</p>

              <Link to={`/internship/${j._id}`}>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
