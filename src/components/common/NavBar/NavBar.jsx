import React from 'react'
import { Navbar, Nav, NavDropdown, Image, Col } from 'react-bootstrap'
import { get } from 'lodash/fp'
import {
  getUserData,
  hasToken,
  isAtLeastSM,
} from '../../../utils/loginDataManager'
import logo from '../../../assets/images/logo.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Login from '../../Login/Login'
import Logout from '../../Logout/Logout'
import SystemLanguages from '../../SystemLanguages/SystemLanguages'
import {
  contactsPaths,
  publishersPaths,
  statusPaths,
  languagesPaths,
} from '../../../routes/paths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlobeAmericas,
  faHourglass,
  faList,
  faUserFriends,
  faCogs,
  faBriefcase,
  faLanguage,
  faTags,
} from '@fortawesome/free-solid-svg-icons'

const MenuLogged = ({ t, ...props }) => {
  const contactsMenuItem = (
    <>
      <FontAwesomeIcon icon={faUserFriends} /> {t('contacts')}
    </>
  )
  const adminMenuItem = (
    <>
      <FontAwesomeIcon icon={faCogs} /> {t('admin')}
    </>
  )

  return (
    <>
      <Nav className="mr-auto">
        <NavDropdown title={contactsMenuItem}>
          {isAtLeastSM() && (
            <>
              <NavDropdown.Item as={Link} to={contactsPaths.CONTACTS_LIST_PATH}>
                <FontAwesomeIcon icon={faGlobeAmericas} /> {t('allContacts')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to={contactsPaths.CONTACTS_AVAILABLE_LIST_PATH}
              >
                <FontAwesomeIcon icon={faList} /> {t('allContactsAvailable')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </>
          )}
          <NavDropdown.Item
            as={Link}
            to={contactsPaths.CONTACTS_WAITING_FEEDBACK_LIST_PATH}
          >
            <FontAwesomeIcon icon={faHourglass} />{' '}
            {t('allContactsWaitingFeedback')}
          </NavDropdown.Item>
        </NavDropdown>
        {isAtLeastSM() && (
          <NavDropdown title={adminMenuItem} id="collasible-nav-dropdown">
            <NavDropdown.Item
              as={Link}
              to={publishersPaths.PUBLISHERS_LIST_PATH}
            >
              <FontAwesomeIcon icon={faBriefcase} /> {t('publishers')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={statusPaths.STATUS_LIST_PATH}>
              <FontAwesomeIcon icon={faTags} /> {t('status')}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={languagesPaths.LANGUAGES_LIST_PATH}>
              <FontAwesomeIcon icon={faLanguage} /> {t('languages')}
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
      <Nav style={{ marginRight: '34px' }}>
        <NavDropdown title={get('name', getUserData())}>
          <Logout {...props} t={t} />
        </NavDropdown>
      </Nav>
      <Nav style={{ maxWidth: '60px' }}>
        <SystemLanguages {...props} />
      </Nav>
    </>
  )
}

const MenuLogout = ({ t, ...props }) => (
  <>
    <Nav className="mr-auto">
      <Col xs={7} sm={12}>
        <Login {...props} t={t} />
      </Col>
    </Nav>
    <Nav className="mt-1">
      <Col xs={7} sm={12}>
        <SystemLanguages {...props} />
      </Col>
    </Nav>
  </>
)

const NavBarMenu = (props) => {
  const { t } = useTranslation(['navBar'])
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        <Image src={logo} width="50px" height="50px" alt="Agenda" roundedCircle />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {hasToken() ? (
          <MenuLogged {...props} t={t} />
        ) : (
          <MenuLogout {...props} t={t} />
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBarMenu
