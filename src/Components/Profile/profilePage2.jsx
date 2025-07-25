import { useEffect, useState } from "react";
import axios from "axios";
import achievementData from "./achievementsData";
import { User, Mail, Phone, Landmark, Venus, Languages, UserCheck, FileText, PencilLine, Trophy, CheckCircle, XCircle } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function ProfilePage2() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/employee-profile`, {
          withCredentials: true,
        });
        console.log("Profile data fetched:", res.data);
        
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/employee-profile`, formData, {
        withCredentials: true,
      });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleResumeUpload = async () => {
    if (!file) return;
    setResumeUploading(true);
    setResumeMessage("");
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/employee-profile/upload-resume`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/pdf" },
        }
      );
      setResumeMessage("Resume uploaded successfully!");
      // Update profile with new resume URL
      setProfile((prev) => ({ ...prev, resume: res.data.resumeUrl }));
      setFile(null);
    } catch (error) {
      setResumeMessage("Error uploading resume.");
      console.error("Error uploading resume:", error);
    } finally {
      setResumeUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    setResumeUploading(true);
    setResumeMessage("");
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/employee-profile/delete-resume`, {
        withCredentials: true,
      });
      setResumeMessage("Resume deleted.");
      setProfile((prev) => ({ ...prev, resume: "" }));
      setFile(null);
    } catch (error) {
      setResumeMessage("Error deleting resume.");
      console.error("Error deleting resume:", error);
    } finally {
      setResumeUploading(false);
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
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-4 break-words">{profile.fullName}</h2>
              <p className="text-gray-500 text-base sm:text-lg break-words">@{profile.username || "username"}</p>
              <p className="text-gray-700 font-semibold text-base sm:text-lg break-words">
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
                <p className="text-gray-600 text-sm sm:text-base break-words">{profile.about || "Tell us about yourself."}</p>
              )}
            </div>

            {/* Achievements Section */}
            <div className="text-left w-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <Trophy className="inline mr-2" size={20} />
                Achievements
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(achievementData).map(([key, { label, value, total, color, isPercentage, isCheck }]) => {
                  const percent = isPercentage
                    ? value
                    : Math.min((value / total) * 100, 100);
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 text-sm sm:text-base font-medium break-words flex-1 mr-2">{label}</span>
                        <span className="text-gray-600 text-xs sm:text-sm flex-shrink-0">
                          {isCheck ? (
                            value === total ? (
                              <CheckCircle className="inline text-green-500" size={16} />
                            ) : (
                              <XCircle className="inline text-red-500" size={16} />
                            )
                          ) : isPercentage ? (
                            `${percent}%`
                          ) : (
                            `${value} / ${total}`
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div
                          className={`bg-${color}-500 h-2 sm:h-3 rounded-full transition-all duration-300`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="w-full lg:w-2/3 space-y-4 lg:space-y-6">
            {/* Profile Details Section */}
            <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <h3 className="text-2xl sm:text-3xl font-bold">Profile Details</h3>
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
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    ["Full Name", "fullName", "text", <User className="inline mr-2" size={18} />],
                    ["Email", "email", "email", <Mail className="inline mr-2" size={18} />],
                    ["Phone", "phone", "text", <Phone className="inline mr-2" size={18} />],
                    ["City", "city", "text", <Landmark className="inline mr-2" size={18} />],
                    ["Gender", "gender", "text", <Venus className="inline mr-2" size={18} />],
                    ["Languages", "languages", "text", <Languages className="inline mr-2" size={18} />],
                    ["Type", "type", "text", <UserCheck className="inline mr-2" size={18} />]
                  ].map(([label, name, type, icon]) => (
                    <div key={name}>
                      <label className="block font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                        {icon}
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        disabled={name === "email"}
                        className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                      />
                    </div>
                  ))}
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
                    <Venus className="inline mr-2" size={18} />
                    <b>Gender:</b> {profile.gender || "Not specified"}
                  </p>
                  <p className="break-words">
                    <Languages className="inline mr-2" size={18} />
                    <b>Languages:</b> {profile.languages || "Not specified"}
                  </p>
                  <p className="break-words">
                    <UserCheck className="inline mr-2" size={18} />
                    <b>Type:</b> {profile.type || "Not specified"}
                  </p>
                </div>
              )}
            </div>

            {/* Resume Upload Section */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center">
                <FileText className="inline mr-2" size={22} />
                Resume Upload
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3">
                Upload your resume to apply faster!
              </p>
              
              {resumeMessage && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="text-sm text-blue-600">{resumeMessage}</div>
                </div>
              )}
              
              {resumeUploading && (
                <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="text-sm text-gray-500 flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                {!profile.resume ? (
                  <>
                    <input
                      type="file"
                      accept="application/pdf"
                      id="resumeUpload"
                      className="border border-gray-300 p-2 sm:p-3 rounded-md w-full text-sm sm:text-base"
                      onChange={handleFileChange}
                      disabled={resumeUploading}
                    />
                    <button
                      onClick={handleResumeUpload}
                      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={resumeUploading || !file}
                    >
                      {resumeUploading ? "Uploading..." : "Upload Resume"}
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base transition-colors"
                      >
                        View Resume
                      </a>
                    </div>
                    <button
                      onClick={handleResumeDelete}
                      className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={resumeUploading}
                    >
                      <Trash2 className="mr-2" size={16} />
                      {resumeUploading ? "Deleting..." : "Delete Resume"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}