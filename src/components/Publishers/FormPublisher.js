import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckNumber from "../common/CheckNumbers/CheckNumbers";
import ResponsibilitySelect from "../common/ResponsibilitySelect/ResponsibilitySelect";
import SuperFormControl from "../common/SuperFormControl/SuperFormControl";

const FormPublishers = (props) => {
  const { t } = useTranslation([
    "publishers",
    "responsibility",
    "detailsContacts",
    "common",
    "contacts",
  ]);
  const {
    form,
    validator,
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
            label={t("name")}
            validator={validator}
            validated={validated}
            value={form.name}
            onChange={handleInputChange}
            disabled={form.disabled}
            rules="required"

          />
        </Col>
        <Col>
          <SuperFormControl
            type="number"
            name="phone"
            label={t("phone")}
            endLabel={<CheckNumber phone={form.phone} />}
            validator={validator}
            validated={validated}
            value={form.phone}
            onChange={handleInputChange}
            rules="required|min:10"
            disabled={form.disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="email"
            name="email"
            label={t("email")}
            validator={validator}
            validated={validated}
            value={form.email}
            onChange={handleInputChange}
            rules="email"
            disabled={form.disabled}
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
            justAllowedForMe={form.justAllowedForMe}
            rules="required"
            disabled={form.disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="password"
            name="password"
            label={t("password")}
            validator={validator}
            validated={validated}
            placeholder={t("password")}
            value={form.password}
            onChange={handleInputChange}
            disabled={form.disabled}
          />
        </Col>
        <Col>
          <SuperFormControl
            type="password"
            name="repeatPassword"
            label={t("repeatPasswordLabel")}
            validator={validator}
            validated={validated}
            placeholder={t("repeatPasswordPlaceHolder")}
            value={form.repeatPassword}
            onChange={handleInputChange}
            rules="mustBeEqualFieldPassword"
            extraRules={form.password}
            disabled={form.disabled}
          />
        </Col>
      </Row>
      <Button
        disabled={form.disabled || submitting}
        variant="primary"
        onClick={() => handleSubmit(onHide)}
      >
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>{" "}
    </Form>
  );
};

export default FormPublishers;
