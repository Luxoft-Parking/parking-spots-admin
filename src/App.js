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
      <Route path="/admin/:whatevs?" component={NavBar} />
      <Route exact path="/" render={() => <Redirect to={`/${auth.currentUser ? 'admin' : 'login'}`} />} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/admin" component={Admin} />
    </Router>
  );
}

export default App;
