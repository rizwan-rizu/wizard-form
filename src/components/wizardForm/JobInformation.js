import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import pallet from '../common/Colors'
import InputField from '../common/InputField'
import ComboField from '../common/ComboField'
import { jobTitlesList, skillsList, educationList, experienceList } from '../../DummyData'

// component styling
const useStyle = makeStyles((theme) => ({
  fileUpload: { background: pallet.green, color: pallet.white, width: 330, height: 60, '&:hover': { background: pallet.green } },
  fileUploadLabel: { color: pallet.gray200, fontSize: 12 },
  upload: { cursor: "pointer", position: "absolute", width: 332, opacity: 0, height: 60 }
}))

//component
const JobInformation = props => {
  const classes = useStyle()

  return (
    <Box mt={7.5}>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <ComboField
          id="jobTitle"
          defaultValue={props.formValues.jobTitle}
          data={jobTitlesList}
          onChange={props.handleValuesChange}
          variant="outlined"
          label="Looking for"
          placeholder="Enter value..."
          required={true}
        />
        <ComboField
          id="experience"
          data={experienceList}
          defaultValue={props.formValues.experience}
          onChange={props.handleValuesChange}
          variant="outlined"
          label="Experience"
          placeholder="Enter value..."
          required={true}
        />
      </Box>
      <Box mt={7} width="527px">
        <ComboField
          id="education"
          data={educationList}
          defaultValue={props.formValues.education}
          onChange={props.handleValuesChange}
          variant="outlined"
          label="Education"
          placeholder="Enter value..."
          required={false}
        />
      </Box>
      <Box mt={7}>
        <ComboField
          id="skills"
          data={skillsList}
          defaultValue={props.formValues.skills}
          onChange={props.handleValuesChange}
          variant="outlined"
          label="Skills"
          placeholder="Enter value..."
          required={false}
        />
      </Box>
      <Box mt={7}>
        <InputField
          id="description"
          variant="outlined"
          type="text"
          label="Description"
          defaultValue={props.formValues.description}
          placeholder="Enter value..."
          required={false}
          fullWidth={true}
          multiline={true}
          rows={5}
          onChange={props.handleValuesChange}
        />
      </Box>
      <Box mt={7}>
        <Typography className={classes.fileUploadLabel} variant="body2">Add if there is any inspiration *</Typography>
        <Box mt={2.5}>
          <Button className={classes.fileUpload} variant="contained" component="label" startIcon={<CloudUpload />}> go to select template
            <input
              className={classes.upload}
              type="file"
              id="upload"
              name="upload"
              onChange={(e) => props.handleValuesChange("file", e.target.files[0])}
              required
            />
          </Button>
          <Box mt={2}>
            <Typography component="div">
              <Box fontSize={12} m={1}>{props.formValues.file?.name}</Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default JobInformation