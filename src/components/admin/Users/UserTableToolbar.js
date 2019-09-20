import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import UserDataForm from './UserDataForm';

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
  const { selectedUser } = props;
  const [isAddUserOpen, setAddUserOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');

  return (
    <Toolbar className={classes.root} >
      <Button color={'primary'} onClick={() => setAddUserOpen(true)}>{'Add'}</Button>
      <Button color={'primary'} onClick={() => setAddUserOpen(true)} disabled={!selectedUser}>{'Edit'}</Button>
      <Button color={'secondary'} disabled={!selectedUser}>{'Remove'}</Button>
      <Paper className={classes.filterContainer}>
        <InputBase
          className={classes.input}
          placeholder="Filter List"
          inputProps={{ 'aria-label': 'filter list' }}
          value={filterText}
          onChange={({ target: { value } }) => { setFilterText(value); props.filterUsers(value.toLowerCase()); }}
        />
        <IconButton className={classes.iconButton} aria-label="filter" onClick={() => { setFilterText(''); props.filterUsers(null); }}>
          <ClearAllIcon />
        </IconButton>
      </Paper>
      <UserDataForm
        isOpen={isAddUserOpen}
        onFormClose={() => setAddUserOpen(false)}
        onUserAdded={(user) => {
          setAddUserOpen(false);
          props.onUserAdded(user);
        }}
        onUserEdited={(user) => {
          setAddUserOpen(false);
          props.onUserEdited(user);
        }}
        user={selectedUser}
      />
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterUsers: PropTypes.func.isRequired,
  onUserAdded: PropTypes.func.isRequired,
  onUserEdited: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({

  }),
};
