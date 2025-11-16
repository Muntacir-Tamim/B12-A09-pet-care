import React from "react";
import MyContainer from "../Components/MyContainer";
import HeroSlider from "../Components/HeroSlider";

import ServiceCard from "../Components/ServiceCard";
import WinterTips from "../Components/WinterTips";
import ExpertVets from "../Components/ExpertVets";
import useService from "../Hooks/useService";
import SkeletonLoader from "../Components/SkeletonLoader";
import { Link } from "react-router";
import TopFeatures from "./TopFeatures";

const Homepage = () => {
  const { services, loading } = useService();

  const popularServices = services.slice(0, 6);

  return (
    <MyContainer>
      <HeroSlider></HeroSlider>
      {/* Popular Winter Care Services Section */}
      <section className="py-16">
        <MyContainer>
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-extrabold text-gray-800"
              data-aos="fade-up"
            >
              Popular Winter Care Services
            </h2>
            <p
              className="text-gray-500 mt-4 max-w-xl mx-auto"
              data-aos="fade-up"
            >
              Get the best deals on our top-rated services to keep you healthy
              and cozy this winter season.
            </p>
          </div>

          {/* Grid Layout: col-1, md-col-2, lg-col-3 */}
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularServices.map((service) => (
                <ServiceCard key={service.serviceId} service={service} />
              ))}
            </div>
          )}
          <div className="flex justify-center item-center mt-10 mb-6">
            <Link
              to="/services"
              className="btn  bg-[#7F5AF0] text-[#FFFFFF] px-8"
              data-aos="fade-up"
            >
              Show All
            </Link>
          </div>
        </MyContainer>
      </section>

      {/* Winter Care Tips Section */}
      <WinterTips></WinterTips>

      {/* Meet Our Expert Vets Section */}
      <ExpertVets></ExpertVets>

      {/* top feature  */}
      <TopFeatures></TopFeatures>
    </MyContainer>
  );
};

export default Homepage;
