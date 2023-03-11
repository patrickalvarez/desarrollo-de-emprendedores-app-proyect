import { MenuItem, TextField } from "@mui/material"
import { ErrorFieldMessage } from "./ErrorFieldMessage"

export const AppSelectField = ({ label, name, register, error, className, options, helperText }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <TextField
        id={name}
        select
        label={label}
        variant="outlined"
        error={!!error?.[name]}
        {...register(name)}
        helperText={helperText}
        defaultValue={options[0].value}
      >
        {
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        }
      </TextField>
      {
        error?.[name] && (
          <ErrorFieldMessage message={error[name].message} />
        )
      }
    </div>
  )
}