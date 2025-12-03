import './SimpleOpenEndedFieldset.scss'

interface SimpleOpenEndedFieldsetProps {
    title: string;
    placeholder: string;
    value: string | null | undefined;
    updater: (value: string) => void;
}

const SimpleOpenEndedFieldset = ({ title, placeholder, value, updater }: SimpleOpenEndedFieldsetProps) => {

     return (
        <fieldset className={`SimpleOpenEndedFieldset`}>
            <legend>{title}</legend>
            <textarea
                className="Input detail multitext simple"
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => updater(e.target.value)}
            />
        </fieldset>
     );

}

export default SimpleOpenEndedFieldset;