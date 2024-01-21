import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextValues {
    start: boolean
    setStart: (start: boolean) => void
}

const AppContext = createContext<AppContextValues | undefined>(undefined)

export function ContextProvider({ children }: { children: ReactNode }) {
    const [start, setStart] = useState<boolean>(false)
    return (
        <AppContext.Provider value={{ start, setStart }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error(
            'useAppContext must be used within a AppContextProvider',
        )
    }
    return context
}
