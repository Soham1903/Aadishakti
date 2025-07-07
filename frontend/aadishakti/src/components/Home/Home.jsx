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
        <QuoteSection />
        <div id="about">
          <About />
        </div>
        <div id="mobile-numerology">
          <MobileNumerology />
        </div>

        <Stats />
        <div id="vastu">
          <VastuSpecial />
        </div>

        <Reviews />
      </div>
    </>
  );
};

export default Home;
