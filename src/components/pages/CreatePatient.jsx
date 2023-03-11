import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { documentTypesArray, useGlobalContext } from '../../context/GlobalContext';
import { AppSelectField } from '../shared/AppSelectField';
import { AppTextField } from '../shared/AppTextField';


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

export const CreatePatient = () => {
  const {
    savePatient
  } = useGlobalContext()

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      documentType: 'C'
    }
  })

  const onSubmit = (data) => {
    savePatient(data)
  }

  const documentType = watch('documentType')

  useEffect(() => {
    setValue('documentNumber', '')
  }, [documentType])


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, console.error)}>
        <div className='grid grid-cols-12 gap-3'>
          <AppTextField label="Nombre" register={register} name='firstName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppTextField label="Apellido" register={register} name='lastName' className="col-span-12 sm:col-span-6" error={errors} />
          <AppSelectField label="Tipo de Documento" register={register} name='documentType' className="col-span-12 sm:col-span-6" error={errors} options={documentTypesArray} />
          <AppTextField label="Numero de Documento" register={register} name='documentNumber' className="col-span-12 sm:col-span-6" error={errors} />
        </div>
        <button>Guardar</button>
      </form>
    </div>
  )
}