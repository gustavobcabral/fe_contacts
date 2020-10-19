import React from 'react'
import { withTranslation } from 'react-i18next'
import OurModal from '../Common/OurModal/OurModal'
import Swal from 'sweetalert2'
import { getOr, map, get } from 'lodash/fp'
import SimpleReactValidator from 'simple-react-validator'
import { getLocale, handleInputChangeGeneric } from '../../utils/forms'
import { contacts, publishers, status } from '../../services'
import FormContacts from './FormContacts'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fields = {
  phone: '',
  name: '',
  gender: '',
  idStatus: '',
  idLanguage: null,
}

class EditContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publishersOptions: [],
      statusOptions: [],
    }
    this.handleGetOne = this.handleGetOne.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    })
  }

  reducePublishers = (publishers) =>
    map(
      (publisher) => ({ value: publisher.id, label: publisher.name }),
      getOr([], 'data.data', publishers)
    )

  reduceStatus = (status) =>
    map(
      (status) => ({ value: status.id, label: status.description }),
      getOr([], 'data.data', status)
    )

  async handleGetOne() {
    this.setState({ loading: true })
    const id = getOr(0, 'props.id', this)
    const response = await contacts.getOne(id)
    const form = getOr(fields, 'data.data', response)
    const publishersOptions = this.reducePublishers(await publishers.getAll())
    const statusOptions = this.reduceStatus(await status.getAll())

    this.setState({
      form,
      publishersOptions,
      statusOptions,
      loading: false,
    })
  }

  onEnter() {
    this.handleGetOne()
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this)
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true })

    if (!this.validator.allValid()) {
      this.validator.showMessages()
      return true
    }
    this.setState({ submitting: true })

    const { form } = this.state
    const { t } = this.props
    const id = getOr(0, 'props.id', this)

    const data = {
      phone: get('phone', form),
      name: get('name', form),
      gender: get('gender', form),
      idStatus: get('idStatus', form),
      idLanguage: get('idLanguage', form),
    }

    try {
      await contacts.updateContact(id, data)
      this.setState({ submitting: false })
      Swal.fire({
        title: t('common:dataSuccessfullySaved'),
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      })
      onHide()
      this.setState({ form: fields, submitting: false, validated: false })
      this.validator.hideMessages()
    } catch (error) {
      this.setState({ submitting: false })
      Swal.fire({
        icon: 'error',
        title: t(
          `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
        ),
        text: t(
          `common:${getOr(
            'errorWithoutDetails',
            'response.data.error.code',
            error
          )}`
        ),
      })
    }
  }

  render() {
    const { form, validated, publishersOptions, statusOptions } = this.state
    const { t, afterClose } = this.props
    return (
      <OurModal
        body={FormContacts}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        onEnter={this.handleGetOne}
        form={form}
        onExit={afterClose}
        publishersOptions={publishersOptions}
        statusOptions={statusOptions}
        title={`${t('common:edit')} ${t('titleCrud')}`}
        buttonText={<FontAwesomeIcon icon={faEdit} />}
        buttonVariant="success"
      />
    )
  }
}

export default withTranslation(['Contacts', 'common'])(EditContact)
