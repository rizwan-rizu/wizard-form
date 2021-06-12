import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowDown } from '@material-ui/icons'

// component styling
const useStyle = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 10px 30px #DBD8EA80",
    minWidth: 527,
    '& .MuiAutocomplete-inputRoot': { paddingRight: "85px !important" },
    '& .MuiAutocomplete-endAdornment': {
      width: 60,
      height: "100%",
      background: "#DEE2E6",
      border: "1px solid #DEE2E6",
      borderRadius: 5,
      right: "0 !important",
      top: 0,
      '& .MuiAutocomplete-clearIndicator': {
        top: "calc(50% - 14px)",
        right: 29
      },
      '& .MuiAutocomplete-popupIndicator': {
        height: 57,
        width: 60,
        top: -30,
        borderRadius: 0
      }
    }
  },
}))

//component
const ComboField = (props) => {
  const classes = useStyle()
  const [value] = React.useState(props.defaultValue)
  const [inputValue, setInputValue] = React.useState('')

  return (
    <Autocomplete
      id={props.id}
      className={classes.root}
      value={value}
      inputValue={inputValue}
      popupIcon={<KeyboardArrowDown />}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={props.data}
      onChange={(e, value) => props.onChange(e.target.id.split('-')[0], value)}
      renderInput={
        (params) => <TextField
          {...params}
          label={props.label}
          placeholder={props.placeholder}
          variant={props.variant}
          required={props.required}
        />
      }
    />
  )
}

export default ComboField