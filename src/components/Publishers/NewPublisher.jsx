import React from 'react'
import { withTranslation } from 'react-i18next'
import OurModal from '../common/OurModal/OurModal'
import Swal from 'sweetalert2'
import { getOr, get, isEmpty } from 'lodash/fp'
import SimpleReactValidator from 'simple-react-validator'
import { getLocale, handleInputChangeGeneric } from '../../utils/forms'
import { publishers } from '../../services'
import FormPublisher from './FormPublisher'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseErrorMessage } from '../../utils/generic'

const fields = {
  name: '',
  phone: '',
  password: null,
  repeatPassword: null,
  email: '',
  idResponsibility: '',
  active: 1,
}

class NewPublisher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
      validators: {
        mustBeEqualFieldPassword: {
          message: this.props.t('mustBeEqualFieldPassword'),
          rule: (val) =>
            val === this.state.form.password ||
            isEmpty(this.state.form.password),
          required: true,
        },
      },
    })
  }

  async componentDidMount() {
    this.setState({ loading: true })

    this.setState({
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

    const data = {
      name: get('name', form),
      phone: get('phone', form),
      password: get('password', form),
      email: get('email', form),
      idResponsibility: get('idResponsibility', form),
      active: get('active', form),
    }
    try {
      await publishers.create(data)
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
          `publishers:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      })
    }
  }

  render() {
    const { form, validated } = this.state
    const { t, afterClose } = this.props
    return (
      <OurModal
        body={FormPublisher}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onExit={afterClose}
        title={`${t('common:new')} ${t('titleCrud')}`}
        buttonText={<FontAwesomeIcon icon={faUserPlus} />}
      />
    )
  }
}

export default withTranslation(['publishers', 'common'])(NewPublisher)
