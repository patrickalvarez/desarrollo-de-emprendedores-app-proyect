import { createContext, useContext } from "react";

const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>
    {children}
  </GlobalContext.Provider>
}

export const useGlobalCotnext = () => {
  const value = useContext(GlobalContext)
  return value
}