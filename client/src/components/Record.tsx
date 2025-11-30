import './Record.scss';

interface RecordProps {
    title: string;
    dateModified: string;
    modifiedBy: string;
}

const Record = ({ title, dateModified, modifiedBy }: RecordProps) => {
    return (
        <div className='Record'>
            <div className='RecordTitle'>{title}</div>
            <div className='ModDate'>{dateModified}</div>
            <div className='ModBy'>{modifiedBy}</div>
        </div>
    );
};

export default Record;
