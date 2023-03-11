import { Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'First name', width: 100 },
    { field: 'lastname', headerName: 'Last name', width: 120 },
    { field: 'birthdate', headerName: 'Birthdate', width: 100 },
    { field: 'gender', headerName: "Sexo", width: 100 },
    { field: 'telephone', headerName: 'Teléfono', width: 120 },
  ]

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: '12px',
      }}>
        <Button variant='contained' color='primary' sx={{
          marginLeft: '10px',
        }}>Crear</Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={patients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  )
}
