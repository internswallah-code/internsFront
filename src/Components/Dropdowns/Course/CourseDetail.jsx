import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import courses from "./Course_data";
import {
  FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket
} from "react-icons/fa";

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = Number(id || "0");
  const course = courses[courseId];

  const [appliedCourses, setAppliedCourses] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedCourses")) || {};
  });

  const isApplied = appliedCourses[id] || false;

  const applyForCourse = () => {
    const updatedAppliedCourses = { ...appliedCourses, [id]: true };
    setAppliedCourses(updatedAppliedCourses);
    localStorage.setItem("appliedCourses", JSON.stringify(updatedAppliedCourses));
  };

  if (!course) {
    return <div className="flex items-center justify-center h-screen text-2xl text-red-500">Course not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8 gap-8">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-3/4 bg-white shadow-2xl rounded-2xl p-6 md:p-8 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-4 md:mr-6">
            <span className="text-white text-xl md:text-2xl font-bold">{course.company[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">{course.title}</h2>
            <p className="text-blue-600 text-lg md:text-2xl font-semibold mt-1">{course.company}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 text-base md:text-lg border-t pt-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 md:gap-3"><FaMapMarkerAlt className="text-red-500" /> <span className="font-bold">Location:</span> {course.location}</p>
            <p className="flex items-center gap-2 md:gap-3"><FaRegClock className="text-blue-500" /> <span className="font-bold">Duration:</span> {course.duration}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 md:gap-3"><FaRupeeSign className="text-green-600" /> <span className="font-bold">Stipend:</span> ₹{course.stipend}/month</p>
            <p className="flex items-center gap-2 md:gap-3"><FaRocket className="text-purple-600" /> <span className="font-bold">Course Type:</span> {course.type}</p>
          </div>
        </div>

        {/* Eligibility & Details */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Eligibility & Details</h3>
          <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
            <li>Flexible working hours</li>
            <li>Certificate upon completion</li>
            <li>Opportunities for full-time employment</li>
            <li>Work on real-world projects</li>
          </ul>
        </div>

        {/* Apply Button */}
        <div className="mt-6 md:mt-auto">
          {isApplied ? (
            <p className="text-center text-green-600 text-xl font-bold">You have successfully applied! 🎉</p>
          ) : (
            <Link to="https://forms.gle/2vaCeRxNQjDnsoi69">
              <button
                onClick={applyForCourse}
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
        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 md:mb-6">Other Course Offers</h3>
        {courses.slice(0, 6).map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6 hover:shadow-lg transition-all transform hover:scale-105">
            <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.company}</p>
            <p className="text-xs flex items-center gap-2 text-gray-500 my-1"><FaMapMarkerAlt className="text-red-500" /> {item.location}</p>
            <p className="text-sm font-medium mb-2"><FaRupeeSign className="inline text-green-600" /> {item.stipend} / month</p>
            <Link to={`/course/${index}`}>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
