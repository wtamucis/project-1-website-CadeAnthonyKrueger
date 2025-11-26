import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import NameAdderComponent from '../components/NameAdderComponent';
import './SingleBriefPage.scss'
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AircraftInfo from '../components/AircraftInfo';

const SingleBriefPage = () => {

    const [date, setDate] = useState<Date | null>(new Date());

    const aircraftInfo = [
        { name: 'Apollo 1', type: 'plane', base: 'KTDW' },
        { name: 'Apollo 2', type: 'plane', base: 'KGUY' },
        { name: 'Apollo 3', type: 'rotor', base: 'KDHT' },
        { name: 'Apollo 4', type: 'rotor', base: 'Golden Plains' },
        { name: 'Apollo 5', type: 'rotor', base: 'Chi St. Francis' },
        { name: 'Apollo 6', type: 'plane', base: 'KDDC' },
        { name: 'Skycare', type: 'rotor', base: 'UHSA' }
    ];

    const handleSubmit = (e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
        e.preventDefault(); // prevents page refresh

        // Gather ALL form data (inputs, textareas, selects)
        const data = Object.fromEntries(new FormData(e.target));

        // Send it to the endpoint
        fetch("https://www.w3schools.com/action_page.php", {
            method: "POST",
            body: new URLSearchParams(data)
        })
        .then(res => res.text())
        .then(result => console.log("Response:", result))
        .catch(err => console.error(err));
    };


     return (
        <div className="SingleBriefPage">
            <AppHeader/>
            <h4 style={{ textAlign: 'center' }}>Daily Shift Brief</h4>
            <form className='FormArea' action="https://www.w3schools.com/action_page.php" method="POST">
                <div className="OpenerInfoContainer">
                    <NameAdderComponent/>
                    <div className="DateContainer">
                        <strong>Date: </strong>
                        <div className="DatePickerWrap">
                            <DatePicker
                                className='EditableDate'
                                selected={date}
                                onChange={(d) => setDate(d) }
                            />
                        </div>
                    </div>
                </div>
                <div className='MiddleInfoContainer'>
                    <div className="AircraftInfoContainer">
                        {aircraftInfo.map((aircraft) => (
                            <AircraftInfo name={aircraft.name} type={aircraft.type} base={aircraft.base}/>
                        ))}
                    </div>
                    <div className='OpenEndedInfoContainer'>
                        
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <AppFooter/>
        </div>
     );

}

export default SingleBriefPage;