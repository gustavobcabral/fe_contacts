import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CheckNumber from '../common/CheckNumbers/CheckNumbers'
import ResponsibilitySelect from '../common/ResponsibilitySelect/ResponsibilitySelect'
import SuperFormControl from '../common/SuperFormControl/SuperFormControl'
import SuperSelect from '../common/SuperSelect/SuperSelect'
// import GenderSelect from '../common/GenderSelect/GenderSelect'
// import StatusSelect from '../common/StatusSelect/StatusSelect'
// import LanguageSelect from '../common/LanguageSelect/LanguageSelect'

const FormPublishers = (props) => {
  const { t } = useTranslation([
    "publishers",
    "responsibility",
    "detailsContacts",
    "common",
    "contacts",
  ]);
  const { validator } = props;
  const {
    form,
    submitting,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
  } = props;

  return (
    <Form>
      <Row>
        <Col>
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
        <Col>
          <SuperFormControl
            type="number"
            name="phone"
            label={t('phone')}
            validator={validator}
            validated={validated}
            value={form.phone}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>

        <CheckNumber phone={form.phone} />
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="email"
            name="email"
            label={t('email')}
            validator={validator}
            validated={validated}
            value={form.email}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>
        <Col>
          <ResponsibilitySelect
            name="idResponsibility"
            label={t("responsibility")}
            validator={validator}
            validated={validated}
            value={form.idResponsibility}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="password"
            name="password"
            label={t("password")}
            form={form}
            validator={validator}
            validated={validated}
            //autocomplete="current-password"
            // placeholder={t('password')}
            value={form.password}
            onChange={handleInputChange}
            //rules="required"
          />
        </Col>
        <Col>
          <SuperFormControl
            type="password"
            name="password"
            label={t("password")}
            form={form}
            validator={validator}
            validated={validated}
            //autocomplete="current-password"
            // placeholder={t('password')}
            value={form.password}
            onChange={handleInputChange}
            //rules="required"
          />
        </Col>
      </Row>
      <Button
        disabled={submitting}
        variant="primary"
        onClick={() => handleSubmit(onHide)}
      >
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>{" "}
    </Form>
  );
};

export default FormPublishers;
