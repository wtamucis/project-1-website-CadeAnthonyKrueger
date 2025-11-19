import DarkModeToggle from "../components/DarkModeToggle";
import "./StartPage.scss"

const StartPage = () => {

    return (
        <div className="StartPage">
            <header>
                <div className="Logo"/>
                <DarkModeToggle/>
            </header>
        </div>
    )
}

export default StartPage;