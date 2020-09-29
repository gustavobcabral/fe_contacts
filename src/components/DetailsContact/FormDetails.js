import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { find } from "lodash/fp";


const FormDetails = (props) => {
  const { t } = useTranslation(["common"]);
  const { validator } = props;
  const { form, submitting, publishersOptions } = props.state;
  const publisherSelected = find(
    (option) => option.value === form.idPublisher,
    publishersOptions
  );

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
        <Form.Control
          as="select"
          name="idStatus"
          value={form.idStatus}
          onChange={props.handleInputChange}
        >
          <option value=""></option>
          <option value="1">Livre</option>
          <option value="2">Revisita</option>
          <option>Estudo</option>
          <option>Nao ligar</option>
        </Form.Control>
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
        {t(submitting ? "btnSubmitting" : "btnSubmit")}
      </Button>
    </div>
  );
};

export default FormDetails;
