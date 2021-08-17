import React from 'react';
import {Route, Redirect, useLocation} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const {user} = location.state || {};

  if(!user){
    return <Redirect to={{pathname:'/login', from:location.pathname}}/>
  }

  return (
    <Route {...rest} render={(props)=> (<Component {...props} {...rest}/>)}/>
  );
};

export default PrivateRoute;