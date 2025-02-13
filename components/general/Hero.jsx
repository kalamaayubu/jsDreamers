import React from "react";

const Hero = () => {
  return (
    <section className="hero_section flex flex-col lg:flex-row items-center lg:justify-between m-auto mb-20">
      <div className="flex flex-col items-center lg:items-start lg:mt-4">
        <h1 className="text-4xl sm:text-[2.7rem] lg:text-5xl font-bold leading-tight lg:leading-tight max-w-[450px] mb-5 text-center lg:text-start">
          Navigating the web of
          <span className=" bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent">
            {" "}
            development
          </span>
          .
        </h1>
        <p className="text-gray-700 lg:max-w-[450px] sm:max-w-[780px] text-xl text-center lg:text-start px-2 lg:px-0 mb-8">
          At jsDreamers, we're committed to sharing everything we've
          learned—completely free, forever. We understand that passion and
          commitment should define your journey, not your financial situation.
          Our goal is to provide valuable resources for those who are eager to
          learn but may not have the means for paid courses.
        </p>
        <button className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-blue-600 hidden lg:flex">
          Start learning
        </button>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/assets/hero2.png"
          alt="Hero"
          className="object-cover min-w-[500px] sm:w-[650px]"
        />
        <button className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-blue-600 mt-8 m-auto lg:hidden">
          Start learning
        </button>
      </div>
    </section>
  );
};

export default Hero;
