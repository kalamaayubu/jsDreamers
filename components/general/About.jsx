import Link from "next/link";
import AboutCard from "./AboutCard";

const About = () => {
  return (
    <section className="mt-28 flex flex-col lg:flex-row gap-8 m-auto">
      <div className="lg:w-1/2 flex flex-col items-center mt-4">
        <div className="max-w-[600px] mb-4">
          <img src="/assets/javascript.avif" className="rounded-xl w-full" />
        </div>
        <p className="w-full text-xl text-gray-800">
          Our mission is to empower aspiring developers by providing
          high-quality, free resources focused on tech education, with a special
          emphasis on JavaScript. We believe that learning should be fueled by
          passion and curiosity, not the size of the wallet. Every tutorial,
          blog, and guide we offer is designed to break down financial barriers
          and help learners of all backgrounds build the skills they need to
          thrive in the tech world.
        </p>
        <Link href={"/blogs"} className="self-start">
          <button className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-blue-600 mt-8">
            Start learning
          </button>
        </Link>
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
