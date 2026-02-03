import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../store/authSlice";
import Logo from "./Logo.png";
import "./styles.css";

export default function Header() {
  const [dropdown, setDropdown] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const internshipsRef = useRef(null);
  const jobsRef = useRef(null);
  const coursesRef = useRef(null);
  const getStartedRef = useRef(null);
  const loginRef = useRef(null);

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = (dropdownName) => {
    setDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (dropdown) setDropdown("");
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else {
        console.error("Logout failed:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown !== "" &&
        !(
          (internshipsRef.current &&
            internshipsRef.current.contains(event.target)) ||
          (jobsRef.current && jobsRef.current.contains(event.target)) ||
          (coursesRef.current && coursesRef.current.contains(event.target)) ||
          (getStartedRef.current &&
            getStartedRef.current.contains(event.target)) ||
          (loginRef.current && loginRef.current.contains(event.target))
        )
      ) {
        setDropdown("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine profile link based on user type/role
  let profileLink = null;
  if (user?.userType === "employee") {
    profileLink = "/employee-profile";
  } else if (user?.userType === "employer") {
    profileLink = "/profile";
  }

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#eff7fc] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="w-[50px] h-[60px] sm:w-[60px] sm:h-[70px] flex items-center">
              <img
                src={Logo}
                alt="Logo"
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-200 hover:scale-125"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Internships Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("internships")}
                className="bg-transparent text-[#0a66c2] font-medium rounded-lg px-3 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Internships
                <span className="ml-2 text-[#0a66c2]">
                  {dropdown === "internships" ? "▲" : "▼"}
                </span>
              </button>
              {dropdown === "internships" && (
                <div
                  ref={internshipsRef}
                  className="absolute left-0 flex flex-col bg-white border shadow-lg mt-3.5 w-64 rounded-xl z-50"
                >
                  <Link
                    to="/internships"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 border-b-2"
                    onClick={() => setDropdown("")}
                  >
                    Work from Home
                  </Link>
                  <Link
                    to="/internships"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 border-b-2 border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Internship in Bangalore
                  </Link>
                  <Link
                    to="/internships"
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Internship in Delhi
                  </Link>
                </div>
              )}
            </div>

            {/* Jobs Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("jobs")}
                className="text-[#0a66c2] bg-transparent font-medium rounded-lg px-3 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Jobs
                <span className="text-[#0a66c2] ml-2">
                  {dropdown === "jobs" ? "▲" : "▼"}
                </span>
              </button>
              {dropdown === "jobs" && (
                <div
                  ref={jobsRef}
                  className="absolute left-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-64 z-50"
                >
                  <Link
                    to="/jobs"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2"
                    onClick={() => setDropdown("")}
                  >
                    Full-time Jobs
                  </Link>
                  <Link
                    to="/jobs"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2 border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Part-time Jobs
                  </Link>
                  <Link
                    to="/jobs"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Remote Jobs
                  </Link>
                </div>
              )}
            </div>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("courses")}
                className="text-[#0a66c2] bg-transparent font-medium rounded-lg px-3 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200"
              >
                Courses
                <span className="text-[#0a66c2] ml-2">
                  {dropdown === "courses" ? "▲" : "▼"}
                </span>
              </button>
              {dropdown === "courses" && (
                <div
                  ref={coursesRef}
                  className="absolute left-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-64 z-50"
                >
                  <Link
                    to="/courses"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2"
                    onClick={() => setDropdown("")}
                  >
                    Web Development
                  </Link>
                  <Link
                    to="/courses"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2 border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Data Science
                  </Link>
                  <Link
                    to="/courses"
                    className="px-4 py-2 hover:bg-gray-100 rounded-lg border-t-2"
                    onClick={() => setDropdown("")}
                  >
                    Digital Marketing
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 ml-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 px-3 duration-200 font-medium ${
                    isActive ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-400 transition-colors`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2 px-3 duration-200 font-medium ${
                    isActive ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-400 transition-colors`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/information"
                className={({ isActive }) =>
                  `py-2 px-3 duration-200 font-medium ${
                    isActive ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-400 transition-colors`
                }
              >
                Bulletin
              </NavLink>
              {/* {user?.userType === "employer" && (
                <NavLink
                  to="/job-post"
                  className={({ isActive }) =>
                    `py-2 px-3 duration-200 font-medium ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    } hover:text-blue-400 transition-colors`
                  }
                >
                  Job Post
                </NavLink>
              )} */}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("login")}
                    className="text-[#0a66c2] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors duration-200"
                  >
                    Log in
                  </button>
                  {dropdown === "login" && (
                    <div
                      ref={loginRef}
                      className="absolute right-0 flex flex-col bg-white border shadow-lg mt-3.5 w-52 rounded-xl z-50"
                    >
                      <Link
                        to="/login"
                        onClick={() => setDropdown("")}
                        className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-b-2"
                      >
                        Employer Login
                      </Link>
                      <Link
                        to="/employee-login"
                        onClick={() => setDropdown("")}
                        className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-t-2"
                      >
                        Applicant Login
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("getStarted")}
                    className="text-[#eff7fc] badges bg-[#0a66c2] hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none transition-colors duration-200"
                  >
                    Get started
                  </button>
                  {dropdown === "getStarted" && (
                    <div
                      ref={getStartedRef}
                      className="absolute right-0 flex flex-col bg-white border shadow-lg mt-3.5 w-52 rounded-xl z-50"
                    >
                      <Link
                        to="/signup"
                        onClick={() => setDropdown("")}
                        className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-b-2"
                      >
                        Employer Sign Up
                      </Link>
                      <Link
                        to="/employee-signup"
                        onClick={() => setDropdown("")}
                        className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-t-2"
                      >
                        Applicant Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-[#0a66c2] font-medium text-sm">
                  {user?.fullName ? `Hi, ${user.fullName}` : "Hi!"}
                </span>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("profile")}
                    className="cursor-pointer w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src="https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </button>
                  {dropdown === "profile" && (
                    <div
                      ref={getStartedRef}
                      className="absolute right-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-44 z-50"
                    >
                      {profileLink && (
                        <Link
                          to={profileLink}
                          className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-b"
                          onClick={() => setDropdown("")}
                        >
                          Profile
                        </Link>
                      )}
                      {user?.userType === "employee" && (
                        <Link
                          to="/performance"
                          className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-b border-t-2"
                          onClick={() => setDropdown("")}
                        >
                          Performance Tracker
                        </Link>
                      )}
                      {user?.userType === "employer" && (
                        <Link
                          to="/job-post"
                          className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-b"
                          onClick={() => setDropdown("")}
                        >
                          Job Post
                        </Link>
                      )}
                      <Link
                        to="/privacy"
                        className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2"
                        onClick={() => setDropdown("")}
                      >
                        Privacy
                      </Link>
                      <Link
                        to="/contact"
                        className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2"
                        onClick={() => setDropdown("")}
                      >
                        Contact Us
                      </Link>
                      <Link
                        to="/setting"
                        className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2"
                        onClick={() => setDropdown("")}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-gray-100 rounded-lg border-t-2 text-left w-full"
                        type="button"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg border">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-500 bg-blue-50"
                      : "text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-500 bg-blue-50"
                      : "text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/information"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-500 bg-blue-50"
                      : "text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                  }`
                }
              >
                Information
              </NavLink>
              {user?.userType === "employer" && (
                <NavLink
                  to="/job-post"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-500 bg-blue-50"
                        : "text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                    }`
                  }
                >
                  Job Post
                </NavLink>
              )}
            </div>

            {/* Mobile Dropdowns */}
            <div className="border-t pt-3 space-y-1">
              <Link
                to="/internships"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
              >
                Internships
              </Link>
              <Link
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
              >
                Jobs
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
              >
                Courses
              </Link>
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t pt-3 space-y-2">
              {!authStatus ? (
                <>
                  <div className="space-y-1">
                    <div className="px-3 py-1 text-sm font-medium text-gray-500">
                      Login
                    </div>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Employer Login
                    </Link>
                    <Link
                      to="/employee-login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Employee Login
                    </Link>
                  </div>
                  <div className="space-y-1 border-t pt-2">
                    <div className="px-3 py-1 text-sm font-medium text-gray-500">
                      Sign Up
                    </div>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium bg-[#0a66c2] text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                      Employer Sign Up
                    </Link>
                    <Link
                      to="/employee-signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium bg-[#0a66c2] text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                      Employee Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-[#0a66c2]">
                    {user?.fullName ? `Hi, ${user.fullName}` : "Hi!"}
                  </div>
                  {profileLink && (
                    <Link
                      to={profileLink}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                  )}
                  {user?.userType === "employee" && (
                    <Link
                      to="/performance"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Performance Tracker
                    </Link>
                  )}
                  <Link
                    to="/privacy"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/setting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
