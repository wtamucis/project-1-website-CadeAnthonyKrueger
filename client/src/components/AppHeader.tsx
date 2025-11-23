import DarkModeToggle from "./DarkModeToggle"
import './AppHeader.scss'

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import NavBar from "./NavBar";
import { useState } from "react";

const AppHeader = () => {

    const [isNavDisplayed, setIsNavDisplayed] = useState<boolean>(true);

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