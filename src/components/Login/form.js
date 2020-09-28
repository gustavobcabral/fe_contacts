import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FormLogin = (props) => {
  const { t } = useTranslation(["login", "common"]);
  const { validator } = props;
  const { form, submitting, validated } = props.state;
  return (
    <Modal show={props.show} onHide={props.onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("titleModal")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={props.onSubmit}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder={t("emailPlaceHolder")}
              value={form.email}
              onChange={props.handleInputChange}
            />
            {validator.message("email", form.email, "required|email")}
          </Form.Group>

          <Form.Group>
            <Form.Label>{t("passwordLabel")}</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder={t("passwordPlaceHolder")}
              name="password"
              value={form.password}
              onChange={props.handleInputChange}
            />

            {validator.message("password", form.password, "required")}
          </Form.Group>
          <Button disabled={submitting} variant="primary" type="submit">
            {t(submitting ? "common:btnSubmitting" : "btnSubmit")}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormLogin;
