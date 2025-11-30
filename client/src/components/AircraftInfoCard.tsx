import { useEffect, useRef, useState, type FC } from 'react';
import './AircraftInfoCard.scss';
import { Tooltip } from 'react-tooltip';
import FieldsetDetails from './FieldsetDetails';
import useBriefStore from '../stores/BriefStore';
import type { AircraftStatus } from '../types/BriefFormTypes';
import useBriefFormState from '../hooks/useBriefFormState';
import { statusUI, type StatusUIItem } from '../config/AircraftStatusUI';
import { createDefaultStatus } from '../lib/StatusFactory';

interface AircraftInfoCardProps {
    index: number;
    name: string;
    type: string;
    base: string
}

const AircraftInfoCard: FC<AircraftInfoCardProps> = ({ index, name, type, base }) => {

    const { state: aircraftInfo, setState: setAircraftInfo } = useBriefFormState({ key: 'aircraftInfo', index: index });
    //const status = useBriefStore(state => state.form.aircraftInfo[index].status);
    const aircraft = useBriefStore(s => s.form.aircraftInfo[index]);

    //const aircraftInfo = useBriefStore(state => state.form.aircraftInfo[index]);

    //const [status, setStatus] = useState<number>(1);
    const [statusMenuOpen, setStatusMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleStatusChange = (newStatus: AircraftStatus["status"]) => {
        setAircraftInfo({
            ...aircraftInfo[index],
            status: createDefaultStatus(newStatus)
        });
    };

    const handleStatusMenuChange = (opening: boolean) => {
        setStatusMenuOpen(opening);
    };

    const handleLocationInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;

        // Reset height first so shrink works
        el.rows = 1;

        // If content overflows, grow rows
        if (el.scrollHeight > el.clientHeight) {
            el.rows = 2;
        }

        setAircraftInfo({
            ...aircraftInfo[index],
            location: el.value
        });
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

    if (!aircraft) return null; // or loading component

    const status = aircraft.status;
    const location = aircraft.location;

    return (
        <div className="AircraftInfoCard">
            <div className='AircraftStatusIndicator' style={{ backgroundColor: statusUI[status.status].color }}/>
            <label className="AircraftInfoLabel" htmlFor='ac'>
                <div className='AircraftNameAndTitle'>
                    <div className="AircraftName">{name}</div>
                    {statusUI[status.status].subtitle}
                    <div className='LocationDetailsContainer' >
                        <div className='LocationIcon'/>
                        <textarea 
                            className='Input location' 
                            onInput={handleLocationInput}
                            defaultValue={base}
                            rows={1}
                            data-tooltip-id='Il'
                            data-tooltip-content='Edit Location'
                        />
                        <Tooltip id='Il' place="bottom" />
                    </div>
                </div>
                <div 
                    id="ac" className="AircraftImage" 
                    style={{ 
                        //backgroundImage: `url(/apollo_${type}.png)`,
                        WebkitMaskImage: `url(/apollo_${type}.png)`,
                        maskImage: `url(/apollo_${type}.png)`,
                        backgroundColor: statusUI[status.status].color
                    }}
                    onClick={() => handleStatusMenuChange(true)}
                    data-tooltip-id={`${name}`}
                    data-tooltip-content='Set Status'
                />
                <Tooltip id={`${name}`} place="top" />
                {statusMenuOpen && (
                    <div className="StatusMenu" ref={menuRef}>
                        {(Object.entries(statusUI) as [AircraftStatus["status"], StatusUIItem][]).map(
                        ([key, status]) => (
                            <div
                            key={key}
                            className="StatusOption"
                            onClick={() => {
                                handleStatusChange(key); 
                                handleStatusMenuChange(false);
                            }}
                            >
                            <div
                                className="StatusColor"
                                style={{ backgroundColor: status.color }}
                            />
                            <div className="StatusTitle">{key}</div>
                            </div>
                        )
                        )}
                    </div>
                    )}
            </label>
            <FieldsetDetails fields={statusUI[status.status].fields} />
        </div>
    );
};

export default AircraftInfoCard;