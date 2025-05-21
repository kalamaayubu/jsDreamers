import About from "@/components/general/About";
import Footer from "@/components/general/Footer";
import Hero from "@/components/general/Hero";
import NavBar from "@/components/general/NavBar";
import ContactUs from "@/components/home/ContactUs";
import Faqs from "@/components/home/Faqs";
import OurTeam from "@/components/home/OurTeam";
import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="p-4 relative">
      <NavBar />
      <main className="w-[85%] m-auto mt-16">
        <Hero />
        <About />

        <section className="mt-28 text-xl mb-24  m-auto">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h3 className="text-center leading-tight">
              How to Get Started (Simple Steps)
            </h3>
            <div className="rounded-xl flex flex-col gap-2 justify-center text-gray-800">
              <div className="flex gap-4">
                <Image
                  width={20}
                  height={30}
                  alt="check"
                  src="/assets/greenCheck.svg"
                  className=""
                />
                <p className="">
                  <span className="font-bold">Sign up</span>: Join via our
                  website or social platforms. <a href="#">Click here.</a>
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  width={20}
                  height={30}
                  alt="check"
                  src="/assets/greenCheck.svg"
                  className=""
                />
                <p className="">
                  <span className="font-bold">Learn</span>: By going through our
                  invaluable resources such as the blogs and the courses. Its
                  all free.
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  width={20}
                  height={30}
                  alt="check"
                  src="/assets/greenCheck.svg"
                  className=""
                />
                <p className="">
                  <span className="font-bold">Engage</span>: Participate in
                  discussions, projects, and events.
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  width={20}
                  height={30}
                  alt="check"
                  src="/assets/greenCheck.svg"
                  className=""
                />
                <p className="">
                  <span className="font-bold">Feedback</span>: Give Feedback
                  about our resources and your experience on the platform for us
                  to adjust for the best.
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  width={20}
                  height={30}
                  alt="check"
                  src="/assets/greenCheck.svg"
                  className=""
                />
                <p className="">
                  <span className="font-bold">Grow</span>: Learn, collaborate
                  with others and grow around like-minded individuals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className=" m-auto">
          <h3 className="text-center">Our Team</h3>
          <OurTeam/>
        </section> */}

        <Faqs />
        {/* <Testimonials /> */}

        <div className="mt-16 relative max-w-[600px] m-auto bg-blue-200 rounded-lg px-4 py-3 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-[2.2rem] font-bold">Lets do it</h3>
            <p>Its JavaScript, its fast, its real time</p>
          </div>
          <Link href={"/blogs"}>
            <div className="group flex p-[2px] size-28 justify-center transition-all duration-300 hover:bg-gradient-to-br from-blue-700 to-purple-600 rounded-full items-center group">
              <button className="p-3 bg-white w-full h-full rounded-full flex items-center justify-center">
                <span className="bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent group-hover:animate-none">
                  Start learning
                </span>
                <Image
                  width={20}
                  height={30}
                  src={`/assets/three_right_arrows.svg`}
                  alt=""
                  className="group-hover:animate-none animate-bounce"
                />
              </button>
            </div>
          </Link>
        </div>

        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default RootPage;
