import useLocalStorage from "@/hooks/useLocalStorage";
import { ThemeContext } from "./index";
import {useEffect, type ReactNode} from "react"

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useLocalStorage("app-theme", "system")

    useEffect(()=> {
        const root = window.document.documentElement
        root.classList.remove("light", "dark");
        if(theme === "system"){
            const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(system)
        return
        }
        root.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme);
    }

    const value : {theme: string, toggleTheme: () => void} = {
        theme,
        toggleTheme,
    }
    return(
        <ThemeContext value={value}>
{children}
        </ThemeContext>
    )
}

