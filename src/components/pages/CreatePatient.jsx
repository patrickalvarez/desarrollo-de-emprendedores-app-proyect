import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const requiredMessage = "Campo Requerido"
const schema = yup.object().shape({
  firsname: yup.string().required(requiredMessage),
  lastname: yup.string().required(requiredMessage),
  birthdate: yup.string().required(requiredMessage),
  documentNumber: yup.string.required(requiredMessage)
})

export const CreatePatient = () => {
  const { handleSubmit } = useForm({
    resolver: yupResolver()
  })
  return (
    <div>

    </div>
  )
}
