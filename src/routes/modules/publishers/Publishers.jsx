import React, { Fragment } from 'react'
import PrivateRoute from '../../../utils/privateRoute'
import Publishers from '../../../pages/Publishers/Publishers'

import publishersPaths from './path'

const Routes = () => (
  <Fragment>
    <PrivateRoute
      exact
      key={publishersPaths.PUBLISHERS_LIST_PATH}
      path={publishersPaths.PUBLISHERS_LIST_PATH}
      component={Publishers}
    />
    <PrivateRoute
      exact
      key={publishersPaths.PUBLISHERS_NEW_PATH}
      path={publishersPaths.PUBLISHERS_NEW_PATH}
      component={Publishers}
    />
    <PrivateRoute
      exact
      key={publishersPaths.PUBLISHERS_EDIT_PATH}
      path={publishersPaths.PUBLISHERS_EDIT_PATH}
      component={Publishers}
    />
  </Fragment>
)

export default Routes
