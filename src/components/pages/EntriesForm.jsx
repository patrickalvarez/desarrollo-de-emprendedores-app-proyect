import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { consultMotivesArray, useGlobalContext, wayOfArrivalArray } from '../../context/GlobalContext';
import { AppSelectField } from '../shared/AppSelectField';
import { AppTextField } from '../shared/AppTextField';

const requiredMessage = "Campo Requerido"

const schema = yup.object().shape({
  wayOfArraival: yup.string().required(requiredMessage),
  consultMotive: yup.string().required(requiredMessage),
})

export const EntriesForm = () => {
  const { patients } = useGlobalContext()
  const [patientSelected, setPatientSelected] = useState(null)

  const { handleSubmit, register, watch, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
    }
  })

  const onSubmit = (data) => {
    savePatient(data)
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
      />
      <form onSubmit={handleSubmit(onSubmit, console.error)} className='flex flex-col gap-3 mt-3'>
        <div className='grid grid-cols-12 gap-3'>
          <AppTextField label="Apellido" register={register} name='lastName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppSelectField label="Motivo de Consulta" register={register} name='consultMotive' className="col-span-12 sm:col-span-6" error={errors} options={consultMotivesArray} />
          <AppSelectField label="Via de LLegada" register={register} name='wayOfArraival' className="col-span-12 sm:col-span-6" error={errors} options={wayOfArrivalArray} />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' variant='contained' >Dar Entrada</Button>
        </div>
      </form>
    </div>
  )
}
