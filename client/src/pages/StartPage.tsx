import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import "./StartPage.scss"
import AppHeader from "../views/AppHeader";
import AppFooter from "../views/AppFooter";

const StartPage = () => {

    const featureGridItems = [
        { 
            title: "Create", 
            color: "#007BFF", 
            icon: "create.png", 
            text: "Quickly start a new shift brief with all required details." 
        },
        { 
            title: "Edit", 
            color: "#FF6600", 
            icon: "edit.png", 
            text: "Update existing shift briefs to keep information accurate." 
        },
        { 
            title: "Manage", 
            color: "#dc143c", 
            icon: "manage.png", 
            text: "Organize, archive, or remove shift briefs as needed." 
        },
        { 
            title: "Review", 
            color: "#65e258", 
            icon: "review.png", 
            text: "Browse your saved briefs, sorted automatically by date." 
        }
    ];

    const navigate = useNavigate();

    return (
        <div className="StartPage">
            <AppHeader/>
            <h1>Apollo Shift Briefs</h1>
            <section className="StartContent">
                <h3>Purpose:</h3>
                <p>This application serves as a unified hub for Apollo MedFlight’s communication center, giving staff a simple way to oversee the entire shift-brief lifecycle. It brings everything into one place so teams can stay aligned, maintain continuity between rotations, and access important information without jumping between separate tools or scattered notes.</p>
                <div className="FeatureGrid">
                    {[0, 2].map((start) => (
                        <div className="FeatureGridRow" key={start}>
                            {featureGridItems.slice(start, start + 2).map((item, idx) => (
                                <FeatureCard key={idx} title={item.title} color={item.color} icon={item.icon} text={item.text}/>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate("/briefs")} className="StartButton">Get Started!</button>
            </section>
            <AppFooter/>
        </div>
    )
}

export default StartPage;