import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { bloodTypesArray, documentTypesArray, gendersArray, insuranceCompaniesArray, useGlobalContext } from '../../context/GlobalContext';
import { AppSelectField } from '../shared/AppSelectField';
import { AppTextField } from '../shared/AppTextField';
import { ErrorFieldMessage } from '../shared/ErrorFieldMessage';

const requiredMessage = "Campo Requerido"

const schema = yup.object().shape({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  birthdate: yup.string().required(requiredMessage),
  documentType: yup.string().required(requiredMessage),
  documentNumber: yup.string().required(requiredMessage),
  insuranceNumber: yup.string().required(requiredMessage),
  insuranceCompany: yup.string().required(requiredMessage),
  address: yup.string().required(requiredMessage),
  gender: yup.string().required(requiredMessage),
  bloodType: yup.string().required(requiredMessage),
  telephone: yup.string().required(requiredMessage),
  mobile: yup.string().required(requiredMessage),
  email: yup.string().email("Email no valido").required(requiredMessage),
})

export const PatientsForm = ({ handleClose }) => {
  const {
    savePatient
  } = useGlobalContext()

  const { handleSubmit, register, watch, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      documentType: documentTypesArray[0].value,
      insuranceCompany: insuranceCompaniesArray[0].value,
      bloodType: bloodTypesArray[0].value,
      gender: gendersArray[0].value,
    }
  })

  const onSubmit = (data) => {
    savePatient(data)
    handleClose()
  }

  const documentType = watch('documentType')

  useEffect(() => {
    setValue('documentNumber', '')
  }, [documentType])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, console.error)} className='flex flex-col gap-3'>
        <div className='grid grid-cols-12 gap-3'>
          <AppTextField label="Nombre" register={register} name='firstName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Apellido" register={register} name='lastName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppSelectField label="Tipo de Documento" register={register} name='documentType' className="col-span-12 sm:col-span-6" error={errors} options={documentTypesArray} />
          <AppTextField label="Número de Documento" register={register} name='documentNumber' className="col-span-12 sm:col-span-6" error={errors} />
          <AppSelectField label="Seguro" register={register} name='insuranceCompany' className="col-span-12 sm:col-span-6" error={errors} options={insuranceCompaniesArray} />
          <AppTextField label="Número de Afiliado" register={register} name='insuranceNumber' className="col-span-12 sm:col-span-6" error={errors} />
          <AppDatePicker label="Fecha de Nacimiento" control={control} name='birthdate' className="col-span-12 sm:col-span-6" error={errors} />
          <AppSelectField label="Sexo" register={register} name='gender' className="col-span-12 sm:col-span-6" error={errors} options={gendersArray} />
          <AppSelectField label="Sexo" register={register} name='bloodType' className="col-span-12 sm:col-span-6" error={errors} options={bloodTypesArray} />
          <AppTextField label="Telefono" register={register} name='telephone' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Celular" register={register} name='mobile' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Email" register={register} name='email' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Direccion" register={register} name='address' className="col-span-12" error={errors} />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' variant='contained' >Guardar</Button>
        </div>
      </form>
    </div>
  )
}

const AppDatePicker = ({ label, name, control, error, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => <TextField error={!!error?.[name]} {...params} />}
          />
        )}
      />
      {
        error?.[name] && (
          <ErrorFieldMessage message={error[name].message} />
        )
      }
    </div>
  )
}