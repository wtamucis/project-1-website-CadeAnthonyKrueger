/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppFooter from '../views/AppFooter';
import AppHeader from '../views/AppHeader';
import NameAdderComponent from '../components/NameAdderComponent';
import './SingleBriefPage.scss'
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PendingRequests from '../views/PendingRequests';
import SimpleOpenEndedFieldset from '../components/SimpleOpenEndedFieldset';
import Button from '../components/Button';
import useBriefStore from '../stores/BriefStore';

import AircraftInfoCard from '../components/AircraftInfoCard';
import type { BackendAircraft } from '../types/BriefFormTypes';
import useBriefFormState from '../hooks/useBriefFormState';

const SingleBriefPage = () => {

    const [fetchedAircraft, setFetchedAircraft] = useState<BackendAircraft[]>([
        { name: 'Apollo 1', type: 'plane', base: 'KTDW' },
        { name: 'Apollo 2', type: 'plane', base: 'KGUY' },
        { name: 'Apollo 3', type: 'rotor', base: 'KDHT' },
        { name: 'Apollo 4', type: 'rotor', base: 'Golden Plains' },
        { name: 'Apollo 5', type: 'rotor', base: 'Chi St. Francis' },
        { name: 'Apollo 6', type: 'plane', base: 'KDDC' },
        { name: 'Skycare', type: 'rotor', base: 'UHSA' }
    ]);

    const [fetchedNames, setFetchedNames] = useState<string[]>([ 
        "Rhyski Witness", "Cade Krueger", "Zeadyn Wall", "Jamie Gatlin", "Alyssa Spring", "Sabrina Frederick", "Jose Gonzales",
        "Candice Wheeler", "Jessica Andrews", "Matt McCall", "Katt Matuza", "Chelsi Bradfute" 
    ]);

    // This would be where the backend gets called. For now we use static aircraftInfo list.
    // useEffect(() => {
    //     fetchAircraftData().then(setFetchedAircraft);
    //     fetchPersonnelData().then(setFetchedNames);
    // }, []);

    // All Zustand state and initialization
    const initializeAircraft = useBriefStore(state => state.initializeAircraft);
    const { state: date, setState: setDate } = useBriefFormState({ key: 'date' });
    const { state: personnel, setState: setPersonnel } = useBriefFormState({ key: 'personnel' });

    const aircraftInfo = useBriefStore(state => state.form.aircraftInfo);

    console.log("Store aircraftInfo:", aircraftInfo);

    useEffect(() => {
        setDate(new Date());
        initializeAircraft(fetchedAircraft);
    }, []);

    // Debugging
    // useEffect(() => {
    //     console.log("AircraftInfo changed:", aircraftInfo);
    // }, [aircraftInfo]);

    useEffect(() => {
        const unsubscribe = useBriefStore.subscribe((state) => {
            console.log("FORM UPDATED:", state.form);
        });

        return unsubscribe; // cleanup on unmount
    }, []);

    // const handleSubmit = (e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
    //     e.preventDefault(); // prevents page refresh

    //     // Gather ALL form data (inputs, textareas, selects)
    //     const data = Object.fromEntries(new FormData(e.target));

    //     // Send it to the endpoint
    //     fetch("https://www.w3schools.com/action_page.php", {
    //         method: "POST",
    //         body: new URLSearchParams(data)
    //     })
    //     .then(res => res.text())
    //     .then(result => console.log("Response:", result))
    //     .catch(err => console.error(err));
    // };

     return (
        <div className="SingleBriefPage">
            <AppHeader/>
            <h4 style={{ textAlign: 'center' }}>Daily Shift Brief</h4>
            <form className='FormArea' action="https://www.w3schools.com/action_page.php" method="POST">
                <div className="OpenerInfoContainer">
                    <NameAdderComponent initialNames={fetchedNames} namesSelected={personnel} setNamesSelected={setPersonnel}/>
                    <div className="DateContainer">
                        <strong>Date: </strong>
                        <div className="DatePickerWrap">
                            <DatePicker
                                className='EditableDate'
                                selected={date}
                                onChange={(d) => setDate(d)}
                            />
                        </div>
                    </div>
                </div>
                <div className='MiddleInfoContainer'>
                    <div className="AircraftInfoContainer">
                        {fetchedAircraft.map((aircraft, index) => (
                            <AircraftInfoCard key={index} index={index} name={aircraft.name} type={aircraft.type} base={aircraft.base}/>
                        ))}
                    </div>
                    <div className='OpenEndedInfoContainer'>
                        <PendingRequests/>
                        <SimpleOpenEndedFieldset 
                            title='Any NICU/hospital diversions?'
                            placeholder='ex. BSA ER no trauma beds available; divert to NWTH'
                        />
                        <SimpleOpenEndedFieldset 
                            title='Any scheduled transports, PR events, or repositions planned?'
                            placeholder='ex. A4 schedueled for PR at stadium at 1400'
                        />
                        <SimpleOpenEndedFieldset
                            title='Verify UHV radio has Apollo selected and NOT muted, PTTs, iPhone, & iPads are charged'
                            placeholder='ex. All charged and unmuted'
                        />
                        <SimpleOpenEndedFieldset
                            title='Other Notes'
                            placeholder='ex. Apollo Ambulance is out for mtx'
                        />
                    </div>
                </div>
                <div className='FormButtonArea'>
                    <Button text='Save & Continue' buttonStyle='alt' margin='5px' width='121px'/>
                    <Button text='Submit Brief' type='submit' iconPath='forward.png' margin='5px' width='121px'/>
                </div>
            </form>
            <AppFooter/>
        </div>
     );

}

export default SingleBriefPage;