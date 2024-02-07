import React, { useEffect, useState } from "react";
import useFetcher from "../redux/hooks/useFetcher";
import sunImage from "../assets/sun.svg";
import moonImage from "../assets/moon.svg";

const ThemeToggle = () => {
  const { selectedTheme, setSelectedTheme } = useFetcher();
  console.log(selectedTheme);

  const [theme, setTheme] = useState("dark");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.classList.remove(
      "light",
      "dark",
      "theme2",
      "theme3",
      "theme4"
    );
    document.body.classList.add(theme);
    setSelectedTheme(theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <div className="bg-button flex justify-center items-center space-x-4 rounded-full p-1">
      <button
        className="focus:outline-none"
        onClick={() => toggleTheme("light")}
      >
        <img
          src={sunImage}
          alt="Sun"
          className={`w-8 h-8 transition duration-500 ${
            theme === "light" ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
      <button
        className="focus:outline-none"
        onClick={() => toggleTheme("dark")}
      >
        <img
          src={moonImage}
          alt="Moon"
          className={`w-8 h-8 transition duration-500 ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
