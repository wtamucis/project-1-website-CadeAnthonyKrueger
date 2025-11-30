import { useState } from 'react';
import './PendingRequests.scss';
import FieldsetDetails from '../components/FieldsetDetails';
import Button from '../components/Button';

const PendingRequests = () => {

    const [pendingRequests, setPendingRequests] = useState<number[]>([]);

    const fields = [
        {
            key: "request_number",
            label: "Request #",
            type: "input",
            placeholder: "ex. 25-12345",
        },
        {
            key: "waiting_for",
            label: "What are we waiting for?",
            type: "textarea",
            placeholder: "ex. A1 to finish request 25-17745; then RTB",
        }
    ];

    const handleAddPendingRequest = () => {
        setPendingRequests(prev => ([...prev, Date.now()]));
    };

    const handleRemovePendingRequest = (index: number) => {
        setPendingRequests(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <fieldset className="PendingRequests">
            <legend>Pending Requests</legend>
            {pendingRequests.length === 0 ? (
                <div className="NoPendingRequests">No Pending Requests</div>
            ) : (
                pendingRequests.map((id, index) => (
                    <FieldsetDetails
                        key={id}
                        fields={fields}
                        subclass="pendingRequestsFieldset"
                    >
                        <div 
                            className='RemovePendingRequest'
                            onClick={() => handleRemovePendingRequest(index)}
                        />
                    </FieldsetDetails>
                ))
            )}
            <Button text={'+ Add Request'} onClick={handleAddPendingRequest} margin="10px"/>
        </fieldset>
    );

}

export default PendingRequests;