import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import UserTableHeader from './UserTableHeader';
import UserTableToolbar from './UserTableToolbar';

import api from '../../../utils/api';

const tableRows = [
  { id: 'fullName', numeric: false, label: 'Full Name' },
  { id: 'username', numeric: false, label: 'Email' },
  { id: 'team', numeric: false, label: 'Team' },
  { id: 'isDriver', numeric: false, label: 'Driver' },
  { id: 'hasParkingSpot', numeric: false, label: 'Has Spot Assigned?' },
  { id: 'reputation', numeric: true, label: 'Reputation' },
  { id: 'isValidEmail', numeric: true, label: 'Validated Email' },
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fullName');
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rows, setRows] = React.useState([]);
  const [filterText, setFilterText] = React.useState(null);

  React.useEffect(() => {
    api.listUsers().then(users => {

      setRows(users);
    });
  }, []);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';

    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleClick(user) {
    setSelected(user);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function onUserAdded(user) {
    setRows([user, ...rows]);
  }

  function onUserEdited(user) {
    Object.assign(selected, user);
    setSelected(null);
  }

  function filterUsers(filterText) {

    setFilterText(filterText || null);
  }

  const isSelected = row => selected && selected._id === row._id;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const filteredRows = !filterText ? rows : rows.filter((row) => row.username.toLowerCase().includes(filterText) || row.fullName.toLowerCase().includes(filterText));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar
          filterUsers={filterUsers}
          selectedUser={selected}
          onUserAdded={onUserAdded}
          onUserEdited={onUserEdited} />
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            className={classes.table}
            size={'small'}
          >
            <UserTableHeader
              classes={classes}
              headCells={tableRows}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                stableSort(filteredRows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {

                    return (
                      <TableRow
                        key={row._id}
                        hover
                        aria-checked={isSelected(row)}
                        role="checkbox"
                        selected={isSelected(row)}
                        onClick={() => handleClick(row)}
                      >
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.team}</TableCell>
                        <TableCell>{row.isDriver ? 'Y' : 'N'}</TableCell>
                        <TableCell>{row.hasParkingSpot ? 'Y' : 'N'}</TableCell>
                        <TableCell>{row.reputation}</TableCell>
                        <TableCell>{row.isValidEmail ? 'Y' : 'N'}</TableCell>
                      </TableRow>
                    );
                  })
              }
              {
                emptyRows > 0 && (
                  <TableRow style={{ height: 30 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          component="div"
          count={filteredRows.length}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
