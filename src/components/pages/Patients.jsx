import { Box, Button, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'

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



export const Patients = () => {
  const [open, setOpen] = React.useState(false);
  const { patients } = useGlobalContext()

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'Nombres', width: 100 },
    { field: 'lastname', headerName: 'Apellidos', width: 120 },
    { field: 'fullname', headerName: 'Nombre completo', width: 200, valueGetter: (params) => `${params.row['firstname'] || ''} ${params.row['lastname'] || ''}` },
    { field: 'birthdate', headerName: 'Birthdate', width: 100 },
    { field: 'gender', headerName: "Sexo", width: 100 },
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
          fORM aQUI
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
          rows={patients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Box>
  )
}
