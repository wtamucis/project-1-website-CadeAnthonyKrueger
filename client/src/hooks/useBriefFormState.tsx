import useBriefStore from "../stores/BriefStore";
import type { BriefForm } from "../types/BriefFormTypes";

interface UseBriefFormStateProps<K extends keyof BriefForm> {
    key: K;
    index?: number;
}

const useBriefFormState = <K extends keyof BriefForm>({
    key,
    index
}: UseBriefFormStateProps<K>) => {

    const slice = useBriefStore(s => s.form[key]);
    const updateSlice = useBriefStore(s => s.updateSlice);
    const updateNested = useBriefStore(s => s.updateNested);

    type TopLevel = BriefForm[K];
    type Nested = TopLevel extends Array<infer U> ? U : never;

    const setState = (value: TopLevel | Nested) => {
        if (typeof index === "number") {
            updateNested(key, index, value as Nested);
        } else {
            updateSlice(key, value as TopLevel);
        }
    };

    return { state: slice, setState };
};

export default useBriefFormState;