import React, { useState, useEffect } from "react";
import AlphaDark from "../assets/logo-dark.svg";
import AlphaLight from "../assets/logo-light.svg";
import useFetcher from "../redux/hooks/useFetcher";

const Logo = () => {
  const { selectedTheme } = useFetcher();

  return (
    <div>
      {selectedTheme === "light" ? (
        <img
          src={AlphaLight}
          alt="Alpha Message Logo (Light Theme)"
          className="w-[150px]"
        />
      ) : (
        <img
          src={AlphaDark}
          alt="Alpha Message Logo (Dark Theme)"
          className="w-[150px]"
        />
      )}
    </div>
  );
};

export default Logo;
