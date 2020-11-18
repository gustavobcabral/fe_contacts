import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { dropToken } from '../../utils/loginDataManager'
import Swal from 'sweetalert2'
import { withTranslation } from 'react-i18next'

const handleLogout = (props) => {
  console.log(props, "PROPS LOGOUT")
  const { history, t } = props
   dropToken()
  history.push('/')
  Swal.fire({
    title: t('logout:YouWasLogoutSuccessfully'),
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
  })
}

const Logout = (props) => (
  <NavDropdown.Item onClick={() => handleLogout(props)}>
    Logout
  </NavDropdown.Item>
)

export default withTranslation(["logout"])(Logout)
