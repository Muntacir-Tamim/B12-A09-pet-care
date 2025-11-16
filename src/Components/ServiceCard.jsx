import React from "react";

import Rating_icon from "../assets/img/icon-ratings.png";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  const { serviceId, image, serviceName, rating, price } = service;

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-100 transition duration-300 hover:shadow-2xl">
      <figure className="h-56">
        <img
          src={image}
          alt={serviceName}
          className="w-full h-full object-cover"
          data-aos="fade-up"
        />
      </figure>

      <div className="card-body p-6">
        <h2
          className="card-title text-xl font-bold text-gray-800 line-clamp-2"
          data-aos="fade-up"
        >
          {serviceName}
        </h2>

        <div className="flex justify-between items-center mt-2">
          <p className="text-2xl font-bold text-purple-600" data-aos="fade-up">
            ${price?.toFixed(2) || "N/A"}
          </p>

          <div
            className="flex items-center gap-1 text-amber-500 font-semibold"
            data-aos="fade-up"
          >
            <img className="w-4" src={Rating_icon} alt="rating" />
            {rating}
          </div>
        </div>

        <div className="card-actions mt-4" data-aos="fade-up">
          <Link
            to={`/services/${serviceId}`}
            className="w-full btn bg-blue-600 text-white hover:bg-blue-700 transition duration-200 border-none"
            data-aos="fade-up"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
