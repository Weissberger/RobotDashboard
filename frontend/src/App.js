import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Dashboard from './dashboard/pages/Dashboard.js'
import Login from './login/pages/Login.js'
import PrivateRoute from './shared/components/UIElements/PrivateRoute.js';

function App() {
  return (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard}/>
      <Route path="/login">
        <Login/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </Router>
  )
}

export default App;
