import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import { consultMotivesObject, useGlobalContext, wayOfArrivalObject } from '../../context/GlobalContext';
import { getDifferenceinYears } from '../../helpers/date';

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
    { field: 'wayOfArraival', headerName: 'Via de LLegada', width: 140, valueGetter: (params) => wayOfArrivalObject[params.row.wayOfArraival] },
    { field: 'consultMotive', headerName: 'Motivo de Consulta', width: 140, valueGetter: (params) => consultMotivesObject[params.row.consultMotive] },
    { field: 'patientName', headerName: 'Paciente', width: 200, valueGetter: (params) => `${params.row.patient['firstName'] || ''} ${params.row.patient['lastName'] || ''}` },
    {
      field: 'patientDocument', headerName: 'Documento', width: 200, valueGetter: (params) => `${params.row.patient.documentNumber || ''}`
    },
    {
      field: 'patientYearsOld', headerName: 'Edad', width: 200, valueGetter: (params) => `${getDifferenceinYears(params.row.patient['birthdate']) || '0'} Años`
    },
    {
      field: 'createdAt', headerName: 'Fecha y Hora de Creación', width: 200, valueGetter: (params) => {
        return `${dayjs(params.row.createdAt).format('DD-MM-YYYY hh:mm A') || ''}`
      }
    }
  ]

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography variant='h5' sx={{ mb: '12px' }}>Entrada a Paciente</Typography>
          <EntriesForm handleClose={handleClose} />
        </Box>
      </Modal> */}
      {/* <Box sx={{
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
      </Box> */}
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
