import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { find } from "lodash/fp";

const FormDetails = (props) => {
  console.log(props, "MERDA PROPS URL EDIT")
  const { t } = useTranslation(["common"]);
  const { validator } = props;
  const { form, submitting, publishersOptions, statusOptions } = props.state;
   const publisherSelected = find(
    (option) => option.value === form.idPublisher,
    publishersOptions
  );
  const statusSelected = find(
    (option) => option.value === form.idStatus,
    statusOptions
  );
  // const { history } = this.state;
  return (
    <div>
      <Form.Group>
        <Form.Label>Publisher</Form.Label>
        <Select
          name="idPublisher"
          value={publisherSelected}
          options={publishersOptions}
          onChange={({ value }) => props.setFormData("idPublisher", value)}
        />
        {validator.message("idPublisher", form.idPublisher, "required")}
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Select
          name="idStatus"
          value={statusSelected}
          options={statusOptions}
          onChange={({ value }) => props.setFormData("idStatus", value)}
        />
        {validator.message("idStatus", form.idStatus, "required")}
      </Form.Group>
      <Form.Group>
        <Form.Label>Details</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="information"
          onChange={props.handleInputChange}
          defaultValue={form.information}
        />
        {validator.message("information", form.information, "required")}
      </Form.Group>
      <Button disabled={submitting} variant="primary" onClick={props.onSubmit}>
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>{" "}
      <Button variant="secondary" onClick={() => props.props.history.goBack()}>
        {t("common:back")}
      </Button>{" "}
    </div>
  );
};

export default FormDetails;
