import React, { useContext, useState } from "react";
import MyContainer from "../Components/MyContainer";
import { AuthContext } from "../context/AuthContext";

import { FaEdit, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateProfileFunc, setLoading, setUser } =
    useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const defaultPhotoURL = "https://i.ibb.co/6P8k85Z/user-placeholder.png";

  const handleOpenModal = () => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
    setIsModalOpen(true);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    updateProfileFunc(name, photo)
      .then(() => {
        toast.success("Profile updated successfully!");

        setUser({
          ...user,
          displayName: name,
          photoURL: photo,
        });

        setIsModalOpen(false);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MyContainer className="min-h-screen py-16">
      {/* Main Profile Card */}
      <div
        data-aos="fade-up"
        className="max-w-xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden p-8 sm:p-10 border border-gray-100"
      >
        <h1
          data-aos="fade-down"
          className="text-3xl font-extrabold text-center text-gray-800 mb-8 border-b pb-4"
        >
          My Profile
        </h1>

        {/* User Image */}
        <div data-aos="zoom-in" className="flex justify-center mb-8">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 border-purple-500 shadow-lg hover:scale-105 transition duration-300"
            src={user?.photoURL || defaultPhotoURL}
            alt={user?.displayName || "User Avatar"}
            loading="lazy"
          />
        </div>

        {/* User Details */}
        <div className="space-y-5 mb-8">
          <div
            data-aos="fade-right"
            className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
          >
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {user?.displayName || "N/A (Name Not Set)"}
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
          >
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {user?.email || "N/A"}
            </p>
          </div>

          <div
            data-aos="fade-up"
            className={`p-3 rounded-lg text-center font-bold text-sm ${
              user?.emailVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user?.emailVerified
              ? "✅ Email Verified"
              : "⚠️ Email NOT Verified"}
          </div>
        </div>

        {/* Update Button */}
        <button
          data-aos="zoom-in-up"
          onClick={handleOpenModal}
          className="w-full py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition active:scale-[0.98] mt-4 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
        >
          <FaEdit /> Update Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          data-aos="fade-in"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <div
            data-aos="zoom-in"
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div data-aos="fade-right">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your new name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              <div data-aos="fade-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Enter new photo URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              <button
                data-aos="zoom-in"
                type="submit"
                className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition active:scale-[0.98] mt-6"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default Profile;
