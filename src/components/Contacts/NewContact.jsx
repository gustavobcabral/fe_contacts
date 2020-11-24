import React from 'react'
import { withTranslation } from 'react-i18next'
import OurModal from '../common/OurModal/OurModal'
import Swal from 'sweetalert2'
import { getOr, map } from 'lodash/fp'
import SimpleReactValidator from 'simple-react-validator'
import { getLocale, handleInputChangeGeneric } from '../../utils/forms'
import { contacts, publishers, status } from '../../services'
import FormContacts from './FormContacts'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ID_LANGUAGE_DEFAULT,
  ID_GENDER_DEFAULT,
  ID_STATUS_DEFAULT,
} from '../../constants/valuesPredefined'
import { parseErrorMessage } from '../../utils/generic'

const fields = {
  phone: '',
  phone2: '',
  name: '',
  note: '',
  location: '',
  email: null,
  typeCompany: false,
  gender: ID_GENDER_DEFAULT,
  idStatus: ID_STATUS_DEFAULT,
  idLanguage: ID_LANGUAGE_DEFAULT,
}

class NewContact extends React.Component {
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

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.resetForm = this.resetForm.bind(this)

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

  async onOpen() {
    this.setState({ loading: true })
    const publishersOptions = this.reducePublishers(await publishers.getAll())
    const statusOptions = this.reduceStatus(await status.getAll())

    this.setState({
      publishersOptions,
      statusOptions,
      loading: false,
    })
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

    try {
      await contacts.create(form)
      this.setState({ submitting: false })
      Swal.fire({
        title: t('common:dataSuccessfullySaved'),
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      })
      onHide()
      this.resetForm()
    } catch (error) {
      this.setState({ submitting: false })
      Swal.fire({
        icon: 'error',
        title: t(
          `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
        ),
        text: t(
          `contacts:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      })
    }
  }

  resetForm() {
    this.setState({ form: fields, submitting: false, validated: false })
    this.validator.hideMessages()
  }

  render() {
    const {
      form,
      validated,
      publishersOptions,
      statusOptions,
      submitting,
    } = this.state
    const { t, afterClose } = this.props
    return (
      <OurModal
        body={FormContacts}
        validator={this.validator}
        submitting={submitting}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onExit={afterClose}
        onEnter={this.onOpen}
        onClose={this.resetForm}
        publishersOptions={publishersOptions}
        statusOptions={statusOptions}
        buttonTitle={t("common:new")}
        title={`${t('common:new')} ${t('titleCrud')}`}
        buttonText={<FontAwesomeIcon icon={faUserPlus} />}
      />
    )
  }
}

export default withTranslation(['contacts', 'common'])(NewContact)
