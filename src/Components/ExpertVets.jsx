import React from "react";
import MyContainer from "./MyContainer";

const ExpertVets = () => {
  const vets = [
    {
      id: 1,
      name: "Dr. Anika Rahman",
      specialty: "Canine Orthopedics",
      image: "https://i.ibb.co/4RDR75W8/d1.jpg",
    },
    {
      id: 2,
      name: "Dr. Kamal Hossain",
      specialty: "Feline Internal Medicine",
      image: "https://i.ibb.co/sJ996djw/d2.jpg",
    },
    {
      id: 3,
      name: "Dr. Shehnaz Begum",
      specialty: "Exotic Pet Care",
      image: "https://i.ibb.co/xS0zBsXJ/d3.jpg",
    },
  ];

  return (
    <section className="py-16">
      <MyContainer>
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-extrabold text-gray-800"
            data-aos="fade-up"
          >
            Meet Our Expert Vets
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto" data-aos="fade-up">
            Our certified professionals are ready to give your pets the best
            care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vets.map((vet) => (
            <div
              key={vet.id}
              className="text-center p-6 bg-white shadow-lg rounded-lg border-t-4 border-purple-500"
              data-aos="fade-up"
            >
              <img
                src={vet.image}
                alt={vet.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-purple-200"
              />
              <h3
                className="text-2xl font-bold text-gray-800"
                data-aos="fade-up"
              >
                {vet.name}
              </h3>
              <p className="text-purple-600 font-semibold mt-1">
                {vet.specialty}
              </p>
              <p className="text-gray-500 mt-3 text-sm" data-aos="fade-up">
                Dedicated to pet health for over 10 years.
              </p>
            </div>
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default ExpertVets;
