export function convertDateToString(date: Date | null): string {
    return date ? date.toISOString() : '';
};

export function convertStringToDate(dateString: string | null | undefined) {
    if (!dateString) return null;

    const d = new Date(dateString);
    return isNaN(d.getTime()) ? null : d;
};
