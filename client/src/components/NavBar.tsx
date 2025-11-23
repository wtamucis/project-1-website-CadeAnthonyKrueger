import { useNavigate } from 'react-router-dom'
import './NavBar.scss'

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface NavBarProps {
    isVisible: boolean;
}

const NavBar = ({ isVisible }: NavBarProps) => {

    const navigate = useNavigate();

    const navItems = [
        { title: "Home", icon: "home.png", func: () => navigate('/start') },
        { title: "Shift Briefs", icon: "shift-briefs.png", func: () => navigate('/briefs') }
    ]
    
    // Just change it's left property from 12.5 to -100
    return (
        <div className={`NavBar ${isVisible ? "visible" : ""}`}>
            {navItems.map((el, index) => (
                <>
                    <div 
                        key={index} 
                        className="NavItem" 
                        style={{ backgroundImage: `url(/${el.icon})`}}
                        onClick={el.func}
                        data-tooltip-id={`${el.title}`}
                        data-tooltip-content={`${el.title}`}
                    ></div>
                    <Tooltip id={`${el.title}`} place="right" />
                </>
            ))}
        </div>
    )

}

export default NavBar;