import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, X } from "lucide-react"

function JobPost() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      skills: "",
    },
  })
  const navigate = useNavigate()

  const [customSkills, setCustomSkills] = useState("")
  const [modal, setModal] = useState({ show: false, type: '', message: '' })

  const onCustomSkillChange = (e) => {
    const value = e.target.value
    setCustomSkills(value)
    setValue("skills", value)
  }

  const showModal = (type, message) => {
    setModal({ show: true, type, message })
  }

  const closeModal = () => {
    setModal({ show: false, type: '', message: '' })
    if (modal.type === 'success') {
      navigate("/jobs") // Redirect only on success
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for setting cookies
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      if (response.ok) {
        showModal('success', 'Job posted successfully!')
      } else {
        showModal('error', `Failed to post job: ${result.message}`)
      }
    } catch (err) {
      showModal('error', `Error: ${err.message}`)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Post a Job</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-1">
                Company Name
              </label>
              <input
                id="company"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Company Name"
                {...register("company", { required: "Company name is required." })}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="jobTitle" className="block font-bold text-gray-700 mb-1">
                Job Title
              </label>
              <input
                id="jobTitle"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Job Title"
                {...register("jobTitle", { required: "Job title is required." })}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="customSkills" className="block font-bold text-gray-700 mb-1">
                Enter Required Skills (comma separated)
              </label>
              <input
                id="customSkills"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                placeholder="e.g. Python, Django, REST API"
                value={customSkills}
                onChange={onCustomSkillChange}
              />
              <input type="hidden" {...register("skills", { required: "Skills are required." })} />
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block font-bold text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Location"
                {...register("location", { required: "Location is required." })}
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="salary" className="block font-bold text-gray-700 mb-1">
                Salary
              </label>
              <input
                id="salary"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Salary"
                {...register("salary", { required: "Salary is required." })}
              />
              {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block font-bold text-gray-700 mb-1">
                Experience
              </label>
              <input
                id="experience"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Experience (e.g. 2-4 years)"
                {...register("experience", { required: "Experience is required." })}
              />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="jobType" className="block font-bold text-gray-700 mb-1">
                Job Type
              </label>
              <input
                id="jobType"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. Full-Time, Part-Time, Remote"
                {...register("jobType", { required: "Job type is required." })}
              />
              {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="postedOn" className="block font-bold text-gray-700 mb-1">
                Posted On
              </label>
              <input
                id="postedOn"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="date"
                {...register("postedOn", { required: "Posting date is required." })}
              />
              {errors.postedOn && <p className="text-red-500 text-sm">{errors.postedOn.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-bold text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
                placeholder="Enter detailed job description"
                {...register("description", { required: "Job description is required." })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Post Job
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
                {modal.type === 'success' ? (
                  <CheckCircle className="text-blue-500 w-6 h-6 mr-2" />
                ) : (
                  <XCircle className="text-red-500 w-6 h-6 mr-2" />
                )}
                <h3 className={`text-lg font-semibold ${
                  modal.type === 'success' ? 'text-blue-700' : 'text-red-700'
                }`}>
                  {modal.type === 'success' ? 'Success!' : 'Error'}
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
                  modal.type === 'success'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {modal.type === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobPost