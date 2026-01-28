import { useState, useEffect } from "react";
import internshipImage from "./images/Internships.jpg";
import MentorImage from "./images/mentor.webp";
import CourseImage from "./images/courses.png";
import AbroadImage from "./images/abroad.jpeg";
import BookImage from "./images/book.webp";
import internshipsData from "./internshipsData";
import coursesData from "./coursesData";
import "./style.css";
import Modal from "./Modal";
import intern_bg from "./images/card_bg.webp";
import job_bg from "./images/job_bg.webp";
import course_bg from "./images/course_bg.webp";
import { Link } from "react-router-dom";

const App = () => {
  // State for managing carousel index and animation control
  const [internshipIndex, setInternshipIndex] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modal, setModal] = useState(null);

  // State for dynamic jobs data
  const [jobsData, setJobsData] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  // Responsive items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
      return 4; // desktop
    }
    return 4;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const itemsPreview = 1;

  // Fetch jobs data from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jobs = await response.json();

        // Transform backend data to match frontend format
        const transformedJobs = jobs.map((job, index) => ({
          id: job._id,
          title: job.jobTitle,
          organization: job.company,
          location: job.location,
          duration: job.jobType || "Full-time",
          stipend: job.salary || "Not specified",
          views: Math.floor(Math.random() * 1000) + 100, // Random views for demo
          daysLeft: Math.floor(Math.random() * 30) + 1, // Random days left for demo
          skills: job.skills,
          experience: job.experience,
          postedOn: job.postedOn,
          description: job.description || job.desecription, // Handle typo in schema
        }));

        setJobsData(transformedJobs);
        setJobsError(null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobsError("Failed to load jobs. Please try again later.");
        setJobsData([]);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Handlers for navigation with delay and animation
  const handleInternshipPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.max(prevIndex - itemsPreview, 0),
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleInternshipNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.min(
            prevIndex + itemsPreview,
            internshipsData.length - itemsPerPage,
          ),
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handlers for navigation (Jobs)
  const handleJobPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setJobIndex((prevIndex) => Math.max(prevIndex - itemsPreview, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleJobNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setJobIndex((prevIndex) =>
          Math.min(prevIndex + itemsPreview, jobsData.length - itemsPerPage),
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handlers for navigation (Courses)
  const handleCoursePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCourseIndex((prevIndex) => Math.max(prevIndex - itemsPreview, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCourseNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCourseIndex((prevIndex) =>
          Math.min(prevIndex + itemsPreview, coursesData.length - itemsPerPage),
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get the visible items
  const visibleInternships = internshipsData.slice(
    internshipIndex,
    internshipIndex + itemsPerPage,
  );
  const visibleJobs = jobsData.slice(jobIndex, jobIndex + itemsPerPage);
  const visibleCourses = coursesData.slice(
    courseIndex,
    courseIndex + itemsPerPage,
  );

  return (
    <div className="flex flex-col items-center p-3 sm:p-5">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-10 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
          InternsWallah
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-2 text-blue-600">
          Where Opportunity Finds Talent
        </h2>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto">
          Explore opportunities from across the globe to grow, showcase skills,
          gain CV points, and get hired by your dream company.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-10 w-full max-w-6xl px-4">
        {/* Internships Card */}
        <Link
          to="/internships"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src={internshipImage}
            alt="Internships"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-base sm:text-lg font-bold">Internships</h3>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Gain Practical Experience
            </p>
          </div>
        </Link>

        {/* Mentorship Card */}
        <Link
          to="/mentor"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src={MentorImage}
            alt="Mentorship"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-base sm:text-lg font-bold">Mentorships</h3>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Guidance From Top Mentors
            </p>
          </div>
        </Link>

        {/* Jobs Card */}
        <Link
          to="/jobs"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src="https://eduauraapublic.s3.ap-south-1.amazonaws.com/webassets/images/blogs/highest-paying-jobs-in-india.jpg"
            alt="Jobs"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-base sm:text-lg font-bold">Jobs</h3>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Explore Diverse Careers
            </p>
          </div>
        </Link>

        {/* Courses Card */}
        <Link
          to="/courses"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src={CourseImage}
            alt="Courses"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-base sm:text-lg font-bold">Courses</h3>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Explore Fresh Courses
            </p>
          </div>
        </Link>

        {/* Study Abroad Card */}
        <Link
          to="/abroad"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src={AbroadImage}
            alt="Abroad"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-base sm:text-lg font-bold">Study Abroad</h3>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Enhance Your Skills
            </p>
          </div>
        </Link>

        {/* Counselling Card */}
        <Link
          to="/book"
          className="relative p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-40 sm:h-48 rounded-xl overflow-hidden"
        >
          <img
            src={BookImage}
            alt="More"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              Book a Free
            </p>
            <p className="text-sm sm:text-lg font-bold text-center px-2">
              1:1 Counselling Session
            </p>
          </div>
        </Link>
      </div>

      {/* Latest Internships Section */}
      <div className="w-full text-center mb-6 sm:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">
          Fresh Internships
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {visibleInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              {/* Top Section with Gradient and Icon */}
              <div
                className="relative w-full h-24 sm:h-28 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${intern_bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-lg sm:text-2xl font-bold text-center px-2">
                  {internship.title}
                </h3>
              </div>

              {/* Main Content */}
              <div className="p-3 sm:p-5">
                {/* Organization Name */}
                <p className="text-gray-700 text-base sm:text-lg font-medium mb-3">
                  {internship.organization}
                </p>

                {/* Metadata Section */}
                <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">📍</span>
                    <p className="truncate">{internship.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🕒</span>
                    <p>{internship.duration}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">💰</span>
                    <p>{internship.stipend}</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-3">
                  <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span>👁️ {internship.views} Views</span>
                    <span>⏳ {internship.daysLeft} Days Left</span>
                  </div>
                  <button
                    className="px-3 sm:px-4 py-2 bg-[#0a66c2] badge text-white text-xs sm:text-sm font-semibold rounded-full hover:opacity-90 transition w-full sm:w-auto"
                    onClick={() => setModal(internship)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
            onClick={handleInternshipPrev}
            disabled={internshipIndex === 0}
          >
            &larr;
          </button>
          <button
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
            onClick={handleInternshipNext}
            disabled={internshipIndex + itemsPerPage >= internshipsData.length}
          >
            &rarr;
          </button>
        </div>
      </div>
      <Modal internship={modal} onClose={() => setModal(null)} />

      {/* Latest Jobs Section - Now Dynamic */}
      <div className="w-full text-center mb-6 sm:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">Fresh Jobs</h2>

        {/* Loading State */}
        {jobsLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        )}

        {/* Error State */}
        {jobsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600">{jobsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Jobs State */}
        {!jobsLoading && !jobsError && jobsData.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-600 text-lg">
              No jobs available at the moment.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later for new opportunities!
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        {!jobsLoading && !jobsError && jobsData.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
              {visibleJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  {/* Top Section with Gradient and Icon */}
                  <div
                    className="relative w-full h-24 sm:h-28 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${job_bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <h3 className="z-10 text-white text-lg sm:text-2xl font-bold text-center px-2">
                      {job.title}
                    </h3>
                  </div>

                  {/* Main Content */}
                  <div className="p-3 sm:p-5">
                    {/* Organization Name */}
                    <p className="text-gray-700 text-base sm:text-lg font-medium mb-3">
                      {job.organization}
                    </p>

                    {/* Metadata Section */}
                    <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-500">📍</span>
                        <p className="truncate">{job.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">🕒</span>
                        <p>{job.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">💰</span>
                        <p>{job.stipend}</p>
                      </div>
                    </div>

                    {/* Skills Tags */}

                    {/* Bottom Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-3">
                      <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-3">
                        <span>👁️ {job.views} Views</span>
                        <span>⏳ {job.daysLeft} Days Left</span>
                      </div>
                      <Link to={`/job/${job.id}`}>
                        <button className="px-3 sm:px-4 py-2 bg-[#0a66c2] badge text-white text-xs sm:text-sm font-semibold rounded-full hover:opacity-90 transition w-full sm:w-auto">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-2 mt-5">
              <button
                className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
                onClick={handleJobPrev}
                disabled={jobIndex === 0}
              >
                &larr;
              </button>
              <button
                className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
                onClick={handleJobNext}
                disabled={jobIndex + itemsPerPage >= jobsData.length}
              >
                &rarr;
              </button>
            </div>
          </>
        )}
      </div>
      <Modal internship={modal} onClose={() => setModal(null)} />

      {/* Latest Courses Section */}
      <div className="w-full text-center mb-6 sm:mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">Kickstart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {visibleCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              {/* Top Section with Gradient and Icon */}
              <div
                className="relative w-full h-24 sm:h-28 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${course_bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-lg sm:text-2xl font-bold text-center px-2">
                  {course.title}
                </h3>
              </div>

              {/* Main Content */}
              <div className="p-3 sm:p-5">
                {/* Organization Name */}
                <p className="text-gray-700 text-base sm:text-lg font-medium mb-3">
                  {course.organization}
                </p>

                {/* Metadata Section */}
                <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">📍</span>
                    <p className="truncate">{course.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🕒</span>
                    <p>{course.duration}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">💰</span>
                    <p>{course.stipend}</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-3">
                  <div className="text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <span>👁️ {course.views} Views</span>
                    <span>⏳ {course.daysLeft} Days Left</span>
                  </div>
                  <button
                    className="px-3 sm:px-4 py-2 bg-[#0a66c2] badge text-white text-xs sm:text-sm font-semibold rounded-full hover:opacity-90 transition w-full sm:w-auto"
                    onClick={() => setModal(course)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
            onClick={handleCoursePrev}
            disabled={courseIndex === 0}
          >
            &larr;
          </button>
          <button
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg sm:text-xl"
            onClick={handleCourseNext}
            disabled={courseIndex + itemsPerPage >= coursesData.length}
          >
            &rarr;
          </button>
        </div>
      </div>
      <Modal internship={modal} onClose={() => setModal(null)} />
    </div>
  );
};

export default App;
