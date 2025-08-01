import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Try employer endpoint first
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {
          withCredentials: true,
        });
        if (res.data && res.data.userType === "employer") {
          setUserType("employer");
          setLoading(false);
          return;
        }
      } catch (err) {
          console.error("Employer fetch failed:", err.response?.data || err.message);
      }

      try {
        // Then try employee endpoint
        const res = await axios.get("http://localhost:4000/employee-profile", {
          withCredentials: true,
        });
        if (res.data && res.data.fullName) {
          setUserType("employee");
          setLoading(false);
          return;
        }
      } catch (err) {
         console.error("Employee fetch failed:", err.response?.data || err.message);
      }

      setUserType("guest");
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Internswallah
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Internswallah, we connect students with the right opportunities
            and help companies discover passionate, skilled interns ready to
            grow and make an impact.
          </p>
        </div>

        {/* Employee Section */}
        {userType === "employee" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              For Students
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-6">
                Starting your career can be overwhelming, but Internswallah is
                here to make it simple and rewarding. We provide students with
                access to verified internships, industry insights, and
                career-building resources to help them stand out in the job
                market. Whether you're looking to gain hands-on experience,
                strengthen your resume, or find the right career path,
                Internswallah is your trusted partner in success.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Students Choose Internswallah?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Access to verified internships across multiple industries.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Skill-building resources to improve employability.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Career guidance, resume building, and interview preparation.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>A growing network
                  of mentors, industry professionals, and recruiters.
                </li>
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-900">
                  Join Internswallah and take the first step towards a
                  successful future!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Employer Section */}
        {userType === "employer" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              For Employers
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-6">
                Finding the right talent for your organization can be a
                challenge, but Internswallah makes it seamless. We connect
                businesses with driven, skilled interns who are ready to
                contribute and grow. Whether you're a startup or a
                well-established company, we streamline the hiring process,
                saving you time and effort while ensuring access to top student
                talent.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why Businesses Choose Internswallah?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Hassle-free access to skilled and motivated interns.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Reduced recruitment time and effort.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>A pool of
                  industry-ready students eager to learn and contribute.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Flexibility to find interns based on specific business needs.
                </li>
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-900">
                  Partner with Internswallah today and discover the next
                  generation of professionals who can help drive your business
                  forward!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Guest Section */}
        {userType === "guest" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Welcome to Internswallah
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-4">
                Internswallah is a bridge between opportunity seekers and
                providers. Whether you're a student or a recruiter, join us to
                make meaningful connections and unlock new possibilities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform simplifies the internship and hiring process by
                bringing together verified opportunities, personalized career
                resources, and a supportive community—all in one place. We aim
                to empower young talent with hands-on experience and help
                organizations find the right individuals to fuel their growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're exploring career paths, upskilling through
                practical experience, or looking for emerging talent,
                Internswallah provides the tools and connections you need to
                thrive in today's competitive landscape.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
