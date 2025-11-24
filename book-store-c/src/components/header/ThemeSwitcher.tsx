import { useContext } from "react";
import { ThemeName } from "../../style/theme";
import { ThemeContext } from "../../context/ThemeContext";

// interface Props {
//     themeName : ThemeName;
//     setThemeName : (themeName : ThemeName) => void;
// }

function ThemeSwitcher() {

    const {themeName, toggleTheme} = useContext(ThemeContext);

    // const toggleTheme = () => {
    //     setThemeName(themeName === "light" ? "dark" : "light");
    // }

    return (
        <button onClick={toggleTheme}>{themeName}</button>
    )
}

export default ThemeSwitcher;