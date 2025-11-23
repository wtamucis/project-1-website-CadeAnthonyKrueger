import { useState, type FC } from 'react';
import './AircraftInfo.scss';
import { Tooltip } from 'react-tooltip';

interface AircraftInfoProps {
    name: string;
    type: string;
}

const AircraftInfo: FC<AircraftInfoProps> = ({ name, type }) => {

    const [status, setStatus] = useState<number>(1);
    const [statusMenuOpen, setStatusMenuOpen] = useState<boolean>(false);

    const statusList = [
        { label: 'Weather Green',  color: '#479755', common: 'green' },
        { label: 'Weather Yellow', color: '#FED701', common: 'yellow' },
        { label: 'Weather Red',    color: '#FC3533', common: 'red' },
        { label: 'On Mission',     color: '#1A2878', common: 'blue' },
        { label: 'Out of Service', color: '#686868', common: 'gray' }
    ];

    const handleStatusMenuChange = (opening: boolean) => {
        setStatusMenuOpen(opening);
    };

    return (
        <div className="AircraftInfo">
            <label className="AircraftInfoLabel" htmlFor='ac'>
                {name}
                <div 
                    id="ac" className="AircraftImage" 
                    style={{ 
                        backgroundImage: `url(/apollo_${type}_${statusList[status].common}.png)`,
                        aspectRatio: `${type == 'rotor' ? '1536' : '1024'}/1024`
                    }}
                    onClick={() => handleStatusMenuChange(true)}
                    data-tooltip-id={`${name}`}
                    data-tooltip-content='Set Status'
                />
                <Tooltip id={`${name}`} place="right" />
                {statusMenuOpen && <div 
                    className="StatusMenu">
                    {statusList.map((status, index) => (
                        <div key={index} className='StatusOption' 
                            onClick={() => { setStatus(index); handleStatusMenuChange(false); }}>
                            <div className="StatusColor" style={{ backgroundColor: status.color }}/>
                            <div className="StatusTitle">{status.label}</div>
                        </div>
                    ))}
                </div>}
            </label>
        </div>
    );
};

export default AircraftInfo;
