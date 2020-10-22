import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperSelect from "../../common/SuperSelect/SuperSelect";

const FormSendPhones = (props) => {
  const { t } = useTranslation(["detailsContacts", "common", "contacts"]);
  const { validator } = props;
  const {
    form,
    submitting,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
    publishersOptions,
    phones,
  } = props;
  return (
    <Form>
      <Row>
        <Col>{phones}</Col>
      </Row>
      <Row>
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

export default FormSendPhones;
