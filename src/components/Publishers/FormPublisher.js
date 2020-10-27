import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ResponsibilitySelect from '../common/ResponsibilitySelect/ResponsibilitySelect'
import SuperFormControl from '../common/SuperFormControl/SuperFormControl'
import SuperSelect from '../common/SuperSelect/SuperSelect'
// import GenderSelect from '../common/GenderSelect/GenderSelect'
// import StatusSelect from '../common/StatusSelect/StatusSelect'
// import LanguageSelect from '../common/LanguageSelect/LanguageSelect'

const FormPublishers = (props) => {
  const { t } = useTranslation([
    'publishers',
    'responsibility',
    'detailsContacts',
    'common',
    'contacts',
  ])
  const { validator } = props
  const {
    form,
    submitting,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
    responsibilityOptions,
  } = props

  const CheckNumber = () => {
    console.log('TU CLICOU')
  }
  return (
    <Form>
      <Row>
        <Col>
          <SuperFormControl
            type="number"
            name="phone"
            label={t('contacts:phone')}
            validator={validator}
            validated={validated}
            value={form.phone}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>
        <Col>
          <SuperFormControl
            type="text"
            name="name"
            label={t('detailsContacts:name')}
            validator={validator}
            validated={validated}
            value={form.name}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Button
        variant="info"
        style={{
          justifyContent: 'end',
        }}
        onClick={() => {
          CheckNumber()
        }}
      >
        Test
      </Button>
      <Row>
        <Col>
          <SuperFormControl
            type="email"
            name="email"
            label={t('publishers:email')}
            validator={validator}
            validated={validated}
            value={form.email}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>
        <Col>
          {/* <SuperSelect
            name="idResponsibility"
            label={t('publishers:responsibility')}
            validator={validator}
            validated={validated}
            value={form.idResponsibility}
            options={responsibilityOptions}
            onChange={handleInputChange}
            rules="required"
          /> */}
          <ResponsibilitySelect
            name="idResponsibility"
            label={t('responsibility')}
            validator={validator}
            validated={validated}
            value={form.idResponsibility}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
      </Row>
      <Button
        disabled={submitting}
        variant="primary"
        onClick={() => handleSubmit(onHide)}
      >
        {t(submitting ? 'common:btnSubmitting' : 'common:btnSubmit')}
      </Button>{' '}
    </Form>
  )
}

export default FormPublishers
