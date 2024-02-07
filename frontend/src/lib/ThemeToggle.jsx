import React, { useEffect, useState } from "react";
import useFetcher from "../redux/hooks/useFetcher";

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
    <div>
      <ul>
        <li>
          <button onClick={() => toggleTheme("light")}>Light Theme</button>
        </li>
        <li>
          <button onClick={() => toggleTheme("dark")}>Dark Theme</button>
        </li>
        <li>
          <button onClick={() => toggleTheme("theme2")}>Theme 2</button>
        </li>
        <li>
          <button onClick={() => toggleTheme("theme3")}>Theme 3</button>
        </li>
        <li>
          <button onClick={() => toggleTheme("theme4")}>Theme 4</button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeToggle;
