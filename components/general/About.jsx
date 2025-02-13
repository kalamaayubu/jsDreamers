import AboutCard from "./AboutCard";

const About = () => {
  return (
    <section className="mt-28 flex flex-col lg:flex-row gap-8 m-auto">
      <div className="lg:w-1/2 flex flex-col items-center mt-4">
        <div className="max-w-[600px] mb-4">
          <img src="/assets/javascript.avif" className="rounded-xl w-full" />
        </div>
        <p className="w-full text-xl text-gray-800">
          At jsDreamers, we're committed to sharing everything we've
          learned—completely free, forever. We understand that passion and
          commitment should define your journey, not your financial situation.
          Our goal is to provide valuable resources for those who are eager to
          learn but may not have the means for paid courses.
        </p>
        <button className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-blue-600 mt-8 self-start">
          Start learning
        </button>
      </div>
      <div className="lg:w-1/2 flex flex-col items-center mt-10">
        <h2 className="font-bold m-auto md:text-[2.2rem] text-[2.0rem] max-w-[500px] text-center mb-2">
          What we bring to the table 😋
        </h2>
        <div className="flex flex-col gap-4">
          <AboutCard
            image={`/assets/globe.svg`}
            heading={`Global Community`}
            description={`You are going to grow alongside like minded individuals around the world.`}
          />
          <AboutCard
            image={`/assets/resources.svg`}
            heading={`Curated Resources`}
            description={`Access free guides, roadmaps, and tutorials.`}
          />
          <AboutCard
            image={`/assets/mentorship.svg`}
            heading={`Mentorship`}
            description={`Learn from experienced developers for free.`}
          />
          <AboutCard
            image={`/assets/tutorials.svg`}
            heading={`Workshops & Tutorials`}
            description={`Free learning sessions and coding challenges.`}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
