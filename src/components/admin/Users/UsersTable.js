import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import DynamicTable from '../../shared/DynamicTable';
import DeleteRecordModal from '../../shared/DeleteRecordModal';
import UserDataForm from './UserDataForm';

import api from '../../../utils/api';

const tableColumns = [
  { id: 'fullName', type: 'string', label: 'Full Name' },
  { id: 'username', type: 'string', label: 'Email' },
  { id: 'team', type: 'string', label: 'Team' },
  { id: 'isDriver', type: 'boolean', label: 'Driver' },
  { id: 'hasParkingSpot', type: 'boolean', label: 'Has Spot Assigned?' },
  { id: 'spot.level', type: 'string', label: 'Level' },
  { id: 'spot.number', type: 'number', label: 'Number' },
  { id: 'reputation', type: 'number', label: 'Reputation' },
  { id: 'isValidEmail', type: 'boolean', label: 'Validated Email' },
];
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  }
}));

export default function UsersTable(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isAddUserOpen, setAddUserOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState(false);

  function deleteUser() {
    api.deleteUser(selectedUser._id,
      () => {
        setDeleteOpen(false);
        setDeleteError(false);
        setUsers(users.filter(user => user._id !== selectedUser._id));
      },
      () => {
        setDeleteError(true);
      });
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
    setDeleteError(false);
  }
  function onUserAdded(user) {
    setUsers([user, ...users]);
  }

  function onUserEdited(user) {
    Object.assign(selectedUser, user);
    setSelectedUser(null);
  }

  React.useEffect(() => {
    api.listUsers().then(users => {
      setUsers(users);
    });
  }, []);

  return (
    <div className={classes.root}>
      <DynamicTable
        cols={tableColumns}
        rows={users}
        selectedRow={selectedUser}
        onAddRowClicked={() => { setSelectedUser(null); setAddUserOpen(true); }}
        onAssignClicked={() => { props.history.push(`/admin/users/assign/${selectedUser._id}`); }}
        onDeleteRowClicked={() => { setDeleteOpen(true); }}
        onEditRowClicked={() => { setAddUserOpen(true); }}
        onSelectionChange={setSelectedUser}
      />
      <UserDataForm
        isOpen={isAddUserOpen}
        user={selectedUser}
        onFormClose={() => setAddUserOpen(false)}
        onUserAdded={(user) => {
          setAddUserOpen(false);
          onUserAdded(user);
        }}
        onUserEdited={(user) => {
          setAddUserOpen(false);
          onUserEdited(user);
        }}
      />
      <DeleteRecordModal
        error={deleteError}
        isOpen={isDeleteOpen}
        onConfirmDelete={deleteUser}
        onFormClose={closeDeleteModal}
      />

    </div>
  );
}

UsersTable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
