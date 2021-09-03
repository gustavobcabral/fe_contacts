import React from 'react'
import PrivateRoute from '../../../utils/privateRoute'

import ContactsListAll from '../../../pages/Contacts/ContactsListAll'
import ContactsListAvailable from '../../../pages/Contacts/ContactsListAvailable'
import ContactsWaitingFeedbackList from '../../../pages/Contacts/ContactsWaitingFeedbackList'
import ListDetailsContact from '../../../pages/DetailsContact/ListDetailsContact'
import EditDetailsContact from '../../../pages/DetailsContact/EditDetailsContact'
import NewDetailsContact from '../../../pages/DetailsContact/NewDetailsContact'

import contactsPaths from './path'

const Routes = () => (
  <React.Fragment>
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_LIST_PATH}
      component={ContactsListAll}
    />
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_AVAILABLE_LIST_PATH}
      component={ContactsListAvailable}
    />
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_WAITING_FEEDBACK_LIST_PATH}
      component={ContactsWaitingFeedbackList}
    />
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_DETAILS_LIST_PATH}
      component={ListDetailsContact}
    />
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_DETAILS_NEW_PATH}
      component={NewDetailsContact}
    />
    <PrivateRoute
      exact
      path={contactsPaths.CONTACTS_DETAILS_EDIT_PATH}
      component={EditDetailsContact}
    />
  </React.Fragment>
)

export default Routes
