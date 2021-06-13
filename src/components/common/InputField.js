import React from 'react'
import { TextField, createMuiTheme } from '@material-ui/core'
import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import pallet from '../common/Colors'

// component styling
const useStyle = makeStyles((theme) => ({
  root: { boxShadow: "0px 10px 30px #DBD8EA80", minWidth: 527 },
}))

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: pallet.red,
        "&$error": {
          color: pallet.red
        }
      }
    }
  }
});

//component
const InputField = props => {
  const classes = useStyle()
  return (
    <MuiThemeProvider theme={formLabelsTheme}>
      <TextField
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
    </MuiThemeProvider>
  )
}

export default InputField