import { useEffect, useRef, useState, type FC } from 'react';
import './AircraftInfo.scss';
import { Tooltip } from 'react-tooltip';
import FieldsetDetails from './FieldsetDetails';

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
            label: "Weather Green",
            color: "#26AF4C",
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: "#26AF4C" }}>Green</span>
                </div>
            ),
            fields: [
                {
                    key: "green_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} will have a late medic @ 0030.`,
                },
            ],
        },

        {
            label: "Weather Yellow",
            color: "#FED701",
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: "#FED701" }}>Yellow</span>
                </div>
            ),
            fields: [
                {
                    key: "yellow_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} will have a late nurse @ 2130.`,
                },
            ],
        },

        {
            label: "Weather Red",
            color: "#FC3533",
            subtitle: (
                <div className="AircraftSubtitle">
                    Weather <span style={{ color: "#FC3533" }}>Red</span>
                </div>
            ),
            fields: [
                {
                    key: "wx_eta",
                    label: "Wx ETA",
                    type: "input",
                    placeholder: "ex. 1610 for potential wx improvement",
                },
                {
                    key: "red_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} is reposioned at their aiport for weather`,
                },
            ],
        },

        {
            label: "On Mission",
            color: "#1A2878",
            subtitle: <div className="AircraftSubtitle">On Mission</div>,
            fields: [
                {
                    key: "mission_num",
                    label: "Mission #",
                    type: "input",
                    placeholder: "ex. 25-12345",
                },
                {
                    key: "mission_step",
                    label: "Next Step",
                    type: "input",
                    placeholder: "ex. En route sending",
                },
                {
                    key: "mission_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} will have MTX from 2130 to 2000`,
                },
            ],
        },

        {
            label: "Out of Service",
            color: "#686868",
            subtitle: <div className="AircraftSubtitle">Out of Service</div>,
            fields: [
                {
                    key: "oos_reason",
                    label: "Reason",
                    type: "input",
                    placeholder: "ex. Scheduled Maintenance",
                },
                {
                    key: "oos_rts",
                    label: "Est. RTS",
                    type: "input",
                    placeholder: "ex. 2100",
                },
                {
                    key: "oos_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} base OOS. Flights being diverted to KAMA`,
                },
            ],
        },

        {
            label: "Response Delay",
            color: "#7D5CFF",
            subtitle: <div className="AircraftSubtitle">Response Delay</div>,
            fields: [
                {
                    key: "delay_reason",
                    label: "Delay",
                    type: "input",
                    placeholder: "ex. Refilling of oxygen at KTDW",
                },
                {
                    key: "delay_rts",
                    label: "Est. RTS",
                    type: "input",
                    placeholder: "ex. 1510",
                },
                {
                    key: "delay_notes",
                    label: "Notes",
                    type: "textarea",
                    placeholder: `ex. ${name} crew rest end 2133`,
                },
            ],
        },
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
                    <div className='LocationDetailsContainer' >
                        <div className='LocationIcon'/>
                        <input 
                            className='Input location' 
                            defaultValue={base}
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
                        backgroundColor: statusList[status].color
                    }}
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
            <FieldsetDetails fields={statusList[status].fields} />
        </div>
    );
};

export default AircraftInfo;