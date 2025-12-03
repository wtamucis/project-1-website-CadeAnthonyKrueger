import { useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";

import "./MultiSelect.scss";

interface MultiSelectProps<T> {
    items: T[];
    selectedItems: number[];
    setSelectedItems: (value: number[]) => void;
    getLabel: (n: T) => string;
    getId: (n: T) => number;
    tooltipLabel?: string;
}

function MultiSelect<T>({ items, selectedItems, setSelectedItems, getLabel, getId, tooltipLabel = "Item" } : MultiSelectProps<T>) {

    // UI State 
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Derived state from parent state passed in as props
    const remainingItems = useMemo(() => {
        return items.filter(u => !selectedItems.includes(getId(u)));
    }, [items, selectedItems, getId]);

    const selectedObjects = useMemo(() => {
    return selectedItems
            .map(id => items.find(item => getId(item) === id))
            .filter((item): item is T => Boolean(item));
    }, [items, selectedItems, getId]);

    // Handlers
    const handleConfirmSelection = () => {
        if (remainingItems.length === 0) return;

        const selectedItem = remainingItems[selectedIndex];
        setSelectedItems([...selectedItems, getId(selectedItem)]);
        setSelectedIndex(0);
    };

    const handleRemoveName = (index: number) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
        setSelectedIndex(0);
    };

    return (
        <div className="MultiSelect">
            <label className="SubtitleText NoTextWrap" htmlFor="ogp"><strong>Off-going Personnel:</strong></label>
            {selectedObjects.map((item, index) => (
                <p 
                    className="TextEntry NoTextWrap"
                    key={index}
                    onClick={() => handleRemoveName(index)}
                    data-tooltip-id="remove-item"
                    data-tooltip-content={`Remove ${tooltipLabel}`}
                >
                    {getLabel(item)}
                </p>
            ))}
            <Tooltip id="remove-item" place="top" />
            {selectedItems.length < 4 && 
            (<>
                <select className="Dropdown" id="ogp" value={selectedIndex} onChange={e => setSelectedIndex(Number(e.target.value))}>
                    {remainingItems.map((item, index) => (
                        <option key={index} value={index}>{getLabel(item)}</option>
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

export default MultiSelect;