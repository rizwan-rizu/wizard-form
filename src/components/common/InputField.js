import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// component styling
const useStyle = makeStyles((theme) => ({
  root: { boxShadow: "0px 10px 30px #DBD8EA80", minWidth: 527 },
}))

//component
const InputField = props => {
  const classes = useStyle()
  return (
    < TextField
      className={classes.root}
      id={props.id}
      variant={props.variant}
      label={props.label}
      type={props.type}
      defaultValue={props.defaultValue ?? ''}
      placeholder={props.placeholder}
      InputProps={props.inputProps}
      onChange={(e) => props.onChange(e.target.id, e.target.value)}
      required={props.required}
      fullWidth={props.fullWidth}
      multiline={props.multiline}
      rows={props.multiline ? props.rows : 1}
    />
  )
}

export default InputField