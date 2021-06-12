import React from 'react'
import { Box, Divider, Paper, Typography, Button } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import pallet from '../common/Colors'
import ProgressBar from '../common/ProgressBar'
import JobInformation from './JobInformation'
import CandidateType from './CandidateType'
import ShiftTimings from './ShiftTimings'
import FormContext from './WizardFormContex'
import { useHistory } from 'react-router-dom'

// component styling
const useStyle = makeStyles((theme) => ({
  jobContainer: { boxShadow: "0px 10px 30px #DBD8EA80", width: 1226 },
  formHead: { padding: "48px 64px 32px 64px" },
  heading: { color: pallet.blue },
  closeIcon: { height: theme.spacing(6.25), width: theme.spacing(6.25), color: pallet.gray200, cursor: "pointer" },
  secondaryText: { fontSize: theme.spacing(2), paddingTop: theme.spacing(1.5) },
  formBody: { padding: "32px 64px" },
  divider: { background: pallet.gray400 },
  previousBtn: { borderColor: pallet.gray300, height: 60, width: 278, fontSize: 16, color: pallet.gray200 },
  nextBtn: { background: pallet.blue100, height: 60, width: 278, fontSize: 16, color: pallet.white, '&:hover': { background: pallet.blue100 } }
}))

//component
const JobForm = props => {
  const classes = useStyle()
  const history = useHistory()
  const { jobData, updateContext } = React.useContext(FormContext)
  const [step, setstep] = React.useState(1)
  const [formValues, setformValues] = React.useState({})
  const [error, seterror] = React.useState({ value: false, message: "" })

  // handler for wizard form values change
  const handleValuesChange = (name, value) => {
    setformValues({ ...formValues, [name]: value })
  }

  const formSteps = ["Job Information", "Candidate Type", "Shift Timing"]

  // Wizard Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (step !== formSteps.length) {
      setstep(step + 1)
    } else {
      // validating shift timings here
      if (formValues.selectedDays === undefined || formValues.selectedDays.length < 2) {
        seterror({ value: true, message: "Minimum two days should be selected." })
      } else if (formValues.selectedDays !== undefined && formValues.selectedDays.length >= 2) {
        let hasError
        formValues.selectedDays.forEach(element => {
          let hoursDifference = Math.floor(Math.abs(element.to - element.from) / 3600000)
          if (hoursDifference < 9 && hoursDifference > 0) {
            hasError = true
            seterror({ value: true, message: "Time should not be less than 9 hours" })
          } else if (hoursDifference === 0) {
            hasError = true
            seterror({ value: true, message: "you should not select the same time e.g. 9:00 am to 9:00 am" })
          } else {
            hasError = false
          }
        })
        if (!hasError) {
          //updating context here to add new job and redirecting to job-listing route
          updateContext([...jobData, { ...formValues, id: Date.now() }])
          history.push('/')
        }
      }
    }
  }

  //handler for form abort
  const handleFormAbort = () => {
    setformValues({})
    setstep(1)
  }

  return (
    <Box py={5} display="flex" justifyContent="center">
      <Paper className={classes.jobContainer}>
        <Box className={classes.formHead} display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography className={classes.heading} variant="h4">Create a job post</Typography>
            <Typography className={classes.secondaryText} variant="body2">Complete the following steps to create an effective job post</Typography>
          </Box>
          <Box><Cancel className={classes.closeIcon} onClick={handleFormAbort} /></Box>
        </Box>
        <Divider className={classes.divider} orientation="horizontal" />
        <form onSubmit={handleSubmit}>
          <Box className={classes.formBody}>
            <ProgressBar step={step} formSteps={formSteps} />
            {step === 1 && <JobInformation formValues={formValues} handleValuesChange={handleValuesChange} />}
            {step === 2 && <CandidateType formValues={formValues} handleValuesChange={handleValuesChange} />}
            {step === 3 && <ShiftTimings formValues={formValues} handleValuesChange={handleValuesChange} validation={{ error, seterror }} />}
            <Box mt={10} display="flex" alignItems="center" justifyContent="space-between">
              <Button className={classes.previousBtn} variant="outlined" onClick={() => setstep(step - 1)}>Previous</Button>
              <Button className={classes.nextBtn} type="submit" variant="contained">{step === formSteps.length ? "Save" : "Next"}</Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box >
  )
}

export default JobForm