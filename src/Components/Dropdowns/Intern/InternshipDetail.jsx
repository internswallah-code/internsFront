import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import internships from "./Internship_data";
import {
  FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket, FaCalendarAlt, FaLaptop, FaClock
} from "react-icons/fa";

const InternshipDetail = () => {
  const { id } = useParams();
  const internshipId = Number.parseInt(id || "0");
  const internship = internships[internshipId];

  const [appliedInternships, setAppliedInternships] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedInternships")) || {};
  });

  const isApplied = appliedInternships[id] || false;

  const applyForInternship = () => {
    const updatedAppliedInternships = { ...appliedInternships, [id]: true };
    setAppliedInternships(updatedAppliedInternships);
    localStorage.setItem("appliedInternships", JSON.stringify(updatedAppliedInternships));
  };

  if (!internship) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-red-500">
        Internship not found
      </div>
    );
  }

  const getInternshipType = () => {
    if (internship.isRemote && internship.isPartTime) return "Remote, Part-time";
    if (internship.isRemote) return "Remote";
    if (internship.isPartTime) return "Part-time";
    return "Full-time";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8 gap-8">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-3/4 bg-white shadow-2xl rounded-2xl p-6 md:p-8 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-4 md:mr-6">
            <span className="text-white text-xl md:text-2xl font-bold">{internship.company[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">{internship.title}</h2>
            <p className="text-blue-600 text-lg md:text-2xl font-semibold mt-1">{internship.company}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 text-base md:text-lg border-t pt-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> <span className="font-bold">Location:</span> {internship.location}</p>
            <p className="flex items-center gap-2"><FaRegClock className="text-blue-500" /> <span className="font-bold">Duration:</span> {internship.duration}</p>
            <p className="flex items-center gap-2"><FaCalendarAlt className="text-purple-500" /> <span className="font-bold">Posted:</span> {internship.posted} ago</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2"><FaRupeeSign className="text-green-600" /> <span className="font-bold">Stipend:</span> ₹{internship.stipend}/month</p>
            <p className="flex items-center gap-2"><FaRocket className="text-purple-600" /> <span className="font-bold">Internship Type:</span> {getInternshipType()}</p>
            {internship.isRemote && (
              <p className="flex items-center gap-2">
                <FaLaptop className="text-teal-600" /> 
                <span className="bg-blue-50 text-[#0a66c2] px-2 py-1 rounded-full text-sm">Remote Work Available</span>
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Skills Required</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {internship.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Description</h3>
          <p className="text-base md:text-lg">{internship.description}</p>
        </div>

        {/* Eligibility */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Eligibility & Details</h3>
          <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
            <li>Flexible working hours</li>
            <li>Certificate upon completion</li>
            <li>Opportunities for full-time employment</li>
            <li>Work on real-world projects</li>
            {internship.isRemote && <li>Remote work available</li>}
            {internship.isPartTime && <li>Part-time option available</li>}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-6 md:mt-auto">
          {isApplied ? (
            <p className="text-center text-green-600 text-xl font-bold">You have successfully applied! 🎉</p>
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

      {/* Right Section */}
      <div className="w-full md:w-1/4 bg-white shadow-2xl rounded-2xl p-4 md:p-6 overflow-y-auto h-full">
        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6">
          Other Internship Offers
        </h3>
        {internships.slice(0, 6).map((otherInternship, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 transition-all transform hover:scale-105 hover:shadow-xl"
          >
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{otherInternship.title}</h4>
            <p className="text-sm text-gray-600">{otherInternship.company}</p>
            <p className="text-xs flex items-center gap-2 text-gray-500 my-1">
              <FaMapMarkerAlt className="text-red-500" /> {otherInternship.location}
            </p>
            <p className="text-sm font-medium mb-2">
              <FaRupeeSign className="inline text-green-600" /> {otherInternship.stipend} / month
            </p>
            <Link to={`/internship/${index}`}>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipDetail;
