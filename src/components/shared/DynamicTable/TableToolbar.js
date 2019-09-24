import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  filterContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto'
  },
  title: {
    flex: '0 0 auto',
  }, input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function UserTableToolbar(props) {
  const classes = useToolbarStyles();
  const [filterText, setFilterText] = React.useState('');

  return (
    <Toolbar className={classes.root} >
      <Button
        color={'primary'}
        onClick={() => props.onAddRowClicked()}>{'Add'}</Button>
      <Button
        color={'primary'}
        disabled={!props.selectedRow}
        onClick={() => props.onEditRowClicked()}>{'Edit'}</Button>
      <Button
        color={'secondary'}
        disabled={!props.selectedRow}
        onClick={() => props.onDeleteRowClicked()}>{'Remove'}</Button>
      <Paper className={classes.filterContainer}>
        <InputBase
          className={classes.input}
          inputProps={{ 'aria-label': 'filter list' }}
          placeholder="Filter List"
          value={filterText}
          onChange={({ target: { value } }) => { setFilterText(value); props.filterUsers(value.toLowerCase()); }}
        />
        <IconButton
          aria-label="filter"
          className={classes.iconButton}
          onClick={() => { setFilterText(''); props.filterUsers(null); }}>
          <ClearAllIcon />
        </IconButton>
      </Paper>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterUsers: PropTypes.func.isRequired,
  onAddRowClicked: PropTypes.func.isRequired,
  onEditRowClicked: PropTypes.func.isRequired,
  selectedRow: PropTypes.shape({

  }),
};
