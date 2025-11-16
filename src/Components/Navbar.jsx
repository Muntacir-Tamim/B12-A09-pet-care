import { Link } from "react-router";
import logo from "../assets/img/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { use, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import { ClockLoader } from "react-spinners";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signoutUserFunc, setUser, loading } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Signed out successfully");
        setUser(null);
        setMenuOpen(false);
      })
      .catch((e) => toast.error(e.message));
  };

  const handleManageAccount = () => {
    window.open("https://myaccount.google.com/", "_blank");
    setMenuOpen(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".user-menu")) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="py-2 border-b border-slate-300 bg-white sticky top-0 z-10">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-[55px]" alt="Firebase Logo" />
        </figure>

        <ul className="flex items-center gap-5 font-medium">
          <li>
            <MyLink to={"/"}>Home</MyLink>
          </li>
          <li>
            <MyLink to={"/services"}>Services</MyLink>
          </li>
          {user && (
            <li>
              <MyLink to={"/profile"}>My Profile</MyLink>
            </li>
          )}
        </ul>

        {loading ? (
          <ClockLoader color="#4F46E5" size={24} />
        ) : user ? (
          <div className="relative user-menu">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-[3px] cursor-pointer rounded-full hover:ring-2 hover:ring-blue-500 w-[50px] h-[50px] transition focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/88"}
                className="h-full w-full rounded-full object-cover"
                alt={user?.displayName || "User Avatar"}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl border border-slate-200 pt-4 pb-2 z-50 text-center transition-all">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-100"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-gray-600 text-xs px-4 mt-1 mb-3">
                  {user?.email}
                </p>

                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  className="h-[90px] w-[90px] mx-auto rounded-full border border-slate-300 object-cover"
                  alt=""
                />

                <h2 className="font-semibold text-lg mt-3 mb-4">
                  Hi, {user?.displayName || "User"}!
                </h2>

                <div className="px-5 mb-4">
                  <button
                    onClick={handleManageAccount}
                    className="text-blue-600 border border-slate-300 rounded-full py-2 px-5 hover:bg-blue-50/50 font-medium text-sm transition w-full"
                  >
                    Manage your Google Account
                  </button>
                </div>

                <div className="flex justify-center gap-2 py-3 border-t border-slate-200 px-3">
                  <Link
                    to={"/signin"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:bg-slate-100 py-2 px-2 rounded-xl flex-1 justify-center"
                  >
                    <svg
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    Add account
                  </Link>

                  <button
                    onClick={handleSignout}
                    className="flex items-center gap-2 text-gray-700 hover:bg-slate-100 py-2 px-2 rounded-xl flex-1 justify-center"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-2 px-4 pb-2">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>{" "}
                  •{" "}
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
            <Link to={"/signin"}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
