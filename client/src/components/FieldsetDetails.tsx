import { useState } from "react";
import "./FieldsetDetails.scss";

type StringFields<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface FieldsetDetailsProps<T extends object> {
    fields: StringFields<T>;
    UIFields: FieldDef[];
    updater: (key: keyof StringFields<T>, value: string) => void;
    subclass?: string;
    children?: React.ReactNode;
}

export interface FieldDef {
    key: string;
    label: string;
    type: "input" | "textarea" | string;
    placeholder: string;
}

const FieldsetDetails = <T extends object>({ fields, UIFields, updater, subclass = "", children }: FieldsetDetailsProps<T>) => {

    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <fieldset className={`FieldsetDetails ${subclass}`}>
            {children}
            <legend>
                {UIFields
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
                {UIFields.map((f) =>
                    f.type === "textarea" ? (
                        <textarea
                            key={f.key}
                            className="Input detail multitext"
                            placeholder={f.placeholder}
                            value={(fields[f.key as keyof StringFields<T>] ?? "") as string}
                            onChange={(e) => updater(f.key as keyof StringFields<T>, e.target.value)}
                            onFocus={() => setFocusedField(f.key)}
                            onBlur={() => setFocusedField(null)}
                        />
                    ) : (
                        <input
                            key={f.key}
                            className="Input detail"
                            type="text"
                            placeholder={f.placeholder}
                            value={(fields[f.key as keyof StringFields<T>] ?? "") as string}
                            onChange={(e) => updater(f.key as keyof StringFields<T>, e.target.value)}
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