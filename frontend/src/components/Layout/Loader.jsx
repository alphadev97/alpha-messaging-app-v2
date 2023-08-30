import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/animation/animation_llxvuvco.json";

const Loader = () => {
  const style = {
    height: 300,
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie animationData={groovyWalkAnimation} loop={true} style={style} />
    </div>
  );
};

export default Loader;
