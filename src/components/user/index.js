import React from 'react'
import Axios from 'axios'
import { Box, Grid, Button, CircularProgress } from '@material-ui/core'
import { dummyUser } from '../../DummyData'

const Profile = props => {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    let source = Axios.CancelToken.source()
    let unmounted = false
    Axios.get(" https://jsonplaceholder.typicode.com/users", { cancelToken: source.token }).then(res => {
      if (!unmounted) {
        if (res.data.length) setData(res.data)
        else console.log("Failed to fetch data")
      }
    }).catch(err => {
      if (!unmounted) console.log(err.message)
    })

    // useEffect cleanup function
    return () => {
      unmounted = true
      source.cancel("Component got unmounted")
    }
  }, [])

  const handlePostRequest = (item) => {
    const body = dummyUser
    Axios.post("https://jsonplaceholder.typicode.com/users", body).then(res => {
      // we apply checks here to check the response that its successful or not,
      // as i dont know about the api so i am just consoling here
      console.log(res.data)
      if (res.data) setData([...data, res.data])
    }).catch(err => {
      console.log(err.message)
    })
  }

  return (
    <Box p={5}>
      <Box p={5}><Button variant="contained" color="primary" onClick={handlePostRequest}>send post api request</Button></Box>
      {data.length ? data.map(item => (
        <Grid container key={item.id}>
          <Grid item xs={12} md={2}><strong>Name</strong>: {item.name}</Grid>
          <Grid item xs={12} md={1}><strong>username</strong>: {item.username}</Grid>
          <Grid item xs={12} md={2}><strong>email</strong>: {item.email}</Grid>
          <Grid item xs={12} md={1}><strong>address</strong>: {item.address.city}</Grid>
          <Grid item xs={12} md={2}><strong>location</strong>: {`${item.address.geo.lat}, ${item.address.geo.lng}`}</Grid>
          <Grid item xs={12} md={2}><strong>phone</strong>: {item.phone}</Grid>
          <Grid item xs={12} md={1}><strong>website</strong>: {item.website}</Grid>
          <Grid item xs={12} md={1}><strong>company Name</strong>: {item.company.name}</Grid>
        </Grid>
      )) :
        <Box textAlign="center"><CircularProgress size={30} color="primary" /></Box>
      }
    </Box>
  );
}

export default Profile
