import { Box, Button, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { gendersObject, useGlobalContext } from '../../context/GlobalContext'
import { EntriesForm } from './EntriesForm';
import { PatientsForm } from './PatientsForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid background.paper',
  borderRadius: 4,
  boxShadow: 24,
  outline: 'none',
  p: 4,
};

export const Entrties = () => {
  const [open, setOpen] = React.useState(false);
  const { entries } = useGlobalContext()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombres', width: 100 },
    { field: 'lastName', headerName: 'Apellidos', width: 120 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 200, valueGetter: (params) => `${params.row['firstName'] || ''} ${params.row['lastName'] || ''}` },
    { field: 'gender', headerName: "Sexo", width: 100, valueGetter: (params) => gendersObject[params.row.gender] },
    { field: 'telephone', headerName: 'Teléfono', width: 120 },
  ]

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant='h5' sx={{ mb: '12px' }}>Entrada a Paciente</Typography>
          <EntriesForm handleClose={handleClose} />
        </Box>
      </Modal>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: '12px',
      }}>
        <Button
          variant='contained'
          color='primary' sx={{
            marginLeft: '10px',
          }}
          onClick={handleOpen}
        >
          Crear
        </Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={entries}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Box>
  )
}
