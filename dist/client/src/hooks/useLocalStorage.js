"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
function useLocalStorage(key, initialValue) {
    const [value, setValue] = (0, react_1.useState)(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null)
            return JSON.parse(jsonValue);
        if (typeof initialValue === "function") {
            return initialValue;
        }
        else {
            return initialValue;
        }
    });
    (0, react_1.useEffect)(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
exports.useLocalStorage = useLocalStorage;
