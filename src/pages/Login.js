import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Card, Link, Container, Typography, Box, Snackbar, Alert, Slide} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';

// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import Logo from "../assets/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {unSetResponse} from "../app/slices/userSlice";
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}
export default function Login() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const {
    responseMessage,
    responseState,
    responseType,
    isAuthenticated
  } = user

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');


  useEffect(() =>{
    // console.log(user)
    if (responseState || responseMessage) {


      const time = setTimeout(() => {
        dispatch(unSetResponse({
          responseState:false,
          responseMessage:''
        }))
      }, 3500)
      return () => {
        clearTimeout(time)
      };
    }

  },[responseState,responseMessage])

  return (
    <Page title="Login">
      <RootStyle>

        <HeaderStyle>
          <Box sx={{ width: 40, height: 40 }}>
              <img src={Logo} alt="Bluetanks"/>
          </Box>

          <Snackbar open={responseState} TransitionComponent={TransitionRight} anchorOrigin={{vertical:'top', horizontal:'right'}}
                    autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant={"standard"} severity={responseType} sx={{ width: '100%' }}>
              {responseMessage}
            </Alert>
          </Snackbar>
        </HeaderStyle>



        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Your portal
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>


            <LoginForm />


          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
