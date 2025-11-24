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
            <div className='AircraftStatusDetails'>
                <div className='LocationContainer'>
                    <div 
                        className='LocationIcon' 
                        data-tooltip-id='li'
                        data-tooltip-content='Current Location'
                    />
                    <Tooltip id='li' place="top" />
                    <input className='LocationInput' type='text' value={base}/>
                </div>
            </div>
        </div>
    );
};

export default AircraftInfo;
