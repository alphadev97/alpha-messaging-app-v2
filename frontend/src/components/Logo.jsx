import React from "react";
import AlphaMessageLogo from "../assets/AlphaMessege.png";

const Logo = () => {
  return (
    <div>
      <img
        src={AlphaMessageLogo}
        alt="Alpha Message Logo"
        className="w-[400px] mb-5"
      />
    </div>
  );
};

export default Logo;
