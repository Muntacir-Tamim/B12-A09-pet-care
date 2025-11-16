import { useParams } from "react-router";
import useService from "../Hooks/useService";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

import MyContainer from "../Components/MyContainer";
import { IoStarSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const { services, loading, error } = useService();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  // Booking submission
  const handleBookService = (e) => {
    e.preventDefault();

    // 1. Provider can't book own service
    if (user?.email === service.providerEmail) {
      toast.error("You cannot book your own service!");
      return;
    }

    // 2. Slot check
    if (service.slotsAvailable <= 0) {
      toast.error("No slots available!");
      return;
    }

    // 3. Name validation
    if (!bookingData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    // *SUCCESS Message*
    toast.success(
      `Booking for "${service.serviceName}" successful! We'll contact you soon.`
    );

    // ↓ Update slot in UI
    setService({
      ...service,
      slotsAvailable: service.slotsAvailable - 1,
    });

    // Reset Form
    setBookingData({
      name: user?.displayName || "",
      email: user?.email || "",
    });
  };

  // Load specific service by ID
  useEffect(() => {
    if (services && services.length > 0) {
      const foundService = services.find(
        (s) => s.serviceId === Number(serviceId)
      );
      setService(foundService);
    }
  }, [services, serviceId]);

  // ---------------- Loading UI ----------------
  if (loading) {
    return (
      <MyContainer className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </MyContainer>
    );
  }

  if (error) {
    return (
      <MyContainer className="min-h-screen pt-10">
        <p className="text-red-600 text-center font-semibold text-xl">
          Error loading details: {error}
        </p>
      </MyContainer>
    );
  }

  if (!service) {
    return (
      <MyContainer className="min-h-[70vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Service Not Found!</h2>
      </MyContainer>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <MyContainer className="min-h-screen py-16">
      <div
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Image Section */}
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          {/* Header Info */}
          <h1
            className="text-4xl font-extrabold text-gray-800 mb-4 border-b pb-2"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {service.serviceName}
          </h1>

          <div
            className="flex justify-between items-center mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-3xl font-bold text-purple-600">
              Price: ${service.price?.toFixed(2) || "N/A"}
            </p>

            <div className="flex items-center gap-2 text-amber-500 font-semibold text-lg">
              <IoStarSharp className="text-xl" />
              <span>{service.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-gray-600 leading-relaxed mb-6"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {service.description}
          </p>

          {/* Provider Info */}
          <div
            className="bg-blue-50 p-4 rounded-lg"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <p className="text-md font-semibold text-blue-800">
              Provided by: {service.providerName}
            </p>
            <p className="text-sm text-blue-600">
              Contact: {service.providerEmail}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Available Slots: {service.slotsAvailable}
            </p>
          </div>

          {/* ----- Booking Form ----- */}
          <div
            className="mt-8 pt-6 border-t border-gray-200"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Book This Service
            </h2>

            <form onSubmit={handleBookService} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  disabled // ⬅ Important improvement
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Hidden field */}
              <input
                type="hidden"
                name="serviceName"
                value={service.serviceName}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition active:scale-[0.98] mt-4 cursor-pointer"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default ServiceDetails;
