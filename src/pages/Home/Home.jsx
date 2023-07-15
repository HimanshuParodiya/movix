import React from "react";
import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="homePage__container">
      <HeroBanner />
    </div>
  );
};

export default Home;
