const cards = [
  {
    title: "ज्योतिष = मार्गदर्शनाची दिव्य ज्योत",
    description:
      "जीवनाच्या प्रत्येक टप्प्यावर योग्य दिशा दाखवणारी प्रकाशकृती म्हणजे ज्योतिष.",
    bgColor: "from-[#FCE7F3] to-[#FAD1E5]",
    image: "/assets/card1-removebg-preview.png",
  },
  {
    title: "ज्योतिष = जीवनसंतुलनाचे रहस्य",
    description:
      "प्रकृती, नशिब आणि कर्तृत्व यांचा समतोल राखून सुखद जीवन जगण्यासाठी ज्योतिष उपयुक्त ठरते.",
    bgColor: "from-[#FAD1E5] to-[#F4B6CD]",
    image: "/assets/card2-removebg-preview.png",
  },
  {
    title: "ज्योतिष = ग्रहांचा संजीवनी प्रभाव",
    description:
      "ग्रह आणि नक्षत्रांचा प्रभाव ओळखून जीवन समृद्ध करण्याची कला ज्योतिष शिकवते.",
    bgColor: "from-[#F4B6CD] to-[#EBA1C0]",
    image: "/assets/card_6-removebg-preview.png",
  },
  {
    title: "ज्योतिष = कालज्ञानाचे गूढ शास्त्र",
    description:
      "भूतकाळ, वर्तमान आणि भविष्य यांचा ताळमेळ घालून योग्य मार्गदर्शन करणारे शास्त्र म्हणजे ज्योतिष.",
    bgColor: "from-[#EBA1C0] to-[#FFD6E8]",
    image: "/assets/card5-removebg-preview.png",
  },
];

const GradientCards = () => {
  return (
    <div style={{ backgroundColor: "#fff6f3" }} className="py-10">
      {" "}
      {/* Added background color and padding */}
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${card.bgColor} p-6 h-56 md:h-72 rounded-2xl shadow-lg transition-transform hover:scale-105`}
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {card.title}
              </h2>
              {/* Hide description on mobile (show only on md and larger) */}
              <p className="text-gray-700 opacity-90 hidden md:block">
                {card.description}
              </p>
              <img
                src={card.image}
                alt={card.title}
                className="absolute bottom-8 md:bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientCards;
