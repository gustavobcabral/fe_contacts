import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SuperFormControl from '../common/SuperFormControl/SuperFormControl'
import ReactPlaceholder from 'react-placeholder'

const LanguagesForm = (props) => {
  const { t } = useTranslation(['languages', 'common'])
  const {
    validator,
    handleInputChange,
    form,
    loading,
    validated,
    onHide,
    handleSubmit,
  } = props
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="text"
      ready={!loading}
      rows={12}
    >
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <SuperFormControl
              type="text"
              name="name"
              label={t('nameLabel')}
              validator={validator}
              validated={validated}
              placeholder={t('namePlaceHolder')}
              value={form.name}
              onChange={handleInputChange}
              rules="required|max:25"
            />
          </Col>
          <Col xs={12} lg={6}>
            <SuperFormControl
              type="text"
              name="color"
              label={t('colorLabel')}
              validator={validator}
              validated={validated}
              placeholder={t('colorPlaceHolder')}
              value={form.color}
              onChange={handleInputChange}
              rules="required|max:7"
            />
          </Col>
        </Row>

        <Button
          disabled={loading}
          variant="primary"
          type="button"
          onClick={() => handleSubmit(onHide)}
        >
          {t(loading ? 'common:btnSubmitting' : 'common:btnSubmit')}
        </Button>
      </Form>
    </ReactPlaceholder>
  )
}

export default LanguagesForm
