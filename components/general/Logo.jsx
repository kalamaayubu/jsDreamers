import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="items-center flex justify-center mb-7">
      <Image
        height={800}
        width={800}
        src="/assets/logo3D.png"
        alt="Svg"
        className="w-14 translate-y-1"
      />
      <p className="flex font-bold text-2xl opacity-80">jsDreamers</p>
    </div>
  );
};

export default Logo;
