import React from 'react';
import { Redirect } from 'react-router-dom';

import { logout } from '../../utils/authentication';

function Logout() {
  logout();
  return (
    <Redirect to="/login" />
  );
}

export default Logout;
