import { useState } from "react";
import "./DarkModeToggle.scss"

const DarkModeToggle = () => {

    const [displayMode, setDisplayMode] = useState("dark")
    const [isAnimated, setIsAnimated] = useState(false);

    const handleDarkModeToggle = () => {
        setIsAnimated(true);
        setTimeout(() => {
            if (displayMode == "dark") {
                document.getElementById("root")?.classList.add("LightMode");
            } else {
                document.getElementById("root")?.classList.remove("LightMode");
            }
        }, 800);
    };

    const handleAnimationEnd = () => {
        setDisplayMode(prev => prev == "dark" ? "light" : "dark")
        setIsAnimated(false);
    };

    return (
        <div
            onClick={handleDarkModeToggle}
            onAnimationEnd={handleAnimationEnd}
            className={`DarkModeToggle ${displayMode} ${isAnimated ? "animated" : ""}`}
        />
    );
};

export default DarkModeToggle;
