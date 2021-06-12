import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import JobForm from './components/wizardForm'
import JobListing from './components/jobListing'
import { FormContextProvider } from './components/wizardForm/WizardFormContex'
import { jobsListing } from './DummyData'
import Profile from './components/user'

function App() {
  const [jobData, setJobData] = React.useState(jobsListing)
  const updateContext = (jobs) => setJobData(jobs)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContextProvider value={{ jobData, updateContext }}>
        <Router>
          <Switch>
            <Route exact path="/" component={JobListing} />
            <Route path="/job-form" component={JobForm} />
            <Route path="/user" component={Profile} />
          </Switch>
        </Router>
      </FormContextProvider>
    </MuiPickersUtilsProvider>
  )
}

export default App
