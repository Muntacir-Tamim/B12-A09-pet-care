import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Signin = () => {
  const [show, setShow] = useState(false);

  const {
    signInWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    sendPassResetEmailFunc,
    setLoading,
    setUser,
    user,
  } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const emailRef = useRef(null);

  // const [email, setEmail] = useState(null);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    console.log({ email, password });
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        console.log(res);
        setLoading(false);

        if (!res.user?.emailVerified) {
          toast.error("Your email is not verified.");
          return;
        }
        setUser(res.user);
        toast.success("Signin successful");
        navigate(from);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignin = () => {
    console.log("google signin");
    signInWithEmailFunc()
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUser(res.user);
        navigate(from);
        toast.success("Signin successful");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleForgetPassword = () => {
    console.log();
    const email = emailRef.current.value;

    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    sendPassResetEmailFunc(email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email to reset password");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-[96vh] py-7 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-4">
      <div className=" w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.08)] rounded-2xl p-8 animate-[fadeIn_0.4s_ease]">
        <h2 className="text-2xl font-semibold  text-center text-white">
          Sign in
        </h2>

        <form onSubmit={handleSignin} className="space-y-6">
          <div>
            <label className="block text-sm text-white font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-white font-medium mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-[38px] text-white/70 hover:text-white cursor-pointer"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <button
            type="button"
            onClick={handleForgetPassword}
            className="text-sm hover:text-blue-300 text-white transition cursor-pointer"
          >
            Forgot Password?
          </button>

          <button type="submit" className="my-btn">
            Sign In
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-white/30 flex-1"></div>
            <span className="text-white/60 text-sm">or</span>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>

          {/* Google */}
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

          <p className="text-center text-sm text-white/70 mt-2">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-300 hover:text-white underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
