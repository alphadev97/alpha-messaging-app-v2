import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#25a61c] 800px:text-[#fcff3b]"
                  : "text-black 800px:text-[#fff]"
              } font-[500] px-6 cursor-pointer pb-[30px] 800px:pb-0`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
