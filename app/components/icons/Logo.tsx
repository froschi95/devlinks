import React from "react";
import Image from "next/image";
import Devlinks from "/public/devlinks.svg";
import SolarLink from "/public/solar_link-circle-bold.svg";

const Logo = () => {
  return (
    <div className="flex items-center justify-start md:justify-center">
      <div className="relative">
        <Image src={SolarLink} alt="solar-link" />
      </div>
      <div className="relative hidden md:flex">
        <Image src={Devlinks} alt="delinks" />
      </div>
    </div>
  );
};

export default Logo;
