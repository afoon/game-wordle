import { useState } from "react"


const useLocalStorage = (key: string, initialValue: any) => {
    const [item, setItem] = useState(() => {
        try {
            const storedItem = localStorage.getItem(key);
            if (storedItem) {
                return JSON.parse(storedItem)
            }
            else {
                localStorage.setItem(key, JSON.stringify(initialValue))
                return initialValue
            }
        }
        catch (err) {
            console.warn(`Error: item not found at key`, err);
            localStorage.setItem(key, JSON.stringify(initialValue))
            return initialValue;
        }
    })
    const updateItem = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setItem(value);
    }
    const removeItem = () => {
        try {
            localStorage.removeItem(key)
        }
        catch (err) {
            console.warn(`Error removing item`, err);
        }
    }
    return [item, updateItem, removeItem]
}
export default useLocalStorage