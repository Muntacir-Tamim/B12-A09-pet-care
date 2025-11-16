import React, { useState } from "react";
import useService from "../Hooks/useService";
import MyContainer from "../Components/MyContainer";

import SkeletonLoader from "../Components/SkeletonLoader";
import { MagnifyingGlass } from "react-loader-spinner";
import ServiceCard from "../Components/ServiceCard";
import { Search } from "lucide-react";

const Services = () => {
  const { services, loading } = useService();
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const term = search.trim().toLowerCase();

  const filteredServices = term
    ? services.filter((service) =>
        service.serviceName.toLowerCase().includes(term)
      )
    : services;

  return (
    <section className="py-12">
      <MyContainer>
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-800"
            data-aos="fade-up"
          >
            Our All Services
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto" data-aos="fade-up">
            Browse through our complete list of services.
          </p>
        </div>

        {/* Search & Count */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-10">
          <h1 className="text-xl sm:text-2xl font-semibold" data-aos="fade-up">
            ({filteredServices.length}) Services Available
          </h1>

          <label
            className="input w-full sm:w-auto flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2"
            data-aos="fade-up"
          >
            <Search className="w-5 h-5 text-gray-600" data-aos="fade-up" />
            <input
              value={search}
              onChange={(e) => {
                setSearchLoading(true);
                const value = e.target.value;
                setSearch(value);
                setTimeout(() => setSearchLoading(false), 500);
              }}
              type="search"
              placeholder="Search services..."
              className="outline-none w-full text-sm sm:text-base"
              data-aos="fade-up"
            />
          </label>
        </div>

        {/* Loader / Results */}
        {searchLoading ? (
          <div className="flex justify-center items-center py-10">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        ) : loading ? (
          <SkeletonLoader />
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-gray-600 text-2xl font-medium">
            No Services Found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.serviceId} service={service} />
            ))}
          </div>
        )}
      </MyContainer>
    </section>
  );
};

export default Services;
