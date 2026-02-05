import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, X } from "lucide-react";

function CoursePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      company: "",
      description: "",
      location: "",
      duration: "",
      fees: "",
      type: "",
    },
  });

  const navigate = useNavigate();

  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  const showModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ show: false, type: "", message: "" });
    if (modal.type === "success") {
      navigate("/courses");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok) {
        showModal("success", "Course posted successfully!");
      } else {
        showModal("error", `Failed to post course: ${result.message}`);
      }
    } catch (err) {
      showModal("error", `Error: ${err.message}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            List your Course
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                htmlFor="title"
                className="block font-bold text-gray-700 mb-1"
              >
                Course Title
              </label>

              <input
                id="title"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Course Title"
                {...register("title", {
                  required: "Course title is required.",
                })}
              />

              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

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
                placeholder="Enter Location"
                {...register("location", { required: "Location is required." })}
              />

              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="fees"
                className="block font-bold text-gray-700 mb-1"
              >
                Course Fees
              </label>

              <input
                id="fees"
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Course Fees"
                {...register("fees", { required: "Fees are required." })}
              />

              {errors.fees && (
                <p className="text-red-500 text-sm">{errors.fees.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block font-bold text-gray-700 mb-1"
              >
                Course Duration
              </label>

              <input
                id="duration"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Duration (e.g. 6 weeks, 3 months)"
                {...register("duration", {
                  required: "Course duration is required.",
                })}
              />

              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block font-bold text-gray-700 mb-1"
              >
                Course Type
              </label>

              <select
                id="type"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                {...register("type", { required: "Course type is required." })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select course type
                </option>
                <option value="Beginner Friendly">Beginner Friendly</option>
                <option value="Certificate Course">Certificate Course</option>
                <option value="Project Based">Project Based</option>
                <option value="Advanced">Advanced</option>\
                <option value="Industry Oriented">Industry Oriented</option>
              </select>

              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-bold text-gray-700 mb-1"
              >
                Course Description
              </label>

              <textarea
                id="description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
                placeholder="Enter detailed course description"
                {...register("description", {
                  required: "Course description is required.",
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
              List Course
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

export default CoursePost;
