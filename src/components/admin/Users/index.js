import React from 'react';
import { Route } from 'react-router-dom';
import UsersTable from './UsersTable';
import AssignUsersParking from './AssignUsersParking';
export default function UsersAdmin() {
  return (
    <React.Fragment>
      <Route
        component={AssignUsersParking}
        path="/admin/users/assign/:userId"
      />
      <Route
        exact
        component={UsersTable}
        path="/admin/users" />
    </React.Fragment>
  );
}
