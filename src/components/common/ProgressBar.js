import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import pallet from '../common/Colors'

// component styling
const useStyle = makeStyles((theme) => ({
  stepsCount: { color: pallet.blue100, fontSize: theme.spacing(2.5) },
  steps: {
    background: pallet.gray,
    textAlign: "center",
    '& div': {
      borderRight: `1px solid ${pallet.gray100}`,
      '&:last-child': { border: 0, borderRadius: 0 }
    }
  },
  StepText: { color: pallet.black100, opacity: "51%", fontSize: 20 },
  stepsDivider: { color: pallet.gray100, margin: 1 },
  active: {
    background: pallet.blue,
    borderRadius: "0px 50px 50px 0px",
    border: 0,
    '& p': { color: pallet.white, opacity: 1 },
  },
  previousStep: { borderRadius: 0, borderColor: `${pallet.blue200} !important` },
  lastStep: { borderRadius: 0, border: 0 }
}))

// progess stepper component
const ProgressBar = props => {
  const classes = useStyle()

  // function that will handle step and assign classes to steps accordingly
  const handleActiveStep = idx => {
    if (idx < props.step && idx !== props.step) {
      if (idx !== 0) document.getElementById(`form-step-${idx - 1}`).classList.add(classes.previousStep)
      let element = document.getElementById(`form-step-${idx}`)
      if (element && element.classList.contains(classes.previousStep)) {
        element.classList.remove(classes.previousStep)
      }
      return classes.active
    } else {
      return ''
    }
  }

  return (
    <Box className={classes.ProgressBar}>
      <Box mb={2}><Typography className={classes.stepsCount} variant="body2">Step {props.step} of {props.formSteps.length}</Typography></Box>
      <Box>
        <Box className={classes.steps} display="flex" alignItems="center" justifyContent="space-between">
          {(props.formSteps && props.formSteps.length) && props.formSteps.map((item, idx) => (
            <Box id={`form-step-${idx}`} key={item} width="100%" py={2.5} className={`${classes.formSteps} ${handleActiveStep(idx)}`}>
              <Typography className={classes.StepText} variant="body2">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProgressBar