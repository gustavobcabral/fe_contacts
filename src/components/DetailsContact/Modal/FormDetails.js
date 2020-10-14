import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../../Common/SuperFormControl/SuperFormControl";
import SuperSelect from "../../Common/SuperSelect/SuperSelect";
import GenderSelect from "../../Common/GenderSelect/GenderSelect";

const FormDetails = (props) => {
  const { t } = useTranslation(["detailsContacts", "common", "contacts"]);
  const { validator } = props;
  const {
    form,
    submitting,
    publishersOptions,
    statusOptions,
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
          <SuperSelect
            name="idStatus"
            label={t("contacts:status")}
            validator={validator}
            validated={validated}
            value={form.idStatus}
            options={statusOptions}
            onChange={handleInputChange}
            rules="required"
          />
        </Col>
      </Row>
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
