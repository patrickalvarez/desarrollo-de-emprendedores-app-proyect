import { TextField } from "@mui/material"
import { ErrorFieldMessage } from "./ErrorFieldMessage"

export const AppTextField = ({ label, name, register, error, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <TextField
        id={name}
        label={label}
        variant="outlined"
        error={!!error?.[name]}
        {...register(name)}
      />
      {
        error?.[name] && (
          <ErrorFieldMessage message={error[name].message} />
        )
      }
    </div>
  )
}