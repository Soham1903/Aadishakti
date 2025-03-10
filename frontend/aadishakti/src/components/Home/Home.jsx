import React from 'react'
import Carousel from './imageCarousel'
import GradientCards from './AstroCards'
import TopSellingCourses from './TopCourses'
import Achievements from './Achievements'


const Home = () => {
  return (
    <>
       <div className="w-full">
        <Carousel/>
        <GradientCards/>
        <TopSellingCourses />
        <Achievements/>
        
        {/* <Journey />
        <Career/>
        <Achievement />
        <Uniqueness /> */}

      </div>
    </>
  )
}

export default Home
