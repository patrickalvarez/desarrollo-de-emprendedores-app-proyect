import { Box, Button, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { gendersObject, useGlobalContext } from '../../context/GlobalContext'
import { getDifferenceinYears } from '../../helpers/date';
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


export const Patients = () => {
  const [createPatientModal, setCreatePatientModal] = useState(false);
  const [entryPatientModal, setEntryPatientModal] = useState(false);
  const { patients } = useGlobalContext()
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombres', width: 100 },
    { field: 'lastName', headerName: 'Apellidos', width: 120 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 200, valueGetter: (params) => `${params.row['firstName'] || ''} ${params.row['lastName'] || ''}` },
    { field: 'birthdate', headerName: 'Edad', width: 100, valueGetter: (params) => `${getDifferenceinYears(params.row['birthdate']) || '0'} Años` },
    { field: 'documentNumber', headerName: 'Numero de Documento', width: 160 },
    { field: 'gender', headerName: "Sexo", width: 100, valueGetter: (params) => gendersObject[params.row.gender] },
    { field: 'telephone', headerName: 'Teléfono', width: 120 },
  ]

  const handleCloseCreatePatientModal = () => setCreatePatientModal(false);
  const handleOpenCreatePatientModal = () => setCreatePatientModal(true);
  const handleCloseEntryPatientModal = () => setEntryPatientModal(false);
  const handleOpenEntryPatientModal = () => setEntryPatientModal(true);

  return (
    <Box>
      <Modal
        open={createPatientModal}
        onClose={handleCloseCreatePatientModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant='h5' sx={{ mb: '12px' }}>Crear Paciente</Typography>
          <PatientsForm handleClose={handleCloseCreatePatientModal} />
        </Box>
      </Modal>
      <Modal
        open={entryPatientModal}
        onClose={handleCloseEntryPatientModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant='h5' sx={{ mb: '12px' }}>Crear Paciente</Typography>
          <EntriesForm handleClose={handleCloseEntryPatientModal} patient={selectedRow} />
        </Box>
      </Modal>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        mb: '12px',
      }}>
        <Button
          variant='contained'
          color='primary'
          disabled={!selectedRow}
          onClick={handleOpenEntryPatientModal}
        >
          Dar entrada
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleOpenCreatePatientModal}
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
          onRowClick={(params) => setSelectedRow(params.row)}
        />
      </div>
    </Box>
  )
}