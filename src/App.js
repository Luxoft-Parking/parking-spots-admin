import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import auth from './utils/authentication'

import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Admin from './components/admin/Admin'
import NavBar from './components/shared/NavBar';

function App(props) {
  /* eslint-disable no-restricted-globals */
  return (
    <Router>
      <Route path="/admin/:whatevs?" component={NavBar}/>
      <div>
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <Route exact path="/" render={() => <Redirect to={ '/login'} />} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/admin" component={Admin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
