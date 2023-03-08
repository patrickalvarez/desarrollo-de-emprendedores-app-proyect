import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'

export const Patients = () => {
  const { patients } = useGlobalContext()
  const patientColumns = [
    {
      header: 'Nombre',
      accessor: 'firstname'
    },
    {
      header: 'Apellido',
      accessor: 'lastname'
    },
    {
      header: 'Edad',
      accessor: 'birthdate'
    },
    {
      header: 'Sexo',
      accessor: 'gender'
    },
    {
      header: 'Teléfono',
      accessor: 'telephone'
    },
  ]
  return (
    <div>
      <Link to='create'>Crear</Link>

      <table class="table-auto w-full">
        <thead>
          {
            patientColumns.map((column, index) => {
              return <th className='text-left' key={index}>{column.header}</th>
            })
          }
        </thead>
        <tbody>
          {
            patients.map((patient, index) => {
              return (
                <tr key={index}>
                  {
                    patientColumns.map((column, index) => {
                      return <td key={index}>{patient[column.accessor]}</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
