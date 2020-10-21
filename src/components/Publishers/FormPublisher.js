import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SuperFormControl from '../Common/SuperFormControl/SuperFormControl'
import GenderSelect from '../Common/GenderSelect/GenderSelect'
import StatusSelect from '../Common/StatusSelect/StatusSelect'
import LanguageSelect from '../Common/LanguageSelect/LanguageSelect'

const FormPublishers = (props) => {
  const { t } = useTranslation([
    'detailsContacts',
    'common',
    'contacts',
    'publishers',
  ])
  const { validator } = props
  const {
    form,
    submitting,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
  } = props
  return (
    <Form>
      <Row>
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
      </Row>
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
      </Row>
      {/* <Row>
        <Col>
          <GenderSelect
            validator={validator}
            validated={validated}
            value={form.gender}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <LanguageSelect
            validator={validator}
            validated={validated}
            value={form.idLanguage}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
        <Col>
          <StatusSelect
            name="idStatus"
            label={t('contacts:status')}
            validator={validator}
            validated={validated}
            value={form.idStatus}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
      </Row> */}
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
