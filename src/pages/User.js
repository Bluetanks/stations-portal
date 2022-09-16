import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination, MenuItem, ListItemIcon, ListItemText, TextField, FormControl, InputLabel, Select, Snackbar, Alert,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import {useInfiniteQuery, useMutation, useQuery} from "@tanstack/react-query";
import {allStations, getTotalStations, getUsers, updateChargeStatus} from "../actions";
import dayjs from "dayjs"
import {Form, FormikProvider, useFormik} from "formik";
import SelectInput from "@mui/material/Select/SelectInput";
import {LoadingButton} from "@mui/lab";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {setResponse, unSetResponse} from "../app/slices/userSlice";
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const formSchema = yup.object().shape({

  status: yup.string().required('Please provide status'),
})

export default function Users() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { responseMessage,
    responseState,
    responseType,station:{
    name
  }} = user

  const params = useParams()
  const {isLoading, mutate} =useMutation(['update-charge'], updateChargeStatus,{
    onSuccess:(data)=>{
      if(data.success) {


        dispatch(setResponse({
          responseMessage:data.message,
          responseState:true,
          responseType:'success',
        }))
      }else{
        dispatch(setResponse({
          responseMessage:data.error.message,
          responseState:true,
          responseType:'error',
        }))
      }
    }
  })

  const formik = useFormik({
    initialValues: {

      status: ""

    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const { status} = values
      const body = JSON.stringify({

        status
      })

mutate({body,stationId:user.station._id, chargeId:params.id})
//user.station._id
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, getFieldProps } = formik;


  useEffect(() =>{
    // console.log(user)
    if (responseState || responseMessage) {


      const time = setTimeout(() => {
        dispatch(unSetResponse({
          responseState:false,
          responseMessage:''
        }))
      }, 3000)
      return () => {
        clearTimeout(time)
      };
    }

  },[responseState,responseMessage])

  return (
    <Page title="User">

      <Container>
        <Snackbar open={responseState} anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                  autoHideDuration={3000} >
          <Alert variant={"standard"} severity={responseType} sx={{ width: '100%' }}>
            {responseMessage}
          </Alert>
        </Snackbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update current charge
          </Typography>

        </Stack>


          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>


              <Stack spacing={3}>




                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Charge status</InputLabel>
                  <Select
                      error={errors.status}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.status}
                      label="Charge status"
                      {...getFieldProps('status')}

                  required>
                    <MenuItem value="LOCKED">Lock</MenuItem>
                    <MenuItem value="UNLOCKED">Unlock</MenuItem>
                    <MenuItem value="CANCELLED">Cancel</MenuItem>
                  </Select>

                </FormControl>

                <LoadingButton onClick={() => handleSubmit()} fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
                  Submit
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

      </Container>
    </Page>
  );
}
