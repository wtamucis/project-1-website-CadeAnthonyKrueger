import DarkModeToggle from "./DarkModeToggle"
import './AppHeader.scss'

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

const AppHeader = () => {

    const [isNavDisplayed, setIsNavDisplayed] = useState(() => {
        // initialize based on screen size BEFORE the component mounts
        return window.matchMedia("(max-width: 1155px)").matches ? false : true;
    });

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1155px)");

        const handleWidthChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setIsNavDisplayed(false);
            }
        };

        mq.addEventListener("change", handleWidthChange);
        return () => mq.removeEventListener("change", handleWidthChange);
    }, []);

    const handleNavMenuChange = () => {
        setIsNavDisplayed(prev => !prev);
    };

     return (
        <header className="AppHeader">
            <NavBar isVisible={isNavDisplayed}/>
            <div className="Menu"
                onClick={() => handleNavMenuChange()}
                data-tooltip-id="Menu"
                data-tooltip-content={`${!isNavDisplayed ? 'Open' : 'Close'} Menu`}/>
            <Tooltip id="Menu" place="right" />
            <div className="Logo"/>
            <DarkModeToggle/>
        </header>
     );

}

export default AppHeader;