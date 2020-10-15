import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Row, Col } from "react-bootstrap";
import GenderSelect from "../../Common/GenderSelect/GenderSelect";
import SuperSelect from "../../Common/SuperSelect/SuperSelect";
import SuperFormControl from "../../Common/SuperFormControl/SuperFormControl";
import StatusSelect from "../../Common/StatusSelect/StatusSelect";
import LanguageSelect from "../../Common/LanguageSelect/LanguageSelect";

const FormDetails = (component) => {
  const { t } = useTranslation(["detailsContacts", "common", "contacts"]);
  const { validator, handleInputChange, onSubmit } = component;
  const { history } = component.props;
  const { form, submitting, publishersOptions, validated } = component.state;

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
          <Button disabled={submitting} variant="primary" onClick={onSubmit}>
            {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => history.goBack()}
          >
            {t("common:back")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormDetails;
