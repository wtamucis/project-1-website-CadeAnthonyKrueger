import { useState } from "react";
import "./FieldsetDetails.scss";

interface FieldsetDetailsProps {
    fields: FieldDef[];
    subclass?: string;
    children?: React.ReactNode;
}

export interface FieldDef {
    key: string;
    label: string;
    type: "input" | "textarea" | string;
    placeholder: string;
}

const FieldsetDetails = ({ fields, subclass = "", children }: FieldsetDetailsProps) => {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <fieldset className={`FieldsetDetails ${subclass}`}>
            {children}
            <legend>
                {fields
                    .map((f, i) => (
                        <span
                            key={i}
                            className={focusedField === f.key ? "focused" : ""}
                        >
                            {f.label}
                        </span>
                    ))
                    .reduce<React.ReactNode[]>((acc, curr, index) => {
                        if (index === 0) return [curr];
                        return [...acc, " · ", curr];
                    }, [])}
            </legend>

            <div className="DetailInputs">
                {fields.map((f) =>
                    f.type === "textarea" ? (
                        <textarea
                            key={f.key}
                            className="Input detail multitext"
                            placeholder={f.placeholder}
                            onFocus={() => setFocusedField(f.key)}
                            onBlur={() => setFocusedField(null)}
                        />
                    ) : (
                        <input
                            key={f.key}
                            className="Input detail"
                            type="text"
                            placeholder={f.placeholder}
                            onFocus={() => setFocusedField(f.key)}
                            onBlur={() => setFocusedField(null)}
                        />
                    )
                )}
            </div>
        </fieldset>
    );
};

export default FieldsetDetails;