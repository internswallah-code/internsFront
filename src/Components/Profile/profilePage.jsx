import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Landmark,
  Building2,
  Brain,
  Briefcase,
  Home,
  FileText,
  PencilLine,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [postedJobs, setPostedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [postedCourses, setPostedCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [postedInternships, setPostedInternships] = useState([]);
  const [internshipsLoading, setInternshipsLoading] = useState(false);
  const [workView, setWorkView] = useState("choices");

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/profile`,
          {
            withCredentials: true,
          },
        );
        setProfile(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Fetch jobs posted by this user
  useEffect(() => {
    async function fetchMyJobs() {
      try {
        setJobsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/jobs/my`,
          {
            withCredentials: true,
          },
        );
        setPostedJobs(res.data);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        setPostedJobs([]);
      } finally {
        setJobsLoading(false);
      }
    }

    // Only fetch jobs if profile is loaded and user is authenticated
    if (profile) {
      fetchMyJobs();
    }
  }, [profile]);

  // Fetch courses listed by this user
  useEffect(() => {
    async function fetchMyCourses() {
      try {
        setCoursesLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/courses/my`,
          { withCredentials: true },
        );
        setPostedCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setPostedCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    }

    if (profile) fetchMyCourses();
  }, [profile]);

  // Fetch internships posted by this user
  useEffect(() => {
    async function fetchMyInternships() {
      try {
        setInternshipsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/internships/my`,
          { withCredentials: true },
        );
        setPostedInternships(res.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
        setPostedInternships([]);
      } finally {
        setInternshipsLoading(false);
      }
    }

    if (profile) fetchMyInternships();
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/profile`, formData, {
        withCredentials: true,
      });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatPostedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

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

  // Calculate days ago
  const getDaysAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return `${Math.ceil(diffDays / 30)} months ago`;
    } catch {
      return "Recently";
    }
  };

  // Delete job handler
  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/jobs/${jobId}`, {
          withCredentials: true,
        });
        // Remove the deleted job from state
        setPostedJobs(postedJobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
      }
    }
  };

  // Delete internship handler
  const handleDeleteInternship = async (internshipId) => {
    if (
      window.confirm("Are you sure you want to delete this internship posting?")
    ) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/internships/${internshipId}`,
          { withCredentials: true },
        );

        setPostedInternships(
          postedInternships.filter((intern) => intern._id !== internshipId),
        );

        alert("Internship deleted successfully!");
      } catch (error) {
        console.error("Error deleting internship:", error);
        alert("Failed to delete internship. Please try again.");
      }
    }
  };

  // Delete course handler
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/courses/${courseId}`,
          { withCredentials: true },
        );

        setPostedCourses(
          postedCourses.filter((course) => course._id !== courseId),
        );

        alert("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-700 text-center">
          Loading, please wait...
        </h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
        <h2 className="mt-4 text-lg font-medium text-gray-700 text-center">
          No profile data found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-4 sm:p-6 text-center space-y-4 sm:space-y-6">
            {/* Avatar + Basic Info */}
            <div>
              <img
                src={
                  profile.avatar ||
                  "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt="Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full mx-auto border-4 border-white shadow-lg"
              />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-4">
                {profile.fullName}
              </h2>
              <p className="text-gray-500 text-base sm:text-lg">
                @{profile.username || "username"}
              </p>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">
                {profile.companyType || "Your Organization"}
              </p>
            </div>

            {/* About Section */}
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center">
                <PencilLine className="inline mr-2" size={20} />
                About
              </h3>
              {editing ? (
                <textarea
                  name="about"
                  value={formData.about || ""}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write something about yourself..."
                  className="w-full border rounded-md p-2 text-gray-700 text-sm sm:text-base"
                />
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">
                  {profile.about || "Tell us about yourself."}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="w-full lg:w-2/3 space-y-4 lg:space-y-6">
            {/* Profile Details Section */}
            <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Profile Details
                </h3>
                {editing ? (
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg px-4 sm:px-6 py-2 rounded-full transition-colors"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg px-4 sm:px-6 py-2 rounded-full transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {editing ? (
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                  onSubmit={handleSave}
                >
                  {[
                    {
                      label: "Full Name",
                      name: "fullName",
                      type: "text",
                      icon: <User className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Email",
                      name: "email",
                      type: "email",
                      icon: <Mail className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Phone",
                      name: "phone",
                      type: "text",
                      icon: <Phone className="inline mr-2" size={18} />,
                    },
                    {
                      label: "City",
                      name: "city",
                      type: "text",
                      icon: <Landmark className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Company Type",
                      name: "companyType",
                      type: "text",
                      icon: <Building2 className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Work Field",
                      name: "workField",
                      type: "text",
                      icon: <Brain className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Role",
                      name: "role",
                      type: "text",
                      icon: <Briefcase className="inline mr-2" size={18} />,
                    },
                    {
                      label: "Address",
                      name: "address",
                      type: "text",
                      icon: <Home className="inline mr-2" size={18} />,
                    },
                  ].map(({ label, name, type, icon }) => (
                    <div key={name}>
                      <label className="block font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                        {icon}
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData?.[name] || ""}
                        onChange={handleChange}
                        disabled={name === "email"}
                        className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                      />
                    </div>
                  ))}
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg px-4 sm:px-6 py-2 rounded-full transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-base sm:text-lg text-gray-700">
                  <p className="break-words">
                    <User className="inline mr-2" size={18} />
                    <b>Full Name:</b> {profile.fullName || "Not provided"}
                  </p>
                  <p className="break-words">
                    <Mail className="inline mr-2" size={18} />
                    <b>Email:</b> {profile.email}
                  </p>
                  <p className="break-words">
                    <Phone className="inline mr-2" size={18} />
                    <b>Phone:</b> {profile.phone || "Not provided"}
                  </p>
                  <p className="break-words">
                    <Landmark className="inline mr-2" size={18} />
                    <b>City:</b> {profile.city || "Not specified"}
                  </p>
                  <p className="break-words">
                    <Building2 className="inline mr-2" size={18} />
                    <b>Company Type:</b>{" "}
                    {profile.companyType || "Not specified"}
                  </p>
                  <p className="break-words">
                    <Brain className="inline mr-2" size={18} />
                    <b>Work Field:</b> {profile.workField || "Not specified"}
                  </p>
                  <p className="break-words">
                    <Briefcase className="inline mr-2" size={18} />
                    <b>Role:</b> {profile.role || "Not specified"}
                  </p>
                  <p className="break-words">
                    <Home className="inline mr-2" size={18} />
                    <b>Address:</b> {profile.address || "Not specified"}
                  </p>
                </div>
              )}
            </div>

            {/* Choices Section */}
            {workView === "choices" && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-8">My Posted Work</h2>

                <div className="flex flex-col gap-5">
                  <button
                    onClick={() => setWorkView("jobs")}
                    className="w-full flex items-center justify-between py-8 px-6 rounded-xl border hover:shadow-md transition bg-gray-50 hover:bg-blue-50"
                  >
                    <div>
                      <h3 className="text-lg text-blue-700 font-semibold">
                        My Posted Jobs
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Manage your job listings
                      </p>
                    </div>
                    <span className="text-blue-600 font-semibold">→</span>
                  </button>

                  <button
                    onClick={() => setWorkView("courses")}
                    className="w-full flex items-center justify-between py-8 px-6 rounded-xl border hover:shadow-md transition bg-gray-50 hover:bg-blue-50"
                  >
                    <div>
                      <h3 className="text-lg text-blue-700 font-semibold">
                        My Listed Courses
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Manage your course listings
                      </p>
                    </div>
                    <span className="text-blue-600 font-semibold">→</span>
                  </button>

                  <button
                    onClick={() => setWorkView("internships")}
                    className="w-full flex items-center justify-between py-8 px-6 rounded-xl border hover:shadow-md transition bg-gray-50 hover:bg-blue-50"
                  >
                    <div>
                      <h3 className="text-lg text-blue-700 font-semibold">
                        My Posted Internships
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Manage your internship posts
                      </p>
                    </div>
                    <span className="text-blue-600 font-semibold">→</span>
                  </button>
                </div>
              </div>
            )}
            {/* Posted Jobs Section */}
            {workView === "jobs" && (
              <div>
                {/* YOUR EXISTING JOB CARD UI */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setWorkView("choices")}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        title="Back"
                      >
                        <ArrowLeft size={20} className="text-blue-600" />
                      </button>

                      <h3 className="text-xl sm:text-2xl font-bold flex items-center">
                        <FileText className="inline mr-2" size={22} />
                        My Posted Jobs
                      </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span className="text-sm text-gray-500 font-medium">
                        Total Jobs: {postedJobs.length}
                      </span>
                      <Link
                        to="/job-post"
                        className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Post New Job
                      </Link>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    Manage all the job postings you have created.
                  </p>

                  {jobsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : postedJobs.length > 0 ? (
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                      {postedJobs.map((job) => (
                        <div
                          key={job._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 break-words">
                                {job.jobTitle}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 break-words">
                                {job.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Link
                                to={`/job/${job._id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="View Job"
                              >
                                <Eye size={18} />
                              </Link>
                              <button
                                onClick={() => handleDeleteJob(job._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Job"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin
                                className="mr-2 flex-shrink-0"
                                size={16}
                              />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2 text-gray-600 font-semibold">
                                ₹
                              </span>
                              <span className="truncate">{job.salary}</span>
                            </div>
                            <div className="flex items-center sm:col-span-2 lg:col-span-1">
                              <Calendar
                                className="mr-2 flex-shrink-0"
                                size={16}
                              />
                              <span className="truncate">
                                {formatDate(job.postedOn)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                {job.jobType}
                              </span>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                Posted {getDaysAgo(job.postedOn)}
                              </span>
                            </div>

                            {job.skills && job.skills.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap">
                                {job.skills.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {job.skills.length > 3 && (
                                  <span className="text-xs text-gray-500 whitespace-nowrap">
                                    +{job.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">
                        You have not posted any jobs yet.
                      </p>
                      <Link
                        to="/job-post"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                      >
                        Post Your First Job
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Posted Internships Section */}
            {workView === "internships" && (
              <div>
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setWorkView("choices")}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        title="Back"
                      >
                        <ArrowLeft size={20} className="text-blue-600" />
                      </button>

                      <h3 className="text-xl sm:text-2xl font-bold flex items-center">
                        <FileText className="inline mr-2" size={22} />
                        My Posted Internships
                      </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span className="text-sm text-gray-500 font-medium">
                        Total Internships: {postedInternships.length}
                      </span>
                      <Link
                        to="/internship-post"
                        className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Post New Internship
                      </Link>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    Manage all the internships you have posted.
                  </p>

                  {internshipsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : postedInternships.length > 0 ? (
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                      {postedInternships.map((intern) => (
                        <div
                          key={intern._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 break-words">
                                {intern.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 break-words">
                                {intern.company}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Link
                                to={`/internship/${intern._id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="View Internship"
                              >
                                <Eye size={18} />
                              </Link>
                              <button
                                onClick={() =>
                                  handleDeleteInternship(intern._id)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Internship"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="mr-2" size={16} />
                              <span className="truncate">
                                {intern.location}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <span className="mr-2 text-gray-600 font-semibold">
                                ₹
                              </span>
                              <span className="truncate">
                                {intern.stipendValue}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <Calendar className="mr-2" size={16} />
                              <span className="truncate">
                                {formatDate(intern.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {intern.isRemote ? "Remote" : "Onsite"}
                              </span>

                              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {intern.isPartTime ? "Part-Time" : "Full-Time"}
                              </span>

                              <span className="text-xs text-gray-500">
                                Posted {formatPostedDate(intern.createdAt)}
                              </span>
                            </div>

                            {intern.skills && intern.skills.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap">
                                {intern.skills
                                  .slice(0, 3)
                                  .map((skill, index) => (
                                    <span
                                      key={index}
                                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                {intern.skills.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{intern.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">
                        You have not posted any internships yet.
                      </p>
                      <Link
                        to="/internship-post"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                      >
                        Post Your First Internship
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Posted Courses Section */}
            {workView === "courses" && (
              <div>
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setWorkView("choices")}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                        title="Back"
                      >
                        <ArrowLeft size={20} className="text-blue-600" />
                      </button>

                      <h3 className="text-xl sm:text-2xl font-bold flex items-center">
                        <FileText className="inline mr-2" size={22} />
                        My Listed Courses
                      </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span className="text-sm text-gray-500 font-medium">
                        Total Courses: {postedCourses.length}
                      </span>
                      <Link
                        to="/course-post"
                        className="w-full sm:w-auto text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        Post New Course
                      </Link>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-4">
                    Manage all the courses you have listed.
                  </p>

                  {coursesLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : postedCourses.length > 0 ? (
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                      {postedCourses.map((course) => (
                        <div
                          key={course._id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 break-words">
                                {course.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 break-words">
                                {course.company}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Link
                                to={`/course/${course._id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="View Course"
                              >
                                <Eye size={18} />
                              </Link>
                              <button
                                onClick={() => handleDeleteCourse(course._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Course"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="mr-2" size={16} />
                              <span className="truncate">
                                {course.location}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <span className="mr-1 font-semibold">₹</span>
                              <span className="truncate">
                                {Number(course.fees).toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <Calendar className="mr-2" size={16} />
                              <span className="truncate">
                                {formatDate(course.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {course.type}
                              </span>
                              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                Duration: {course.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">
                        You have not listed any courses yet.
                      </p>
                      <Link
                        to="/course-post"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                      >
                        Post Your First Course
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
