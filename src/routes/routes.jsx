import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import Dashboard from '../pages/Dashboard/Dashboard'
import ContactsRoutes from './modules/contacts/Contacts'
import PublishersRoutes from './modules/publishers/Publishers'
import StatusRoutes from './modules/status/Status'
import LanguageRoutes from './modules/languages/Languages'

import PrivateRoute from '../utils/privateRoute'
import PublicRoute from '../utils/publicRoute'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact key="/home" path="/" component={Home} />
      <PrivateRoute
        exact
        key="/dashboard"
        path="/dashboard"
        component={Dashboard}
      />
      {<ContactsRoutes />}
      {<PublishersRoutes />}
      {<LanguageRoutes />}
      {<StatusRoutes />}
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
)

export default Routes
