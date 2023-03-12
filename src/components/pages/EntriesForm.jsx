import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { consultMotivesArray, relationshipArray, useGlobalContext, wayOfArrivalArray } from '../../context/GlobalContext';
import { AppSelectField } from '../shared/AppSelectField';
import { AppTextField } from '../shared/AppTextField';

const requiredMessage = "Campo Requerido"

const schema = yup.object().shape({
  wayOfArraival: yup.string().required(requiredMessage),
  consultMotive: yup.string().required(requiredMessage),
  contactFirstName: yup.string(),
  contactLastName: yup.string(),
  contactPhone: yup.string(),
  contactAddress: yup.string(),
  contactRelationship: yup.string(),
  medicalHistory: yup.string().required(requiredMessage),
  actualMedicalHistory: yup.string().required(requiredMessage),
})

export const EntriesForm = ({ patient, handleClose }) => {
  const {
    saveEntrie
  } = useGlobalContext()

  const { patients } = useGlobalContext()
  const [patientSelected, setPatientSelected] = useState(patient || null)

  const { handleSubmit, register, watch, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      wayOfArraival: wayOfArrivalArray[0].value,
      consultMotive: consultMotivesArray[0].value,
      contactRelationship: relationshipArray[0].value,
    }
  })

  const onSubmit = (data) => {
    saveEntrie(data, patientSelected.id)
    handleClose()
  }

  const options = patients.map((option) => {
    const firstLetter = option.lastName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <div>
      <Autocomplete
        id="Paciente"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.firstName + ' ' + option.lastName + ' - ' + option.documentNumber}
        renderInput={(params) => <TextField {...params} label="Paciente" />}
        onChange={(_, newValue) => {
          setPatientSelected(newValue)
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={patientSelected}
        disabled={!!patient}
      />
      <form onSubmit={handleSubmit(onSubmit, console.error)} className='flex flex-col gap-3 mt-3'>
        <div className='grid grid-cols-12 gap-3'>
          <AppSelectField label="Via de LLegada" register={register} name='wayOfArraival' className="col-span-12 sm:col-span-6" error={errors} options={wayOfArrivalArray} />
          <AppSelectField label="Motivo de Consulta" register={register} name='consultMotive' className="col-span-12 sm:col-span-6" error={errors} options={consultMotivesArray} />
          <AppSelectField label="Parentesco" register={register} name='contactRelationship' className="col-span-12 sm:col-span-6" error={errors} options={relationshipArray} />
          <AppTextField label="Nombre Persona Contacto" register={register} name='contactFirstName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Apellido Persona Contacto" register={register} name='contactLastName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Telefono Persona Contacto" register={register} name='contactPhone' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Direccion Persona Contacto" register={register} name='contactAddress' className="col-span-12" error={errors} />
          <AppTextField label="Antecedentes Medicos" register={register} name='medicalHistory' className="col-span-12" error={errors} multiline />
          <AppTextField label="Historia Enfermedad Actual" register={register} name='actualMedicalHistory' className="col-span-12" error={errors} multiline />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' variant='contained' >Dar Entrada</Button>
        </div>
      </form>
    </div>
  )
}
