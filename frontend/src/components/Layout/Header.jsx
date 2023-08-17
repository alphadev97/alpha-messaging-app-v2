import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex item-center justify-between">
        <div>
          <Link to={"/"}>
            <h1>Logo</h1>
            <img src="../../assets/images/logo.png" alt="logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
