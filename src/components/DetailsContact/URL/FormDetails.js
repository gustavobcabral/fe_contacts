import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Row, Col } from "react-bootstrap";
import GenderSelect from "../../Common/GenderSelect/GenderSelect";
import SuperSelect from "../../Common/SuperSelect/SuperSelect";
import SuperFormControl from "../../Common/SuperFormControl/SuperFormControl";
import StatusSelect from "../../Common/StatusSelect/StatusSelect";

const FormDetails = (props) => {
  const { t } = useTranslation(["common"]);
  const { validator } = props;
  const {
    form,
    submitting,
    publishersOptions,
    validated,
  } = props.state;

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
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
          <GenderSelect
            validator={validator}
            validated={validated}
            value={form.gender}
            onChange={props.handleInputChange}
          />
        </Col>
        <Col>
        <StatusSelect
            name="idStatus"
            label={t("contacts:status")}
            validator={validator}
            validated={validated}
            value={form.idStatus}
            onChange={props.handleInputChange}
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
        onChange={props.handleInputChange}
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
        onChange={props.handleInputChange}
        rules="required|max:250"
      />
      <Button disabled={submitting} variant="primary" onClick={props.onSubmit}>
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>{" "}
      <Button variant="secondary" onClick={() => props.props.history.goBack()}>
        {t("common:back")}
      </Button>{" "}
    </Form>
  );
};

export default FormDetails;
