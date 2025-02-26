import { useDarkMode } from "../hooks/useDarkMode";
import "../styles/Switch.css";
import { FaMoon, FaSun } from "react-icons/fa";

export const Switch = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      className={`cursor-pointer w-7 h-4 md:w-[50px] md:h-7 switch-btn ${
        isDark ? "toggled" : ""
      } `}
      onClick={toggleDarkMode}
    >
      <div className="h-3 w-3 md:h-5 md:w-5 switch flex items-center">
        {isDark ? (
          <FaMoon color="gray" size={20} />
        ) : (
          <FaSun color="green" size={20} />
        )}
      </div>
    </button>
  );
};
