/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppFooter from '../views/AppFooter';
import AppHeader from '../views/AppHeader';
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
import { useNavigate } from 'react-router-dom';
import { convertToSaveName } from '../utils/DateToName';
import { convertDateToString, convertStringToDate } from '../utils/ConvertDateType';
import { useUserStore } from '../stores/UserStore';
import type { User } from '../types/UserTypes';
import MultiSelect from '../components/MultiSelect';

const SingleBriefPage = () => {

    // Working on deleting this
    const [fetchedAircraft, setFetchedAircraft] = useState<BackendAircraft[]>([
        { name: 'Apollo 1', type: 'plane', base: 'KTDW' },
        { name: 'Apollo 2', type: 'plane', base: 'KGUY' },
        { name: 'Apollo 3', type: 'rotor', base: 'KDHT' },
        { name: 'Apollo 4', type: 'rotor', base: 'Golden Plains' },
        { name: 'Apollo 5', type: 'rotor', base: 'Chi St. Francis' },
        { name: 'Apollo 6', type: 'plane', base: 'KDDC' },
        { name: 'Skycare', type: 'rotor', base: 'UHSA' }
    ]);

    // const [fetchedNames, setFetchedNames] = useState<string[]>([ 
    //     "Rhyski Witness", "Cade Krueger", "Zeadyn Wall", "Jamie Gatlin", "Alyssa Spring", "Sabrina Frederick", "Jose Gonzales",
    //     "Candice Wheeler", "Jessica Andrews", "Matt McCall", "Katt Matuza", "Chelsi Bradfute" 
    // ]);

    // UI state and hooks
    const navigate = useNavigate();

    // All BriefStore state and initialization
    const briefForm = useBriefStore(state => state.form);
    const initializeAircraft = useBriefStore(state => state.initializeAircraft);
    const updateSlice = useBriefStore(s => s.updateSlice);
    const { state: briefDate, setState: setBriefDate } = useBriefFormState({ key: 'briefDate' });
    const { state: personnelIds, setState: setPersonnelIds } = useBriefFormState({ key: 'personnelIds' });
    const { state: nicuNotes, setState: setNicuNotes } = useBriefFormState({ key: 'nicuNotes' });
    const { state: scheduledTransportNotes, setState: setScheduledTransportNotes } = useBriefFormState({ key: 'scheduledTransportNotes' });
    const { state: deviceStatusNotes, setState: setDeviceStatusNotes } = useBriefFormState({ key: 'deviceStatusNotes' });
    const { state: otherNotes, setState: setOtherNotes } = useBriefFormState({ key: 'otherNotes' });

    // UserStore state
    const users = useUserStore(s => s.users);
    const getUserNames = useUserStore(s => s.getUserNames);

    // Handler functions
    // Submission logic will offload to the backend eventually. Our current setup relies on session storage
    const handleSubmit = () => {
        sessionStorage.setItem("output", JSON.stringify(briefForm));
        navigate("/output");
    };

    // Effects
    useEffect(() => {
        const date = new Date().toISOString();
        console.log("initial render " + date)
        setBriefDate(date);
        updateSlice('createdAt', date);
        initializeAircraft(fetchedAircraft);
    }, []);

    useEffect(() => {
        updateSlice('briefSaveName', convertToSaveName(briefDate, getUserNames(personnelIds)));
    }, [briefDate, personnelIds]);

    // Debugging /////////////////////////////////////////////////////
    useEffect(() => {
        const unsubscribe = useBriefStore.subscribe((state) => {
            console.log("FORM UPDATED:", state.form);
        });

        return unsubscribe; // cleanup on unmount
    }, []);
    //////////////////////////////////////////////////////////////////

     return (
        <div className="SingleBriefPage">
            <AppHeader/>
            <h4 style={{ textAlign: 'center' }}>Daily Shift Brief</h4>
            <form className='FormArea' onSubmit={handleSubmit}>
                <div className="OpenerInfoContainer">
                    <MultiSelect<User> 
                        items={users} 
                        selectedItems={personnelIds} 
                        setSelectedItems={setPersonnelIds} 
                        getLabel={(u) => u.name}
                        getId={(u) => u.id}
                        tooltipLabel='Name'
                    />
                    <div className="DateContainer">
                        <strong>Date: </strong>
                        <div className="DatePickerWrap">
                            <DatePicker
                                className="EditableDate"
                                selected={convertStringToDate(briefDate)}
                                onChange={(date) => { console.log(typeof date); setBriefDate(convertDateToString(date)); }}
                            />
                        </div>
                    </div>
                </div>
                <div className='MiddleInfoContainer'>
                    <div className="AircraftInfoContainer">
                        {fetchedAircraft.map((aircraft, index) => (
                            <AircraftInfoCard key={index} index={index} name={aircraft.name} type={aircraft.type}/>
                        ))}
                    </div>
                    <div className='OpenEndedInfoContainer'>
                        <PendingRequests/>
                        <SimpleOpenEndedFieldset 
                            title='Any NICU/hospital diversions?'
                            placeholder='ex. BSA ER no trauma beds available; divert to NWTH'
                            value={nicuNotes}
                            updater={setNicuNotes}
                        />
                        <SimpleOpenEndedFieldset 
                            title='Any scheduled transports, PR events, or repositions planned?'
                            placeholder='ex. A4 schedueled for PR at stadium at 1400'
                            value={scheduledTransportNotes}
                            updater={setScheduledTransportNotes}
                        />
                        <SimpleOpenEndedFieldset
                            title='Verify UHV radio has Apollo selected and NOT muted, PTTs, iPhone, & iPads are charged'
                            placeholder='ex. All charged and unmuted'
                            value={deviceStatusNotes}
                            updater={setDeviceStatusNotes}
                        />
                        <SimpleOpenEndedFieldset
                            title='Other Notes'
                            placeholder='ex. Apollo Ambulance is out for mtx'
                            value={otherNotes}
                            updater={setOtherNotes}
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