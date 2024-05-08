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

export function generateUniqueColors(N) {
    const colors = [];
    const goldenRatioConjugate = 0.618033988749895;
    let hue = Math.random();
    const saturation = 0.5;
    const value = 0.85;

    for (let i = 0; i < N; i++) {
        hue += goldenRatioConjugate;
        hue %= 1;
        const hexColor = hsvToHex(hue, saturation, value); // Fixed saturation and value
        colors.push(hexColor);
    }

    return colors;
}

export function hsvToHex(h, s, v) {
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    // Ensure the color has enough contrast with white and black
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const hexColor = (luma > 0.5) ? '#000000' : '#FFFFFF';

    const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}



export function formatNumber(number, options = {}) {
    const {
        decimalSeparator = '.',
        thousandSeparator = ',',
        decimalPlaces = 2
    } = options;

    // Convert the number to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = Number(number).toFixed(decimalPlaces).split('.');

    // Add thousand separators to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    // Join the integer and decimal parts with the decimal separator
    let formattedNumber = formattedIntegerPart;
    if (decimalPart) {
        formattedNumber += decimalSeparator + decimalPart;
    }

    return formattedNumber;
}
