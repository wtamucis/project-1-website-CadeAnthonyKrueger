export function convertToSaveName(date: string, names: string[]): string {
    let saveName = convertToMiddleEndianDate(date);
    let firstGo = true;
    for (const n of names) {
        console.log(n)
        saveName += ((firstGo ? ' ' : ' & ') + convertToInitials(n));
        if (firstGo) firstGo = false;
    }
    return saveName;
};

function convertToMiddleEndianDate(date: string): string {
    return date.slice(5, 7) + '-' + date.slice(8) + '-' + date.slice(0, 4);
}

function convertToInitials(name: string): string {
    let initials = name.charAt(0);
    let getNext = false;
    for (const ch of name.slice(1)) {
        if (getNext) initials += ch; getNext = false;
        if (ch == ' ') getNext = true;
    }
    return initials;
};