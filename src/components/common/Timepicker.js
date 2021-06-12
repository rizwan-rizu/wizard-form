import 'date-fns'
import React from 'react'
import { TimePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import pallet from './Colors'

const useStyles = makeStyles((theme) => ({
  time: { width: 70, '& input': { padding: 0, fontSize: 16, color: pallet.gray600, cursor: "pointer" } }
}));

const MaterialUiTimePicker = (props) => {
  const classes = useStyles()
  const [selectedDate, setselectedDate] = React.useState(null);

  const handleDateChange = date => {
    props.handleTime(props.id, props.name, date)
    setselectedDate(date)
  }

  return (
    <TimePicker
      className={classes.time}
      variant="inline"
      disabled={props.disabled}
      value={selectedDate ?? props.date}
      onChange={handleDateChange}
      InputProps={{ disableUnderline: true }}
    />
  )
}

export default MaterialUiTimePicker
