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
        { name: 'Apollo 1', type: 'plane' },
        { name: 'Apollo 2', type: 'plane' },
        { name: 'Apollo 3', type: 'rotor' },
        { name: 'Apollo 4', type: 'rotor' },
        { name: 'Apollo 5', type: 'rotor' },
        { name: 'Apollo 6', type: 'plane' },
        { name: 'Skycare', type: 'rotor' }
    ];

     return (
        <div className="SingleBriefPage">
            <AppHeader/>
            <h4 style={{ textAlign: 'center' }}>Daily Shift Brief</h4>
            <form className='FormArea'>
                <div className="OpenerInfoContainer">
                    <NameAdderComponent/>
                    <div className="DateContainer">
                        <strong>Date: </strong>
                        <DatePicker
                            className='EditableDate'
                            selected={date}
                            onChange={(d) => setDate(d) }
                        />
                    </div>
                </div>
                <div className="AircraftInfoContainer">
                    {aircraftInfo.map((aircraft) => (
                        <AircraftInfo name={aircraft.name} type={aircraft.type}/>
                    ))}
                </div>
            </form>
            <AppFooter/>
        </div>
     );

}

export default SingleBriefPage;