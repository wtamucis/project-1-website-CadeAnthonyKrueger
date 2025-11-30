import { useState, useEffect } from "react";
import "./DarkModeToggle.scss"

const DarkModeToggle = () => {

    const [displayMode, setDisplayMode] = useState(localStorage.getItem("theme") || "dark");
    const [isAnimated, setIsAnimated] = useState(false);

    // apply the saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem("theme") || "dark";

        if (saved === "light") {
            document.getElementById("root")?.classList.add("LightMode");
        } else {
            document.getElementById("root")?.classList.remove("LightMode");
        }
    }, []);

    const handleDarkModeToggle = () => {
        setIsAnimated(true);

        setTimeout(() => {
            if (displayMode == "dark") {
                document.getElementById("root")?.classList.add("LightMode");
                localStorage.setItem("theme", "light");
            } else {
                document.getElementById("root")?.classList.remove("LightMode");
                localStorage.setItem("theme", "dark");
            }
        }, 800);
    };

    const handleAnimationEnd = () => {
        setDisplayMode(prev => prev == "dark" ? "light" : "dark");
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