import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../common/SuperFormControl/SuperFormControl";
import GenderSelect from "../common/GenderSelect/GenderSelect";
import StatusSelect from "../common/StatusSelect/StatusSelect";
import LanguageSelect from "../common/LanguageSelect/LanguageSelect";

const FormDetails = (props) => {
  const { t } = useTranslation(["contacts", "common"]);
  const {
    form,
    submitting,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
    validator,
  } = props;
  return (
    <Form>
      <Row className="mb-2">
        <Col xs={2}>
          <Form.Check
            type="radio"
            name="typeCompany"
            label={t("residential")}
            validator={validator}
            checked={!form.typeCompany || form.typeCompany === "0"}
            value={0}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <Form.Check
            type="radio"
            name="typeCompany"
            label={t("commercial")}
            validator={validator}
            checked={form.typeCompany || form.typeCompany === "1"}
            value={1}
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            type="number"
            name="phone"
            label={t("phone")}
            validator={validator}
            validated={validated}
            value={form.phone}
            onChange={handleInputChange}
            rules="required|min:10"
          />
        </Col>
        <Col>
          <SuperFormControl
            type="number"
            name="phone2"
            label={t("phone2")}
            validator={validator}
            validated={validated}
            value={form.phone2}
            onChange={handleInputChange}
            rules="min:10"
          />
        </Col>
        <Col>
          <SuperFormControl
            type="text"
            name="name"
            label={t("name")}
            validator={validator}
            validated={validated}
            value={form.name}
            onChange={handleInputChange}
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
          />
        </Col>
        <Col>
          <SuperFormControl
            type="location"
            name="location"
            label={t("location")}
            validator={validator}
            validated={validated}
            value={form.location}
            onChange={handleInputChange}
            rules="min:4"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <GenderSelect
            validator={validator}
            validated={validated}
            value={form.gender}
            onChange={handleInputChange}
            rules="required"
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
            label={t("status")}
            validator={validator}
            validated={validated}
            value={form.idStatus}
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

export default FormDetails;
