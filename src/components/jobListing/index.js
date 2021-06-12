import React from 'react'
import { Box, Grid, Paper, Typography, } from '@material-ui/core'
import DataTable from '../common/DataTable'
import FormContext from '../wizardForm/WizardFormContex'
import pallet from '../common/Colors'
import { useHistory } from 'react-router-dom'
import { Add } from '@material-ui/icons'
import { milisecondsToTime } from '../common/HelperFunctions'
import { makeStyles } from '@material-ui/core/styles'

// component style
const useStyle = makeStyles((theme) => ({
  wrapText: {
    width: 150,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  }
}))

// job listing component
const JobListing = (props) => {
  const classes = useStyle()
  const { jobData, updateContext } = React.useContext(FormContext)
  const history = useHistory()

  const dataTableColumns = [
    { title: 'Job Title', field: 'jobTitle', validate: rowData => rowData.jobTitle !== '' },
    { title: 'Experience', field: 'experience', validate: rowData => rowData.experience !== '', filtering: false },
    { title: 'Education', field: 'education', filtering: false },
    { title: 'Skills', field: 'skills', filtering: false },
    { title: 'Description', field: 'description', filtering: false, render: rowData => <Box className={classes.wrapText}>{rowData.description}</Box> },
    { title: 'Hourly Rate', field: 'hourlyRate', validate: rowData => rowData.hourlyRate !== '' && rowData.hourlyRate >= 10, filtering: false },
    { title: 'Start Date', field: 'startDate', filtering: false },
    { title: 'Career Level', field: 'careerLevel', filtering: false },
    { title: 'Gender', field: 'gender', filtering: false },
    {
      title: 'Equipment Specification',
      field: 'equipmentSpecification',
      filtering: false,
      render: rowData => <Box className={classes.wrapText}>{rowData.description}</Box>
    },
  ]

  const detailPanel = (rowData) => (
    <Box px={3} pb={3}>
      <Typography component="div">
        <Box fontSize={18} fontWeight="bold" mt={1} mb={2}>Schedule working days and timings</Box>
      </Typography>
      <Box ml={2}>
        <Grid container>
          <Grid item sm={4}><strong>Day</strong></Grid>
          <Grid item sm={4}><strong>From</strong> </Grid>
          <Grid item sm={4}><strong>To</strong></Grid>
          {rowData.selectedDays.map(item => (
            <React.Fragment key={item.day}>
              <Grid item sm={4}><Box pt={1}>{item.day}</Box></Grid>
              <Grid item sm={4}><Box pt={1}>{milisecondsToTime(item.from)}</Box></Grid>
              <Grid item sm={4}><Box pt={1}>{milisecondsToTime(item.to)}</Box></Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
  )

  return (
    <Box padding={5}>
      <DataTable
        title="Job Listings"
        components={{ Container: props => <Paper {...props} elevation={3} /> }}
        columns={dataTableColumns}
        data={jobData}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...jobData]
                const index = oldData.tableData.id
                dataUpdate[index] = newData
                updateContext([...dataUpdate])
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...jobData]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                updateContext([...dataDelete])
                resolve()
              }, 1000)
            }),
        }}
        detailPanel={rowData => detailPanel(rowData)}
        options={{
          filtering: true,
          exportButton: true,
          toolbarButtonAlignment: "right",
          actionsColumnIndex: -1,
          rowStyle: { backgroundColor: pallet.gray100 }
        }}
        actions={[
          {
            icon: () => <Add />,
            isFreeAction: true,
            tooltip: 'Create Job',
            onClick: event => history.push("/job-form")
          },
        ]}
      />
    </Box>
  )
}

export default JobListing