import Carousel from "./imageCarousel";
import QuoteSection from "./QuoteSection";
import MobileNumerology from "./MobileNumerology";
import VastuSpecial from "./VastuSpecial";
import Stats from "./Stats";
import Reviews from "./Reviews";
import About from "./About";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <Carousel />
        <div id="about">
          <About />
        </div>
        <div id="mobile-numerology">
          <MobileNumerology />
        </div>
        <QuoteSection />
        <div id="vastu">
          <VastuSpecial />
        </div>
        <Stats />
        <Reviews />
      </div>
    </>
  );
};

export default Home;
