import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { get } from 'lodash';

import UserTableHeader from './TableHeader';
import UserTableToolbar from './TableToolbar';

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

export default function DynamicTable(props) {
  const classes = useStyles();
  const [cols, setCols] = React.useState([]);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rows, setRows] = React.useState([]);
  const [filterText, setFilterText] = React.useState(null);
  const [filterableColumns, setFilterableColumns] = React.useState([]);

  React.useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);

  React.useEffect(() => {
    setCols(props.cols);
    setOrderBy(props.cols[0].id);
    setOrder('asc');
    setFilterableColumns(props.cols.filter(column => column.type === 'string'));
  }, [props.cols]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';

    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleClick(row) {
    setSelected(row);
    props.onSelectionChange(row);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function filterUsers(filterText) {
    setFilterText(filterText || null);
  }

  const isSelected = row => selected && selected._id === row._id;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const filteredRows = !filterText ? rows : rows.filter((row) => filterableColumns.find(col => get(row, col.id, '').toLowerCase().includes(filterText)));

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar
          filterUsers={filterUsers}
          selectedRow={selected}
          onAddRowClicked={() => {
            props.onSelectionChange(null);
            props.onAddRowClicked();
          }}
          onDeleteRowClicked={props.onDeleteRowClicked}
          onEditRowClicked={props.onEditRowClicked}
        />
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            className={classes.table}
            size={'small'}
          >
            <UserTableHeader
              classes={classes}
              headCells={cols}
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
                        {
                          cols.map(col => (
                            <TableCell key={`${row._id}-${col.id}`}>{`${get(row, col.id, '')}`}</TableCell>
                          ))
                        }
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

DynamicTable.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({

  }).isRequired).isRequired,
  selectedRow: PropTypes.shape({

  }),
  onAddRowClicked: PropTypes.func.isRequired,
  onDeleteRowClicked: PropTypes.func.isRequired,
  onEditRowClicked: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};
