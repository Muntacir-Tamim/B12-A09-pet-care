import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";

const Signup = () => {
  const [show, setShow] = useState(false);

  const {
    createUserWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signoutUserFunc,
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // Email/password signup function
  const handleSignup = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }

    // 1️⃣ Create user
    // 1st step : Create user
    // createUserWithEmailAndPassword(auth, email, password);
    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        // 2nd step: Update profile
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            console.log(res);
            // 3rd step: Email verification
            sendEmailVerificationFunc()
              .then((res) => {
                console.log(res);
                setLoading(false);

                // Signout user
                signoutUserFunc().then(() => {
                  toast.success(
                    "Signup successful. Check your email to validate your account. "
                  );
                  setUser(null);
                  navigate("/");
                });
              })
              .catch((e) => {
                console.log(e);
                toast.error(e.message);
              });
          })
          .catch((e) => {
            console.log(e);
            toast.error(e.message);
          });
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database.");
        } else if (e.code === "auth/weak-password") {
          toast.error("Password is too weak.");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  // Google Sign-in function

  const handleGoogleSignin = () => {
    console.log("google signin");
    signInWithEmailFunc()
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUser(res.user);
        navigate("/");
        toast.success("Signin successful");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-[96vh] py-7 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 relative text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Habib utsho"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="text"
              name="photo"
              placeholder="Your photo URL here"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-[8px] top-[36px] cursor-pointer z-50"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <button type="submit" className="my-btn">
            Sign Up
          </button>

          {/* divider */}
          <div className="flex items-center gap-3">
            <div className="h-px bg-white/30 flex-1"></div>
            <span className="text-white/60 text-sm">or</span>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>

          {/* Google Signin */}
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-3 py-2 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition active:scale-[.97] cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Continue with Google
          </button>

          <div className="text-center mt-3">
            <p className="text-sm text-white/80">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-pink-300 hover:text-white font-medium underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
