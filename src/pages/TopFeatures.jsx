import React from "react";
import { FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";

const TopFeatures = () => {
  const features = [
    {
      icon: <FaShieldAlt size={28} className="text-purple-600" />,
      title: "Secure & Reliable",
      desc: "Your data is safe with us, fully encrypted and private.",
    },
    {
      icon: <FaRocket size={28} className="text-purple-600" />,
      title: "Fast Performance",
      desc: "Experience lightning fast load times and smooth UX.",
    },
    {
      icon: <FaUsers size={28} className="text-purple-600" />,
      title: "User Friendly",
      desc: "Easy to use interface designed for everyone.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
