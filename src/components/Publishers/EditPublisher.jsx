import React from 'react'
import { withTranslation } from 'react-i18next'
import OurModal from '../common/OurModal/OurModal'
import Swal from 'sweetalert2'
import { getOr, map, get } from 'lodash/fp'
import SimpleReactValidator from 'simple-react-validator'
import { getLocale, handleInputChangeGeneric } from '../../utils/forms'
import { publishers, responsibility } from '../../services'
import FormPublisher from './FormPublisher'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fields = {
  name: '',
  phone: '',
  password: null,
  email: '',
  idResponsibility: '',
  active: 1,
}

class EditContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      responsibilityOptions: [],
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

  reduceResponsibility = (responsibility) =>
    map(
      (responsibility) => ({
        value: responsibility.id,
        label: responsibility.description,
      }),
      getOr([], 'data.data', responsibility)
    )

  async handleGetOne() {
    this.setState({ loading: true })
    const id = getOr(0, 'props.id', this)
    const response = await publishers.getOne(id)
    const form = getOr(fields, 'data.data', response)
    const responsibilityOptions = this.reduceResponsibility(
      await responsibility.get()
    )

    this.setState({
      form,
      responsibilityOptions,
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
      name: get('name', form),
      phone: get('phone', form),
      password: get('password', form),
      email: get('email', form),
      idResponsibility: get('idResponsibility', form),
      active: get('active', form),
    }

    try {
      await publishers.updatePublishers(id, data)
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
    const { form, validated, responsibilityOptions } = this.state
    const { t, afterClose } = this.props
    return (
      <OurModal
        body={FormPublisher}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onEnter={this.handleGetOne}
        onExit={afterClose}
        responsibilityOptions={responsibilityOptions}
        title={`${t('common:edit')} ${t('titleCrud')}`}
        buttonText={<FontAwesomeIcon icon={faEdit} />}
        buttonVariant="success"
      />
    )
  }
}

export default withTranslation(['publishers', 'common'])(EditContact)
