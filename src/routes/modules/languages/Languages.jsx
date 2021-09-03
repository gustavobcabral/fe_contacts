import React from 'react'
import PrivateRoute from '../../../utils/privateRoute'
import LanguageList from '../../../pages/Languages/LanguagesList'
import languagesPath from './path'

const Routes = () => (
  <React.Fragment>
    <PrivateRoute
      exact
      path={languagesPath.LANGUAGES_LIST_PATH}
      component={LanguageList}
    />
  </React.Fragment>
)

export default Routes
