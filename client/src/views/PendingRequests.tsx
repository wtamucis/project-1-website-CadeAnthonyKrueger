import './PendingRequests.scss';
import FieldsetDetails from '../components/FieldsetDetails';
import Button from '../components/Button';
import useBriefStore from '../stores/BriefStore';

const PendingRequests = () => {

    const pendingRequests = useBriefStore(state => state.form.pendingRequests);
    const setPendingRequests = (index: number, key: string, value: string) => {
        const updated = [...pendingRequests];
        updated[index] = { ...updated[index], [key]: value };
        return updated;
    };
    const updateSlice = useBriefStore(s => s.updateSlice);

    const fields = { 'missionNumber': '', 'waitReason': '' };

    const UIFields = [
        {
            key: "missionNumber",
            label: "Request #",
            type: "input",
            placeholder: "ex. 25-12345",
        },
        {
            key: "waitReason",
            label: "What are we waiting for?",
            type: "textarea",
            placeholder: "ex. A1 to finish request 25-17745; then RTB",
        }
    ];

    const handleAddPendingRequest = () => {
        updateSlice("pendingRequests", [...pendingRequests, fields]);
    };

    const handleRemovePendingRequest = (index: number) => {
        const temp = pendingRequests.filter((_, i) => i !== index);
        updateSlice('pendingRequests', temp);
    };

    const updatePendingRequests = (index: number, key: string, value: string) => {
        const newArray = setPendingRequests(index, key, value);
        updateSlice("pendingRequests", newArray);
    };

    return (
        <fieldset className="PendingRequests">
            <legend>Pending Requests</legend>
            {pendingRequests.length === 0 ? (
                <div className="NoPendingRequests">No Pending Requests</div>
            ) : (
                pendingRequests.map((request, index) => (
                    <FieldsetDetails
                        key={index}
                        fields={request}
                        UIFields={UIFields}
                        updater={(k: string, v: string) => updatePendingRequests(index, k, v)}
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