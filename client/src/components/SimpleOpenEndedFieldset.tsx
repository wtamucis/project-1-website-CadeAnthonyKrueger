import './SimpleOpenEndedFieldset.scss'

interface SimpleOpenEndedFieldsetProps {
    title: string;
    placeholder: string;
}

const SimpleOpenEndedFieldset = ({ title, placeholder}: SimpleOpenEndedFieldsetProps) => {

     return (
        <fieldset className={`SimpleOpenEndedFieldset`}>
            <legend>{title}</legend>
            <textarea
                className="Input detail multitext simple"
                placeholder={placeholder}
            />
        </fieldset>
     );

}

export default SimpleOpenEndedFieldset;