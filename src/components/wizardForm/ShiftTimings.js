import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import pallet from '../common/Colors'
import MaterialUiTimePicker from '../common/Timepicker'
import Alert from '@material-ui/lab/Alert';

// component styling
const useStyle = makeStyles((theme) => ({
  heading: { fontSize: 30 },
  divider: { background: pallet.gray400 },
  day: {
    width: 50,
    height: 50,
    background: pallet.gray500,
    borderRadius: 5,
    cursor: "pointer",
    marginRight: theme.spacing(11.375),
    '& p': { color: pallet.gray600, fontSize: 20 },
    '&.selected': { background: pallet.blue, "& p": { color: pallet.white } }
  },
  dayContainer: { background: pallet.gray700, color: pallet.gray600, height: 50, width: 440, borderRadius: 10 },
  dayBox: {
    background: pallet.gray800, color: pallet.gray600, width: 166, height: 50, borderRadius: 10,
    '&.active': { background: pallet.blue, color: pallet.white }
  }
}))

// component
const ShiftTimings = props => {
  const classes = useStyle()
  const [selectedDays, setselectedDays] = React.useState([])

  const days = [
    { name: "Sunday", initial: "S" },
    { name: "Monday", initial: "M" },
    { name: "Tuesday", initial: "T" },
    { name: "Wednesday", initial: "W" },
    { name: "Thursday", initial: "T" },
    { name: "Friday", initial: "F" },
    { name: "Saturday", initial: "S" }
  ]

  // handler for days selection 
  const handleDaySelection = (id) => {
    props.validation.seterror({ value: false, message: "" })
    const element = document.getElementById(id)
    const dayTime = document.getElementById(`time-${id}`)
    let days = selectedDays
    if (element.classList.contains("selected")) {
      element.classList.remove("selected")
      dayTime.classList.remove("active")
      days.length && days.map((item, idx) => {
        if (item.day === id) {
          days.splice(idx, 1)
          setselectedDays(days)
        }
        return ''
      })
    } else {
      days = [...selectedDays, { day: id, from: new Date().setHours(9, 0, 0), to: new Date().setHours(18, 0, 0) }]
      setselectedDays(days)
      element.classList.add("selected")
      dayTime.classList.add("active")
      props.handleValuesChange("selectedDays", days)
    }
  }

  // handler for handling time of the days selected
  const handleTime = async (id, name, dateTime) => {
    props.validation.seterror({ value: false, message: "" })
    let days = selectedDays
    await days.length && days.map(item => {
      if (item.day === id) item[name] = dateTime.getTime()
      return ''
    })
    setselectedDays(days)
    props.handleValuesChange("selectedDays", days)
  }

  return (
    <Box>
      <Box pt={6} pb={3.2}>
        <Typography className={classes.heading} variant="h4">{`Schedule working days & timings`}</Typography>
      </Box>
      <Divider className={classes.divider} orientation="horizontal" />
      <Box pt={5.625} display="flex" alignItems="center" justifyContent="flex-start">
        {days.map((item) => (
          <Box
            id={item.name}
            key={item.name}
            className={classes.day}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleDaySelection(item.name)}>
            <Typography variant="body2">{item.initial}</Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-start" flexWrap="wrap">
        {days.map((item) => (
          <Box mt={6.5} key={item.name} mr={6} className={classes.dayContainer} display="flex" alignItems="center">
            <Box mr={6} id={`time-${item.name}`} className={classes.dayBox} display="flex" alignItems="center" justifyContent="center" >
              <Typography variant="body2">{item.name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              {/* Time picker component calling here */}
              <MaterialUiTimePicker
                id={item.name}
                date={new Date().setHours(9, 0, 0)}
                name="from"
                handleTime={handleTime}
                disabled={!selectedDays.filter(x => x.day === item.name).length > 0}
              />
              <Box px={1}><Typography variant="body2">to</Typography></Box>
              {/* Time picker component calling here */}
              <MaterialUiTimePicker
                id={item.name}
                name="to"
                date={new Date().setHours(18, 0, 0)}
                handleTime={handleTime}
                disabled={!selectedDays.filter(x => x.day === item.name).length > 0} />
            </Box>
          </Box>
        ))}
      </Box>
      {props.validation.error.value &&
        <Box mt={6}>
          <Alert severity="error">{props.validation.error.message}</Alert>
        </Box>
      }
    </Box>
  )
}

export default ShiftTimings