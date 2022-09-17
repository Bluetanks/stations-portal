import { faker } from '@faker-js/faker';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  TableCell,
  Stack,
  TableBody,
  TableRow,
  TablePagination,
  TableContainer, Table, Card
} from '@mui/material';
import {filter} from 'lodash';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppWidgetSummary,

} from '../sections/@dashboard/app';
import {useQuery} from "@tanstack/react-query";
import {allCharge, allCharges,} from "../actions";
import {useSelector} from "react-redux";
import {useState} from "react";
import SearchNotFound from "../components/SearchNotFound";
import {UserListHead, UserListToolbar, UserMoreMenu} from "../sections/@dashboard/user";
import Scrollbar from "../components/Scrollbar";
import Label from "../components/Label";
import {sentenceCase} from "change-case";

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  {id: 'type', label: 'Type', alignRight: false},
  {id: 'address', label: 'Address', alignRight: false},
  {id: 'isLongTerm', label: 'Long Term', alignRight: false},
  {id: 'isReservation', label: 'Reservation', alignRight: false},
  {id: 'status', label: 'Status', alignRight: false},
  {id: ''},
];



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}





export default function DashboardApp() {
  const theme = useTheme();
   /* const Token = JSON.parse(localStorage.getItem('Token'));
    console.log(Token)*/

  const stationDetails = useSelector(state => state.user)
const {station: {_id}} = stationDetails

  const {isLoading, data:users} = useQuery(['vtg-charges'],()=> allCharge('V2G'))
  const {isLoading:loadingCharges, data:charges} = useQuery(['all-charges'], () =>allCharges(_id),{
    onSuccess:(data)=>{
      console.log(data)
    }
  })



  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = charges && charges?.data?.charges.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  let filteredCharges = [];
  let emptyRows;
  if (!loadingCharges && charges) {
    emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - charges?.data?.charges.length) : 0;

    filteredCharges = applySortFilter(charges.data.charges, getComparator(order, orderBy), filterName);
  }
  const isUserNotFound = filteredCharges.length === 0;




  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="All charge" total={
                !isLoading ? charges && charges?.data?.total : 0
            } color={"primary"} icon={'ant-design:user-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending" total={0
              /*  !loadingCharges ? charges && charges?.data?.total : 0*/
            } color="warning" icon={'ant-design:wifi-outline'} />
          </Grid>







          <Grid item xs={12} md={6} lg={4}>

          </Grid>

          <Grid item xs={12} md={6} lg={8}>

          </Grid>



        </Grid>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName}
                           onFilterName={handleFilterByName}/>

          <Scrollbar>
            <TableContainer sx={{minWidth: 800}}>
              {
                  !loadingCharges && charges &&

                  <Table>
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={!loadingCharges ? charges && charges?.data?.charges.length : 0}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {charges?.data?.charges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                          _id, createdAt, isLongTerm, isReservation, origin, status, type
                        } = row;
                        const isItemSelected = selected.indexOf(type) !== -1;

                        return (
                            <TableRow
                                hover
                                key={_id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">

                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>

                                  <Typography textTransform={"capitalize"} color={"primary"}
                                              component={RouterLink} to={`/dashboard/charge/${_id}`}
                                              variant="subtitle2" noWrap>
                                    {type}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{origin}</TableCell>
                              <TableCell align="left">{isLongTerm ? 'Yes' : 'Instantaneous'}</TableCell>
                              <TableCell align="left">{isReservation ? 'Yes' : 'No'}</TableCell>
                              <TableCell align="left">
                                <Label variant="ghost"
                                       color={(status === 'BOOKED' && 'error') || 'success'}>
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <UserMoreMenu id={_id}/>
                              </TableCell>
                            </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                          <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                          </TableRow>
                      )}
                    </TableBody>

                    {!loadingCharges && isUserNotFound && (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                              <SearchNotFound searchQuery={filterName}/>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                    )}
                  </Table>
              }
            </TableContainer>
          </Scrollbar>

          {
              !loadingCharges && charges &&
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={charges && charges?.data?.charges.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
          }
        </Card>

      </Container>
    </Page>
  );
}
