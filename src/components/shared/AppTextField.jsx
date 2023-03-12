import { TextField } from "@mui/material"
import { ErrorFieldMessage } from "./ErrorFieldMessage"

export const AppTextField = ({ label, name, register, error, className, multiline = false }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <TextField
        id={name}
        label={label}
        variant="outlined"
        {...register(name)}
        {
        ...(multiline ? { multiline: true, rows: 3 } : {})
        }
      />
      {
        error?.[name] && (
          <ErrorFieldMessage message={error[name].message} />
        )
      }
    </div>
  )
}