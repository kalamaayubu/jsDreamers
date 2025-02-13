"use client";

import TestimonialCard from "./TestimonialsCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from "@/utils/settings";

const Testimonials = () => {
  const testimonialData = [
    {
      name: "Ham",
      img: "ceo.jpeg",
      role: "Freelancer",
      testimony:
        "The customer support team is amazing! They answered all my questions quickly and helped me find the best billing solutions.",
    },
    {
      name: "Ham",
      img: "ceo.jpeg",
      role: "Freelancer",
      testimony:
        "The customer support team is amazing! They answered all my questions quickly and helped me find the best billing solutions.",
    },
    {
      name: "Ham",
      img: "ceo.jpeg",
      role: "Freelancer",
      testimony:
        "The customer support team is amazing! They answered all my questions quickly and helped me find the best billing solutions.",
    },
    {
      name: "Ham",
      img: "ceo.jpeg",
      role: "Freelancer",
      testimony:
        "They answered all my questions quickly and helped me find the best billing solutions.",
    },
  ];

  return (
    <section className="flex flex-col gap-2 mt-20 m-auto">
      <h3 className="font-bold text-[2.2rem] text-center mb-2">
        What do people say about us
      </h3>
      <Slider {...settings}>
        {testimonialData.map((item, index) => (
          <TestimonialCard
            key={index}
            img={item.img}
            name={item.name}
            role={item.role}
            testimony={item.testimony}
          />
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
