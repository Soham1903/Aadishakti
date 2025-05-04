import Carousel from "./imageCarousel";
import QuoteSection from './QuoteSection';
import MobileNumerology from "./MobileNumerology";
import VastuSpecial from './VastuSpecial';
// import TopCourses from "./TopCourses";
import Stats from "./Stats";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import About from "./About";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <Carousel />
        <About />
        <QuoteSection />
        <MobileNumerology/>
        <VastuSpecial />
        <Stats />
        {/* <TopCourses /> */}
        <Reviews />
        <FAQ />
      </div>
    </>
  );
};

export default Home;
