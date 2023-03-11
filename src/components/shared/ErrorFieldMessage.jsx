import { Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

export const ErrorFieldMessage = ({ message }) => {
  return (
    <Typography
      sx={{ color: red[700], fontSize: 14 }}
      className='text-red-500 text-sm font-medium'
    >
      {message}
    </Typography>
  )
}
