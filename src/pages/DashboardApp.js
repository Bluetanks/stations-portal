import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import {useQuery} from "@tanstack/react-query";
import {allCharge, allStations, getUsers, stations} from "../actions";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
   /* const Token = JSON.parse(localStorage.getItem('Token'));
    console.log(Token)*/
  const {isLoading, data:users} = useQuery(['vtg-charges'],()=> allCharge('V2G'))
  const {isLoading:loadingStations, data:charge} = useQuery(['charge'], () =>allCharge('G2V'),{
    onSuccess:(data)=>{
      console.log(data)
    }
  })

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="All charge" total={
                !isLoading ? users && users?.data?.total : 0
            } color={"primary"} icon={'ant-design:user-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending" total={
                !loadingStations ? charge && charge?.data?.total : 0
            } color="warning" icon={'ant-design:wifi-outline'} />
          </Grid>







          <Grid item xs={12} md={6} lg={4}>

          </Grid>

          <Grid item xs={12} md={6} lg={8}>

          </Grid>



        </Grid>
      </Container>
    </Page>
  );
}
