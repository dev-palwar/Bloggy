import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
      label={darkMode ? "Dark Mode" : "Light Mode"}
      style={{ color: theme.palette.text.primary }}
    />
  );
};

export default DarkModeToggle;
