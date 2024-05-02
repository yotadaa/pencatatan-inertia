export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    const valueString = localStorage.getItem(key);
    if (!valueString) {
        return null;
    }
    try {
        return JSON.parse(valueString);
    } catch (error) {
        return valueString;
    }
}
