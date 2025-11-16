import React from "react";
import MyContainer from "./MyContainer";
import { BiWrench } from "react-icons/bi";

const WinterTips = () => {
  const tips = [
    {
      id: 1,
      title: "Check Paws Regularly",
      text: "Ice and salt can cause irritation. Wipe their paws after walks and check for cracks.",
      icon: "MdOutlinePets",
    },
    {
      id: 2,
      title: "Warm Water Access",
      text: "Ensure your pet's water bowl isn't freezing if kept outside, or provide warm water frequently.",
      icon: "MdOutlineLocalDrink",
    },
    {
      id: 3,
      title: "Limit Outdoor Time",
      text: "Shorten walks during extreme cold and ensure they have a warm, dry shelter at all times.",
      icon: "MdOutlineWbSunny",
    },
    {
      id: 4,
      title: "Proper Nutrition",
      text: "Consult your vet about adjusting their diet to ensure enough calories for maintaining body heat.",
      icon: "MdOutlineFoodBank",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <MyContainer>
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-extrabold text-gray-800"
            data-aos="fade-up"
          >
            Winter Care Tips for Pets
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto" data-aos="fade-up">
            A healthy pet is a happy pet. Follow these expert tips this winter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-blue-500 hover:shadow-xl transition duration-300"
              data-aos="fade-up"
            >
              <div className="flex items-center gap-4" data-aos="fade-up">
                <BiWrench
                  className="text-4xl text-blue-500"
                  data-aos="fade-up"
                />
                <div>
                  <h3
                    className="text-xl font-bold text-gray-700"
                    data-aos="fade-up"
                  >
                    {tip.title}
                  </h3>
                  <p className="text-gray-500 mt-1" data-aos="fade-up">
                    {tip.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default WinterTips;
