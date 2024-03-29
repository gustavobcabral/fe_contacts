import React from 'react'
import { Radio } from 'pretty-checkbox-react'
import { useTranslation } from 'react-i18next'
import { Form, Row, Col } from 'react-bootstrap'
import ReactPlaceholder from 'react-placeholder'

import Button from '../common/Button/Button'
import SuperSelect from '../common/SuperSelect/SuperSelect'
import GenderSelect from '../common/GenderSelect/GenderSelect'
import StatusSelect from '../common/StatusSelect/StatusSelect'
import LanguageSelect from '../common/LanguageSelect/LanguageSelect'
import SuperFormControl from '../common/SuperFormControl/SuperFormControl'

const FormContacts = (props) => {
  const { t } = useTranslation(['contacts', 'common'])
  const {
    form,
    submitting,
    handleSubmit,
    loading,
    onHide,
    handleInputChange,
    validated,
    validator,
    disablePhone,
    locationsOptions,
  } = props

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="text"
      ready={!loading}
      rows={18}
    >
      <Form>
        <Row className="mb-2">
          <Col xs={6} lg={2}>
            <Form.Group controlId="typeCompanyResidential">
              <Radio
                name="typeCompany"
                color="success"
                bigger
                checked={form.typeCompany === false || form.typeCompany === '0'}
                value={0}
                onChange={handleInputChange}
              >
                {t('residential')}
              </Radio>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="typeCompanyCommercial">
              <Radio
                name="typeCompany"
                color="warning"
                bigger
                validator={validator}
                checked={form.typeCompany === true || form.typeCompany === '1'}
                value={1}
                onChange={handleInputChange}
              >
                {t('commercial')}
              </Radio>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={6}>
            <SuperFormControl
              type="text"
              name="phone"
              label={t('phone')}
              validator={validator}
              validated={validated}
              value={form.phone}
              disabled={disablePhone}
              onChange={handleInputChange}
              autocomplete="off"
              rules="required|numberStartsWithInvalidCharacter|numeric|min:9"
            />
          </Col>
          <Col xs={6} lg={6}>
            <SuperFormControl
              type="text"
              name="phone2"
              label={t('phone2')}
              validator={validator}
              validated={validated}
              value={form.phone2}
              onChange={handleInputChange}
              autocomplete="off"
              rules="numberStartsWithInvalidCharacter|numeric|min:9"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={12}>
            <SuperFormControl
              type="text"
              name="name"
              label={t('name')}
              validator={validator}
              validated={validated}
              value={form.name}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        {(form.typeCompany === true || form.typeCompany === '1') && (
          <Row>
            <Col xs={12} lg={12}>
              <SuperFormControl
                type="text"
                name="owner"
                label={t('owner')}
                validator={validator}
                validated={validated}
                value={form.owner}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12} lg={6}>
            <SuperFormControl
              type="email"
              name="email"
              label={t('email')}
              validator={validator}
              validated={validated}
              value={form.email}
              onChange={handleInputChange}
              rules="email"
            />
          </Col>
          <Col xs={12} lg={6}>
            <SuperSelect
              name="idLocation"
              label={t('location')}
              validator={validator}
              validated={validated}
              isClearable={true}
              value={form.idLocation}
              options={locationsOptions}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            lg={4}
            className={
              form.typeCompany === true || form.typeCompany === '1'
                ? 'd-none'
                : ''
            }
          >
            <GenderSelect
              validator={validator}
              validated={validated}
              value={form.gender}
              onChange={handleInputChange}
              rules="required"
            />
          </Col>
          <Col
            xs={12}
            lg={form.typeCompany === true || form.typeCompany === '1' ? 6 : 4}
          >
            <LanguageSelect
              validator={validator}
              validated={validated}
              value={form.idLanguage}
              onChange={handleInputChange}
              rules="required"
            />
          </Col>
          <Col
            xs={12}
            lg={form.typeCompany === true || form.typeCompany === '1' ? 6 : 4}
          >
            <StatusSelect
              name="idStatus"
              label={t('status')}
              validator={validator}
              validated={validated}
              value={form.idStatus}
              onChange={handleInputChange}
              rules="required"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SuperFormControl
              as="textarea"
              name="note"
              rows={3}
              label={t('noteLabel')}
              validator={validator}
              validated={validated}
              placeholder={t('notePlaceHolder')}
              value={form.note}
              onChange={handleInputChange}
              rules="max:250"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={{ order: 'first', span: 3 }}>
            <Button
              disabled={submitting}
              variant="success"
              onClick={() => handleSubmit(onHide)}
              submitting={submitting}
              text={t('common:btnSubmit')}
              textLoading={t('common:btnSubmitting')}
              behavior="submit"
              animate
            />
          </Col>
          <Col xs={{ order: 'first', span: 12 }} md={9} className="text-right">
            <Form.Text muted>{form.lastPublisherThatTouched}</Form.Text>
          </Col>
        </Row>
      </Form>
    </ReactPlaceholder>
  )
}

export default FormContacts
