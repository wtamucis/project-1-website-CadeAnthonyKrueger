import { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

import "./NameAdderComponent.scss";

const NameAdderComponent = () => {

    const initialNames = [ 
        "Rhyski Witness", "Cade Krueger", "Zeadyn Wall", "Jamie Gatlin", "Alyssa Spring", "Sabrina Frederick", "Jose Gonzales",
        "Candice Wheeler", "Jessica Andrews", "Matt McCall", "Katt Matuza", "Chelsi Bradfute" 
    ];

    const [nameList, setNameList] = useState<string[]>(initialNames);
    const [namesSelected, setNamesSelected] = useState<string[]>([]);
    const ogpRef = useRef<HTMLSelectElement>(null);


    const handleConfirmSelection = () => {
        if (!ogpRef.current) return;
        const index = Number(ogpRef.current.value);
        const selectedName = nameList[index];

        setNamesSelected(prev => ([...prev, selectedName]));
        setNameList(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveName = (index: number) => {
        const selectedName = namesSelected[index];

        setNamesSelected(prev => prev.filter((_, i) => i !== index));
        setNameList(prev => ([...prev, selectedName]));
    };

    return (
        <div className="NameAdderComponent">
            <label className="SubtitleText NoTextWrap" htmlFor="ogp"><strong>Off-going Personnel:</strong></label>
            {namesSelected.map((name, index) => (
                <p 
                    className="NameEntry NoTextWrap" key={index} onClick={() => handleRemoveName(index)}
                    data-tooltip-id="remove-name" data-tooltip-content="Remove Name"
                >{name}</p>
            ))}
            <Tooltip id="remove-name" place="top" />
            {namesSelected.length < 4 && 
            (<>
                <select className="Dropdown" id="ogp" ref={ogpRef}>
                    {nameList.map((name, index) => (
                        <option key={index} value={index}>{name}</option>
                    ))}
                </select>
                <button 
                    type="button" className="ConfirmSelection" onClick={handleConfirmSelection}
                    data-tooltip-id="confirm-selection" data-tooltip-content="Confirm Selection"
                />
            </>)}
            <Tooltip id="confirm-selection" place="right" />
        </div>
    );

};

export default NameAdderComponent;