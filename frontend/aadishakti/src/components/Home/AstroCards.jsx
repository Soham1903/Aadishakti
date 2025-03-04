import React from "react";

const cards = [
  {
    title: "Monthly Special Events",
    description: "Connect with Divine Archetypes During Their Exclusive Powertimes",
    bgColor: "from-red-100 to-rose-200",
    image: "/images/temple.png",
  },
  {
    title: "Instant Poojas & Homas",
    description: "Potent Vedic Rituals For Swift Divine Boons",
    bgColor: "from-rose-200 to-red-300",
    image: "/images/pooja.png",
  },
  {
    title: "Remedies for Wealth & Prosperity",
    description: "Vedic Remedies to Transform Your Life",
    bgColor: "from-red-300 to-rose-400",
    image: "/images/wealth.png",
  },
  {
    title: "Yearlong Programs",
    description: "Receive Daily Blessings of the Divine All Year-Round",
    bgColor: "from-rose-400 to-red-500",
    image: "/images/god.png",
  },
];

const GradientCards = () => {
  return (
    <div className="flex justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${card.bgColor} p-6 h-60 rounded-2xl shadow-lg transition-transform hover:scale-105`}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">{card.title}</h2>
            <p className="text-gray-700 opacity-90">{card.description}</p>
            <img 
              src={card.image} 
              alt={card.title} 
              className="absolute bottom-4 right-4 w-20 h-20 object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientCards;
