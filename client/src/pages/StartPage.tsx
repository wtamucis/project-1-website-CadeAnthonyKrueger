import DarkModeToggle from "../components/DarkModeToggle";
import FeatureCard from "../components/FeatureCard";
import "./StartPage.scss"

const StartPage = () => {

    const featureGridItems = [
        { 
            title: "Create", 
            color: "lightblue", 
            icon: "create.png", 
            text: "Quickly start a new shift brief with all required details." 
        },
        { 
            title: "Edit", 
            color: "orange", 
            icon: "edit.png", 
            text: "Update existing shift briefs to keep information accurate." 
        },
        { 
            title: "Manage", 
            color: "crimson", 
            icon: "manage.png", 
            text: "Organize, archive, or remove shift briefs as needed." 
        },
        { 
            title: "Review", 
            color: "#65e258ff", 
            icon: "review.png", 
            text: "Browse your saved briefs, sorted automatically by date." 
        }
    ];

    return (
        <div className="StartPage">
            <header>
                <div className="Logo"/>
                <DarkModeToggle/>
            </header>
            <h1>Apollo Shift Briefs</h1>
            <section className="StartContent">
                <p>This is sample text meant to show how much space we want our purpose statement to take up. I will keep writing stuff until it looks like it is enough. Two and a half lines is probably ideal. I'm not there yest so I will write a bit more and now I should be. Wait I lied, I just need a couple more words and we're good.</p>
                <div className="FeatureGrid">
                    {featureGridItems.map((item, index) => (
                        <FeatureCard key={index} title={item.title} color={item.color} icon={item.icon} text={item.icon}/>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default StartPage;