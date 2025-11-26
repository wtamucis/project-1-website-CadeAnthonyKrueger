import './SimpleOpenEndedFieldset.scss'

interface SimpleOpenEndedFieldsetProps {
    title: string;
    placeholder: string;
    fixedSize?: boolean;
}

const SimpleOpenEndedFieldset = ({ title, placeholder, fixedSize = true }: SimpleOpenEndedFieldsetProps) => {

     return (
        <fieldset className={`SimpleOpenEndedFieldset ${fixedSize ? 'fixedSize' : ''}`}>
            <legend>{title}</legend>
            <textarea
                className="Input detail multitext"
                placeholder={placeholder}
            />
        </fieldset>
     );

}

export default SimpleOpenEndedFieldset;