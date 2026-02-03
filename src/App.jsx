import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { UserDataContext } from "./Components/Context/UserContext";
import axios from "axios";
import ScrollToTop from "./Components/ScrollToTop.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {
          withCredentials: true,
        });

        // ✅ strict validation
        if (!res.data?.user || !res.data?.userType) {
          throw new Error("Invalid session");
        }

        dispatch(
          login({
            userData: {
              ...res.data.user,
              userType: res.data.userType,
            },
          }),
        );
      } catch (err) {
        // normal when not logged in
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-700">
          Loading, please wait...
        </h2>
      </div>
    );
  }

  return (
    // <UserDataContext.Provider value={{ user, setUser }}>
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <ScrollToTop />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    // </UserDataContext.Provider>
  );
};

export default App;
