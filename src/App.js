import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import auth from './utils/authentication';

import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Admin from './components/admin/Admin';
import NavBar from './components/shared/NavBar';

function App() {
  return (
    <Router>
      <Route
        component={NavBar}
        path="/admin/:whatevs?" />
      <Route
        exact
        path="/"
        render={() => <Redirect to={`/${auth.currentUser ? 'admin' : 'login'}`} />} />
      <Route
        component={Login}
        path="/login" />
      <Route
        component={Logout}
        path="/logout" />
      <Route
        component={Admin}
        path="/admin" />
    </Router>
  );
}

export default App;
