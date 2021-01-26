export function isEmpty(str:string) {
    return (!str || 0 === str.length);
}

export function isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
}

export function isEmptyOrWhiteSpace(str:string){
    return (str.length === 0 || !str.trim());
};