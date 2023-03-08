import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({})

const getInitialState = () => {
  const patients = localStorage.getItem('patients')
  return {
    patients: patients ? JSON.parse(patients) : []
  }
}

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState())

  const savePatient = (patient) => {
    const newPatients = [...state.patients, patient]
    setState({
      ...state,
      patients: newPatients
    })
    localStorage.setItem('patients', JSON.stringify(newPatients))
  }

  const value = {
    patients: state.patients,
    savePatient
  }

  return <GlobalContext.Provider value={value}>
    {children}
  </GlobalContext.Provider>
}

export const useGlobalContext = () => {
  const value = useContext(GlobalContext)
  return value
}