import { useCallback, useMemo, type ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { KeyboardContext } from "./index";

export const KeyboardProvider = ({ children }: { children: ReactNode }) => {
    const [keyHighlight, setHighlight] = useLocalStorage('keyHighlight', true)
    const toggleHighlight = useCallback(() => {
        setHighlight(!keyHighlight)

    }, [setHighlight, keyHighlight])


    const values = useMemo(() => {
        return {
                keyHighlight,
                toggleHighlight
        }
    }, [keyHighlight, toggleHighlight])
    return (
        <KeyboardContext value={values}>
            {children}
        </KeyboardContext>
    )
}