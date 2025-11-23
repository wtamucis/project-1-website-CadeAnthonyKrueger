import { useNavigate } from "react-router-dom";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import "./ContentPage.scss";
import Record from "../components/Record";

const ContentPage = () => {

    const fakeEntries = [
        { 
            title: "12-15-2023 CK-RW-AS",
            dateModified: "12-16-2023",
            modifiedBy: "RWitness"
        },
        { 
            title: "01-04-2024 JD-CK-AM",
            dateModified: "01-05-2024",
            modifiedBy: "CKrueger"
        },
        { 
            title: "02-11-2024 AS-JM-LB",
            dateModified: "02-12-2024",
            modifiedBy: "LMason"
        },
        { 
            title: "03-22-2024 RW-CK-JD",
            dateModified: "03-23-2024",
            modifiedBy: "RWitness"
        },
        { 
            title: "04-02-2024 AM-RW-AS",
            dateModified: "04-03-2024",
            modifiedBy: "AScott"
        },
        { 
            title: "12-15-2023 CK-RW-AS",
            dateModified: "12-16-2023",
            modifiedBy: "RWitness"
        },
        { 
            title: "01-04-2024 JD-CK-AM",
            dateModified: "01-05-2024",
            modifiedBy: "CKrueger"
        },
        { 
            title: "02-11-2024 AS-JM-LB",
            dateModified: "02-12-2024",
            modifiedBy: "LMason"
        },
        { 
            title: "03-22-2024 RW-CK-JD",
            dateModified: "03-23-2024",
            modifiedBy: "RWitness"
        },
        { 
            title: "04-02-2024 AM-RW-AS",
            dateModified: "04-03-2024",
            modifiedBy: "AScott"
        },
        { 
            title: "12-15-2023 CK-RW-AS",
            dateModified: "12-16-2023",
            modifiedBy: "RWitness"
        },
        { 
            title: "01-04-2024 JD-CK-AM",
            dateModified: "01-05-2024",
            modifiedBy: "CKrueger"
        },
        { 
            title: "02-11-2024 AS-JM-LB",
            dateModified: "02-12-2024",
            modifiedBy: "LMason"
        },
        { 
            title: "03-22-2024 RW-CK-JD",
            dateModified: "03-23-2024",
            modifiedBy: "RWitness"
        },
        { 
            title: "04-02-2024 AM-RW-AS",
            dateModified: "04-03-2024",
            modifiedBy: "AScott"
        }
    ];


    const navigate = useNavigate();

    const handleCreateNew = () => {
        // this is where we will add to the database
        // const today = new Date().toLocaleDateString();
        navigate('/single-brief');
    }

    return (
        <div className="ContentPage">
            <AppHeader/>
            <div className="ContentArea">
                <section className="DataSection">
                    <h4>Shift Briefs</h4>
                    <div className="OptionsArea">
                        <button 
                            className="NewButton"
                            onClick={handleCreateNew}
                        >Create New +</button>
                    </div>
                    <div className="BriefsDataArea">
                        <div className="BriefsDataFilterSection">
                            <div className="FileName">Name:</div>
                            <div className="DateModified">Date Modified:</div>
                            <div className="ModifiedBy">Modified By:</div>
                        </div>
                        <div className="BriefsDataEntries">
                            {fakeEntries.map((el, index) => (
                                <Record 
                                    key={index} title={el.title} dateModified={el.dateModified}
                                    modifiedBy={el.modifiedBy}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <AppFooter/>
        </div>
    )

};

export default ContentPage;