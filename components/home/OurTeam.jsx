"use client";

import Slider from "react-slick";
import OurTeamCard from "./OurTeamCard";
import settings from "@/utils/settings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurTeam = () => {
  const ourTeam = [
    {
      name: "Yeng",
      img: "ceo.jpeg",
      role: "CEO",
      comment: `"Let thy passion, determination and commitment limit thee but not thy financial situation"`,
    },
    {
      name: "Anderson",
      img: "onet.jpeg",
      role: "Manager",
      comment: `"Learn, collaborate with others and grow around like-minded individuals."`,
    },
    {
      name: "Michelle",
      img: "developer.jpeg",
      role: "Manager",
      comment: `"Give Feedback about our resources and your experience on the platform for us to adjust for the best."`,
    },
    {
      name: "Jason",
      img: "ceo.jpeg",
      role: "Developer",
      comment: `"Join via our website or social platforms. Click here."`,
    },
    {
      name: "Memento Mori",
      img: "two.jpeg",
      role: "Designer",
      comment: `"By going through our invaluable resources such as the blogs and the courses. Its all free."`,
    },
  ];

  return (
    <div>
      <Slider {...settings}>
        {ourTeam.map((item, index) => (
          <OurTeamCard
            key={index}
            img={item.img}
            name={item.name}
            role={item.role}
            comment={item.comment}
          />
        ))}
      </Slider>
    </div>
  );
};

export default OurTeam;
