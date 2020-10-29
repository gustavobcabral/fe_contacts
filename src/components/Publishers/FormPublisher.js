import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ResponsibilitySelect from "../common/ResponsibilitySelect/ResponsibilitySelect";
import SuperFormControl from "../common/SuperFormControl/SuperFormControl";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const CheckNumber = () => {
    console.log("TU CLICOU");
  };
  return (
    <Form>
      <Row>
        <Col>
          <SuperFormControl
            type="text"
            name="name"
            label={t("detailsContacts:name")}
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
            label={t("contacts:phone")}
            validator={validator}
            validated={validated}
            value={form.phone}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>
        <Col style={{ marginTop: "32px" }}>
          <Button
            variant="success"
            onClick={() => {
              CheckNumber();
            }}
          >
            Test <FontAwesomeIcon icon={faWhatsapp} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="email"
            name="email"
            label={t("publishers:email")}
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
            rules="required"
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
            rules="required"
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
