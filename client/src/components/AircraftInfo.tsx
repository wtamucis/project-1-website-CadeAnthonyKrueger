import { useEffect, useRef, useState, type FC } from 'react';
import './AircraftInfo.scss';
import { Tooltip } from 'react-tooltip';

interface AircraftInfoProps {
    name: string;
    type: string;
    base: string
}

const AircraftInfo: FC<AircraftInfoProps> = ({ name, type, base }) => {

    const [status, setStatus] = useState<number>(1);
    const [statusMenuOpen, setStatusMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    
    const statusList = [
        { 
            label: 'Weather Green',
            color: '#479755',
            common: 'green',
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: '#479755' }}>Green</span>
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                    </div>
                </div>
            )
        },
        { 
            label: 'Weather Yellow',
            color: '#FED701',
            common: 'yellow',
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: '#FED701' }}>Yellow</span>
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                        <textarea className='Input detail multitext' placeholder={`ex. ${name} will have a late nurse @ 2130.`}/>
                    </div>
                </div>
            )
        },
        { 
            label: 'Weather Red',
            color: '#FC3533',
            common: 'red',
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: '#FC3533' }}>Red</span>
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Wx ETA</div>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                        <input className='Input detail' type='text' placeholder='ex. 1610 for potential wx improvement'></input>
                        <textarea className='Input detail multitext' placeholder={`ex. ${name} is reposioned at their aiport for weather`}/>
                    </div>
                </div>
            )
        },
        { 
            label: 'On Mission',
            color: '#1A2878',
            common: 'blue',
            subtitle: (
                <div className="AircraftSubtitle">
                    On Mission
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Mission #</div>
                        <div className='DetailLabel'>Next step</div>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                        <input className='Input detail' type='text' placeholder='ex. 25-12345'></input>
                        <input className='Input detail' type='text' placeholder='ex. En route sending'></input>
                        <textarea className='Input detail multitext' placeholder='ex. Apollo 1 will have MTX from 2130 to 2000'></textarea>
                    </div>
                </div>
            )
        },
        { 
            label: 'Out of Service',
            color: '#686868',
            common: 'gray',
            subtitle: (
                <div className="AircraftSubtitle">
                    Out of Service
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Reason</div>
                        <div className='DetailLabel'>Est. RTS</div>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                        <input className='Input detail' type='text' placeholder='ex. Schueduled Maintenence'></input>
                        <input className='Input detail' type='text' placeholder='ex. 2100'></input>
                        <textarea className='Input detail multitext' placeholder={`${name} base OOS. Flights being diverted to KAMA`}></textarea>
                    </div>
                </div>
            )
        },
        {
            label: 'Response Delay',
            color: '#7D5CFF',
            common: 'purple',
            subtitle: (
                <div className="AircraftSubtitle">
                    Response Delay
                </div>
            ),
            menuOptions: (
                <div className='AircraftStatusDetails'>
                    <div className='DetailLabels'>
                        <div className='DetailLabel'>Delay</div>
                        <div className='DetailLabel'>Est. RTS</div>
                        <div className='DetailLabel'>Notes</div>
                        <div className='DetailLabel fake'>Mission #</div>
                    </div>
                    <div className='DetailInputs'>
                        <input className='Input detail' type='text' placeholder='ex. Refilling of oxygen at KTDW'></input>
                        <input className='Input detail' type='text' placeholder='ex. 1510'></input>
                        <textarea className='Input detail multitext' placeholder={`${name} crew rest end 2133`}></textarea>
                    </div>
                </div>
            )
        }
    ];

    const handleStatusMenuChange = (opening: boolean) => {
        setStatusMenuOpen(opening);
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                handleStatusMenuChange(false); // CLOSE MENU
            }
        }

        if (statusMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [statusMenuOpen]);

    return (
        <div className="AircraftInfo">
            <div className='AircraftStatusIndicator' style={{ backgroundColor: statusList[status].color }}/>
            <label className="AircraftInfoLabel" htmlFor='ac'>
                <div className='LocationDetailsContainer' >
                    <div className='LocationIcon'/>
                    <input 
                        className='Input location' 
                        defaultValue={base}
                        data-tooltip-id='Il'
                        data-tooltip-content='Edit Location'
                    />
                    <Tooltip id='Il' place="top" />
                </div>
                <div className='AircraftNameAndTitle'>
                    <div className="AircraftName">{name}</div>
                    {statusList[status].subtitle}
                </div>
                <div 
                    id="ac" className="AircraftImage" 
                    style={{ backgroundImage: `url(/apollo_${type}_${statusList[status].common}.png)` }}
                    onClick={() => handleStatusMenuChange(true)}
                    data-tooltip-id={`${name}`}
                    data-tooltip-content='Set Status'
                />
                <Tooltip id={`${name}`} place="top" />
                {statusMenuOpen && <div className="StatusMenu" ref={menuRef}>
                    {statusList.map((status, index) => (
                        <div key={index} className='StatusOption' 
                            onClick={() => { setStatus(index); handleStatusMenuChange(false); }}>
                            <div className="StatusColor" style={{ backgroundColor: status.color }}/>
                            <div className="StatusTitle">{status.label}</div>
                        </div>
                    ))}
                </div>}
            </label>
            {statusList[status].menuOptions}
        </div>
    );
};

export default AircraftInfo;