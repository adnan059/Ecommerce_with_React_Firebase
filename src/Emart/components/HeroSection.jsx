import React from "react";
import "../../assets/css/heroSection.css";
import heroBanner from "../../assets/images/heroBanner.jpg";

const HeroSection = () => {
  return (
    <div className="heroSection">
      <img className="heroImg" src={heroBanner} alt="" />
    </div>
  );
};

export default HeroSection;
