import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark"); // Default theme is 'dark'

  // Function to toggle between themes
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme preference to local storage
  };

  // Apply selected theme to the body element
  useEffect(() => {
    document.body.classList.remove(
      "light",
      "dark",
      "theme2",
      "theme3",
      "theme4"
    ); // Remove existing theme classes
    document.body.classList.add(theme); // Add class for selected theme
  }, [theme]);

  // Load theme preference from local storage on initial render
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
