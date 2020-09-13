import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasToken } from './tokenManager';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => hasToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;