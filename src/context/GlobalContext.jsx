import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const GlobalContext = createContext({})

const patientsObject = {}

const entriesObject = {}

const getInitialState = () => {
  const patientsJson = localStorage.getItem('patients')
  const entriesJson = localStorage.getItem('entries')

  const patients = patientsJson ? JSON.parse(patientsJson) : []
  const entries = entriesJson ? JSON.parse(entriesJson) : []

  patients.forEach(patient => {
    patientsObject[patient.id] = patient
  })

  entries.forEach(entry => {
    entriesObject[entry.id] = entry
    entry.patient = patientsObject[entry.patientId]
  })

  return {
    patients,
    entries
  }
}

export const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState())

  const savePatient = (patient) => {
    const newPatient = { ...patient, birthdate: dayjs(patient.birthdate).format('YYYY-MM-DD'), id: uuidv4() }
    const newPatients = [...state.patients, newPatient]
    patientsObject[newPatient.id] = newPatient

    setState({
      ...state,
      patients: newPatients
    })

    localStorage.setItem('patients', JSON.stringify(newPatients))
  }

  const saveEntrie = (entry, patientId) => {
    const newEntry = { ...entry, patientId, date: dayjs(), id: uuidv4() }
    const newEntries = [...state.entries, newEntry]
    entriesObject[newEntry.id] = newEntry

    setState({
      ...state,
      entries: { ...newEntries, patient: patientsObject[patientId] }
    })

    localStorage.setItem('entries', JSON.stringify(newEntries))
  }

  const value = {
    patients: state.patients,
    entries: state.entries,
    savePatient,
    saveEntrie
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

export const wayOfArrivalObject = {
  '1': 'Medios Propios',
  '2': 'Ambulancia',
  '3': '911',
}

export const consultMotivesObject = {
  '1': 'Cefales',
  '2': 'Dolor de Cabeza',
  '3': 'Mareos',
  '4': 'Nauseas',
  '5': 'Vomitos',
  '6': 'Dolor de Garganta',
  '7': 'Dolor de Pecho',
  '8': 'Dolor de Abdominal',
}

export const relationshipObject = {
  '1': 'Hijo(a)',
  '2': 'Padre',
  '3': 'Madre',
  '4': 'Esposo(a)',
  '5': 'Hermano(a)',
  '9': 'Amigo(a)',
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
export const wayOfArrivalArray = getObjectAsArray(wayOfArrivalObject)
export const consultMotivesArray = getObjectAsArray(consultMotivesObject)
export const relationshipArray = getObjectAsArray(relationshipObject)