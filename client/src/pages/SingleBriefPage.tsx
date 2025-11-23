import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';
import NameAdderComponent from '../components/NameAdderComponent';
import './SingleBriefPage.scss'
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const SingleBriefPage = () => {

    const [date, setDate] = useState<Date | null>(new Date());

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
            </form>
            <AppFooter/>
        </div>
     );

}

export default SingleBriefPage;