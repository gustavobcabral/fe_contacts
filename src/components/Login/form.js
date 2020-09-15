import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { patternEmail } from "../../utils/forms";

const FormLogin = (props) => {
  const { t } = useTranslation(["login", "common"]);
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("titleModal")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={props.state.validated}
          onSubmit={props.onSubmit}
        >
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder={t("emailPlaceHolder")}
              pattern={patternEmail}
              value={props.state.form.email}
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              {t("common:requiredFieldAndPatternValid")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>{t("passwordLabel")}</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder={t("passwordPlaceHolder")}
              name="password"
              value={props.state.form.password}
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              {t("common:requiredField")}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={props.state.submitting}
            variant="primary"
            type="submit"
          >
            {t(props.state.submitting ? "common:btnSubmitting" : "btnSubmit")}
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
