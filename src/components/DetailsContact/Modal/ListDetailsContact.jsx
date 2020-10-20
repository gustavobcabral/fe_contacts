import React from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { details } from '../../../services'
import { getOr, isEmpty } from 'lodash/fp'
import Swal from 'sweetalert2'
import OurModal from '../../Common/OurModal/OurModal'
import ListDataDetailsContact from './ListDataDetailsContact'

class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], modalShow: false }
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleGetAllOneContact() {
    this.setState({ submitting: true })
    const id = getOr(0, 'props.id', this)
    const response = await details.getAllOneContact(id)
    this.setState({ data: response.data.data, submitting: false })
  }

  async handleDelete(id) {
    const { t } = this.props
    this.setState({ submitting: true })
    await details
      .dellOne(id)
      .then(() => {
        this.handleGetAllOneContact()
        this.setState({ submitting: false })
      })
      .catch((error) => {
        this.setState({ submitting: false })
        Swal.fire({
          icon: 'error',
          title: t(
            `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
          ),
          text: t(
            `${getOr('errorTextUndefined', 'response.data.error', error)}`
          ),
        })
      })
  }

  setModalShow = (action) => this.setState({ modalShow: action })

  getNameForTitle() {
    const { contact } = this.props
    return !isEmpty(contact.name) ? `- ${contact.name}` : ''
  }

  render() {
    const { t, contact, afterClose } = this.props
    const { data } = this.state
    return (
      <OurModal
        body={ListDataDetailsContact}
        contact={contact}
        data={data}
        title={`${t('title')} # ${contact.phone} ${this.getNameForTitle()}`}
        buttonText={<FontAwesomeIcon icon={faEye} />}
        afterClose={this.handleGetAllOneContact}
        onExit={afterClose}
        onEnter={this.handleGetAllOneContact}
        funcToCallAfterConfirmation={this.handleDelete}
      />
    )
  }
}

export default withTranslation(['detailsContacts', 'common'])(
  ListDetailsContact
)
