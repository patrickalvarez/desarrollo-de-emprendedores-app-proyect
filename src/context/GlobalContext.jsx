import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

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
    const newPatients = [...state.patients, { ...patient, birthdate: dayjs(patient.birthdate).format('YYYY-MM-DD'), id: uuidv4() }]
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

export const documentTypesObject = {
  C: 'Cédula',
  P: 'Pasaporte'
}

export const insuranceCompaniesObject = {
  '1': 'ARS Humano',
  '2': 'ARS Universal',
  '3': 'ARS Mapfre',
  '4': 'ARS Senasa',
}

export const gendersObject = {
  M: 'Masculino',
  F: 'Femenino'
}

export const bloodTypesObject = {
  '1': 'O+',
  '2': 'O-',
  '3': 'A+',
  '4': 'A-',
  '5': 'B+',
  '6': 'B-',
  '7': 'AB+',
  '8': 'AB-',
}

const getObjectAsArray = (object) => {
  return Object.keys(object).map(key => ({
    value: key,
    label: object[key]
  }))
}

export const documentTypesArray = getObjectAsArray(documentTypesObject)
export const insuranceCompaniesArray = getObjectAsArray(insuranceCompaniesObject)
export const gendersArray = getObjectAsArray(gendersObject)
export const bloodTypesArray = getObjectAsArray(bloodTypesObject)