import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

const requiredMessage = "Campo Requerido"
const schema = yup.object().shape({
  firstname: yup.string().required(requiredMessage),
  lastname: yup.string().required(requiredMessage),
  birthdate: yup.string().required(requiredMessage),
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
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const onSubmit = (data) => {
    savePatient(data)
    navigate('/patients')
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, console.error)}>
        <div className='grid grid-cols-12 gap-3'>
          <Input label="Nombre" name="firstname" register={register} error={errors.firstname} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2" />
          <Input label="Apellido" name="lastname" register={register} error={errors.lastname} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Fecha de Nacimiento" name="birthdate" register={register} error={errors.birthdate}className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2" />
          <Input label="DNI" name="documentNumber" register={register} error={errors.documentNumber} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Obra Social" name="insuranceCompany" register={register} error={errors.insuranceCompany} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Nro. de Afiliado" name="insuranceNumber" register={register} error={errors.insuranceNumber} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Dirección" name="address" register={register} error={errors.address} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Genero" name="gender" register={register} error={errors.address} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Tipo de Sangre" name="bloodType" register={register} error={errors.bloodType} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>  
          <Input label="Teléfono" name="telephone" register={register} error={errors.telephone} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
          <Input label="Celular" name="mobile" register={register} error={errors.mobile}className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2" />
          <Input label="Email" name="email" register={register} error={errors.email} className="col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2"/>
        </div>
        <button>Guardar</button>
      </form>
    </div>
  )
}


const Input = ({ label, name, register, error, className }) => {
  return (
    <div className={`flex flex-col ${className} `}>
      <label className='text-gray-800' htmlFor={name}>{label}</label>
      <input className={`p-2 outline-none border border-gray-300 rounded-md ${error && "border-red-500 border-2"}`} type="text" name={name} {...register(name)} />
      {error && <span className='text-red-500 text-sm font-medium'>{error.message}</span>}
    </div>
  )
}