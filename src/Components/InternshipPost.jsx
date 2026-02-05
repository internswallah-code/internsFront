import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, X } from "lucide-react";

function InternshipPost() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      internshipTitle: "",
      skills: [],
      isRemote: false,
      isPartTime: false,
    },
  });

  const navigate = useNavigate();

  const [customSkills, setCustomSkills] = useState("");
  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  const onCustomSkillChange = (e) => {
    const value = e.target.value;
    setCustomSkills(value);

    // convert comma separated → array
    const skillsArray = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setValue("skills", skillsArray);
  };

  const showModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ show: false, type: "", message: "" });
    if (modal.type === "success") navigate("/internships");
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/internships`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok) {
        showModal("success", "Internship posted successfully!");
      } else {
        showModal("error", result.message);
      }
    } catch (err) {
      showModal("error", err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Post an Internship
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Company */}
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-1"
              >
                Company Name
              </label>

              <input
                id="company"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Company Name"
                {...register("company", {
                  required: "Company name is required.",
                })}
              />

              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="internshipTitle"
                className="block font-bold text-gray-700 mb-1"
              >
                Internship Title
              </label>

              <input
                id="internshipTitle"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Internship Title"
                {...register("title", {
                  required: "Internship title is required.",
                })}
              />

              {errors.internshipTitle && (
                <p className="text-red-500 text-sm">
                  {errors.internshipTitle.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label
                htmlFor="customSkills"
                className="block font-bold text-gray-700 mb-1"
              >
                Enter Required Skills (comma separated)
              </label>

              <input
                id="customSkills"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                placeholder="e.g. React, Node.js, SQL"
                value={customSkills}
                onChange={onCustomSkillChange}
              />

              <input
                type="hidden"
                {...register("skills", {
                  required: "Skills are required.",
                })}
              />

              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block font-bold text-gray-700 mb-1"
              >
                Location
              </label>

              <input
                id="location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Internship Location"
                {...register("location", { required: "Location is required." })}
              />

              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Stipend */}
            <div className="mb-4">
              <label
                htmlFor="stipend"
                className="block font-bold text-gray-700 mb-1"
              >
                Stipend value
              </label>

              <input
                id="stipend"
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Monthly Stipend"
                {...register("stipendValue", {
                  required: "Stipend is required.",
                })}
              />

              {errors.stipend && (
                <p className="text-red-500 text-sm">{errors.stipend.message}</p>
              )}
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block font-bold text-gray-700 mb-1"
              >
                Internship Duration
              </label>

              <input
                id="duration"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Duration (e.g. 3 months, 6 months)"
                {...register("duration", {
                  required: "Internship duration is required.",
                })}
              />

              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">
                Internship Mode
              </label>

              <div className="flex gap-6 border p-3 rounded focus-within:ring-2 focus-within:ring-blue-600">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                    {...register("isRemote")}
                  />
                  Remote Internship
                </label>

                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                    {...register("isPartTime")}
                  />
                  Part-Time
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-bold text-gray-700 mb-1"
              >
                Internship Description
              </label>

              <textarea
                id="description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
                placeholder="Enter detailed internship description"
                {...register("description", {
                  required: "Internship description is required.",
                })}
              ></textarea>

              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Post Internship
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-mx-4 mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {modal.type === "success" ? (
                  <CheckCircle className="text-blue-500 w-6 h-6 mr-2" />
                ) : (
                  <XCircle className="text-red-500 w-6 h-6 mr-2" />
                )}
                <h3
                  className={`text-lg font-semibold ${
                    modal.type === "success" ? "text-blue-700" : "text-red-700"
                  }`}
                >
                  {modal.type === "success" ? "Success!" : "Error"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">{modal.message}</p>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  modal.type === "success"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {modal.type === "success" ? "Continue" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default InternshipPost;
