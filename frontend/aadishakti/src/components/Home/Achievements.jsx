import React, { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { FaCalendarAlt, FaComments, FaStar, FaTrophy } from "react-icons/fa";

const achievements = [
  { id: 1, value: 20, label: "Years of Experience", icon: <FaCalendarAlt style={{ color: "#921a40" }} /> },
  { id: 2, value: 20000, label: "Satisfied Consultations", icon: <FaComments style={{ color: "#921a40" }} /> },
  { id: 3, value: 150, label: "Positive Reviews", icon: <FaStar style={{ color: "#921a40" }} /> },
  { id: 4, value: 100, label: "Awards Won", icon: <FaTrophy style={{ color: "#921a40" }} /> },
];

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const achievementsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once the section is visible
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observer.unobserve(achievementsRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={achievementsRef}
      style={{ backgroundColor: "#fff6f3" }} // Set background color for the entire section
      className="flex flex-col mt-0 py-4"// Reduced margin-top and padding
    >
      <p className="font-semibold text-2xl md:text-3xl text-center">
        Our Outstanding Achievements
      </p>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            style={{ backgroundColor: "#D9ABAB" }} // Card color set to #FFB433
            className="flex flex-col justify-center items-center px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center shadow-lg" // Added shadow for better visual appeal
          >
            <div className="flex flex-row justify-center items-center">
              <div className="text-4xl text-primary">
                {achievement.icon}
              </div>
              <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                {isVisible && (
                  <CountUp
                    end={achievement.value}
                    duration={4} // Slower animation (4 seconds)
                    separator=","
                    decimals={achievement.id === 3 ? 1 : 0} // Add decimals for Positive Reviews if needed
                    decimal="."
                  />
                )}
              </p>
            </div>
            <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">
              {achievement.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;