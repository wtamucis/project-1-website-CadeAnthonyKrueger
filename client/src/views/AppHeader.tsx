import DarkModeToggle from "../components/DarkModeToggle"
import './AppHeader.scss'

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

const AppHeader = () => {

    // tracks nav open state
    const [isNavDisplayed, setIsNavDisplayed] = useState(() => {
        return window.matchMedia("(max-width: 1060px)").matches ? false : true;
    });

    // tracks if screen is small (<=1060)
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.matchMedia("(max-width: 1060px)").matches
    );

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1060px)");

        const handleWidthChange = (e: MediaQueryListEvent) => {
            setIsSmallScreen(e.matches); // update small screen state
            if (e.matches) setIsNavDisplayed(false); // auto-close on shrink
        };

        mq.addEventListener("change", handleWidthChange);
        return () => mq.removeEventListener("change", handleWidthChange);
    }, []);

    const handleNavMenuChange = () => {
        setIsNavDisplayed(prev => !prev);
    };

    return (
        <>
            {(isNavDisplayed && isSmallScreen) && (
                <div className="OverlayBlur" />
            )}

            <header className="AppHeader">
                <NavBar isVisible={isNavDisplayed} />

                <div 
                    className="Menu"
                    onClick={handleNavMenuChange}
                    data-tooltip-id="Menu"
                    data-tooltip-content={`${!isNavDisplayed ? 'Open' : 'Close'} Menu`}
                />

                <Tooltip id="Menu" place="right" />
                <div className="Logo" />
                <DarkModeToggle />
            </header>
        </>
    );
}

export default AppHeader;