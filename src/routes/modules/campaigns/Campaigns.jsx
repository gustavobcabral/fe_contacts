import React from 'react'
import PrivateRoute from '../../../utils/privateRoute'
import CampaignsList from '../../../pages/Campaigns/CampaignsList'
import CampaignListAllContacts from '../../../pages/Campaigns/CampaignListAllContacts'
import CampaignCharts from '../../../pages/Campaigns/CampaignCharts'

import campaignsPath from './path'

const Routes = () => [
  <PrivateRoute
    exact
    path={campaignsPath.CAMPAIGNS_LIST_PATH}
    key={campaignsPath.CAMPAIGNS_LIST_PATH}
    component={CampaignsList}
  />,
  <PrivateRoute
    exact
    path={campaignsPath.CAMPAIGNS_LIST_ALL_CONTACTS_PATH}
    key={campaignsPath.CAMPAIGNS_LIST_ALL_CONTACTS_PATH}
    component={CampaignListAllContacts}
  />,
  <PrivateRoute
    exact
    path={campaignsPath.CAMPAIGNS_LIST_CHARTS_PATH}
    key={campaignsPath.CAMPAIGNS_LIST_CHARTS_PATH}
    component={CampaignCharts}
  />,
]

export default Routes
