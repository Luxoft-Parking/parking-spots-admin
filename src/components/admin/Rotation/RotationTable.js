import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
}));

export default function RotationTable(props) {
  const { rows, hasSpotInfo = true } = props;
  const [page, setPage] = useState(0);

  const classes = useStyles();

  function onChangePage(event, page) {
    setPage(page);
  }
  return (
    <Paper className={classes.paper}>
      <TablePagination
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        component="div"
        count={rows.length}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        page={page}
        rowsPerPage={20}
        onChangePage={onChangePage}
        rowsPerPageOptions={[20]}
      />

      <Table
        size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Reputation</TableCell>
            {hasSpotInfo && (
              <React.Fragment>
                <TableCell>Level</TableCell>
                <TableCell>Number</TableCell>
              </React.Fragment>
            )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * 20, page * 20 + 20).map(row => (
            <TableRow key={row.fullName}>
              <TableCell
                component="th"
                scope="row">
                {row.fullName}
              </TableCell>
              <TableCell>{row.reputation}</TableCell>
              {hasSpotInfo && (
                <React.Fragment>
                  <TableCell>{row.spot.level}</TableCell>
                  <TableCell>{row.spot.number}</TableCell>
                </React.Fragment>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
