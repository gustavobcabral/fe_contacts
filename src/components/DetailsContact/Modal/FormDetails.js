import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../../Common/SuperFormControl/SuperFormControl";
import SuperSelect from "../../Common/SuperSelect/SuperSelect";
import GenderSelect from "../../Common/GenderSelect/GenderSelect";
import StatusSelect from "../../Common/StatusSelect/StatusSelect";
import LanguageSelect from "../../Common/LanguageSelect/LanguageSelect";

const FormDetails = (props) => {
  const { t } = useTranslation(["detailsContacts", "common", "contacts"]);
  const { validator } = props;
  const {
    form,
    submitting,
    publishersOptions,
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
            label={t("detailsContacts:name")}
            validator={validator}
            validated={validated}
            value={form.name}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <GenderSelect
            validator={validator}
            validated={validated}
            value={form.gender}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <StatusSelect
            name="idStatus"
            label={t("contacts:status")}
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
          <LanguageSelect
            validator={validator}
            validated={validated}
            value={form.idLanguage}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <SuperSelect
            name="idPublisher"
            label={t("publisher")}
            validator={validator}
            validated={validated}
            value={form.idPublisher}
            options={publishersOptions}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SuperFormControl
            as="textarea"
            name="information"
            rows={3}
            label={t("informationLabel")}
            validator={validator}
            validated={validated}
            placeholder={t("informationPlaceHolder")}
            value={form.information}
            onChange={handleInputChange}
            rules="required|max:250"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            disabled={submitting}
            variant="primary"
            onClick={() => handleSubmit(onHide)}
          >
            {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
          </Button>{" "}
        </Col>
      </Row>
    </Form>
  );
};

export default FormDetails;
