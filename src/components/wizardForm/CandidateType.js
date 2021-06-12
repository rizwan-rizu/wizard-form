import React from 'react'
import { Box } from '@material-ui/core'
import InputField from '../common/InputField'
import ComboField from '../common/ComboField'
import { careerLevelList, monthsList, genderList } from '../../DummyData'

//component
const CandidateType = props => {
  return (
    <Box mt={7.5}>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <InputField
          variant="outlined"
          label="Hourly Rate"
          placeholder="Enter value..."
          id="hourlyRate"
          type="number"
          inputProps={{ inputProps: { min: 10 } }}
          defaultValue={props.formValues.hourlyRate}
          onChange={props.handleValuesChange}
          required={true}
          fullWidth={false}
          multiline={false}
        />
        <ComboField
          id="startDate"
          variant="outlined"
          defaultValue={props.formValues.startDate}
          onChange={props.handleValuesChange}
          data={monthsList}
          label="Expected Start Date"
          placeholder="Select date"
          required={false}
        />
      </Box>
      <Box mt={7} display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <ComboField
          variant="outlined"
          label="Career Level"
          placeholder="Enter value..."
          id="careerLevel"
          data={careerLevelList}
          defaultValue={props.formValues.careerLevel}
          onChange={props.handleValuesChange}
          required={false}
        />
        <ComboField
          variant="outlined"
          label="Gender"
          id="gender"
          data={genderList}
          defaultValue={props.formValues.gender}
          onChange={props.handleValuesChange}
          placeholder="Select date"
          required={false}
        />
      </Box>
      <Box mt={7}>
        <InputField
          variant="outlined"
          label="Equipment specification"
          placeholder="Write a description"
          id="equipmentSpecification"
          type="text"
          defaultValue={props.formValues.equipmentSpecification}
          onChange={props.handleValuesChange}
          required={false}
          fullWidth={true}
          multiline={true}
          rows={5}
        />
      </Box>
    </Box>
  )
}

export default CandidateType