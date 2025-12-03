import { useNavigate } from 'react-router-dom'
import './NavBar.scss'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Fragment } from 'react/jsx-runtime';

interface NavBarProps {
    isVisible: boolean;
}

const NavBar = ({ isVisible }: NavBarProps) => {

    const navigate = useNavigate();

    const navItems = [
        { title: "Home", icon: "home.png", func: () => navigate('/start') },
        { title: "Shift Briefs", icon: "shift-briefs.png", func: () => navigate('/briefs') }
    ];

    return (
        <div className={`NavBar ${isVisible ? "visible" : ""}`}>
            {navItems.map((el, index) => (
                <Fragment key={index}>
                    <div  
                        className="NavItem" 
                        style={{ backgroundImage: `url(/${el.icon})`}}
                        onClick={el.func}
                        data-tooltip-id={`${el.title}`}
                        data-tooltip-content={`${el.title}`}
                    ></div>
                    <Tooltip id={`${el.title}`} place="right" />
                </Fragment>
            ))}
        </div>
    );

}

export default NavBar;