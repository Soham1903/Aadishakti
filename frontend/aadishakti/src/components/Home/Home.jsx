import React from 'react'
import Carousel from './imageCarousel'
import GradientCards from './AstroCards'

const Home = () => {
  return (
    <>
       <div className="w-full">
        <Carousel/>
        <GradientCards/>
        {/* <Journey />
        <Career/>
        <Achievement />
        <Uniqueness /> */}

      </div>
    </>
  )
}

export default Home
