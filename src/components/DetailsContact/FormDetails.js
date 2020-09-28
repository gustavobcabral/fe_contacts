import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const FormDetails = (props) => {
  const { t } = useTranslation(["common"]);
  const { validator } = props;
  const {
    form,
    submitting,
    validated,
    publisherSelected,
    publishersOptions,
  } = props.state;
  return (
    <Form noValidate validated={validated} onSubmit={props.onSubmit}>
      <Form.Group>
        <Form.Label>Publisher</Form.Label>
        <Select
          name="idPublisher"
          value={publisherSelected}
          options={publishersOptions}
          onChange={({value}) => props.setFormData("idPublisher", value)}
        />
        {validator.message("idPublisher", form.idPublisher, "required")}
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="idStatus"
          onChange={props.handleInputChange}
        >
          <option>Disponivel</option>
          <option value={2}>Revisita</option>
          <option>Estudo</option>
          <option>Nao ligar</option>
        </Form.Control>
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
      <Button disabled={submitting} variant="primary" type="submit">
        {t(submitting ? "btnSubmitting" : "btnSubmit")}
      </Button>
    </Form>
  );
};

export default FormDetails;
