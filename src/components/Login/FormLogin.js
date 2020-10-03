import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../Common/SuperFormControl/SuperFormControl";

const FormLogin = (props) => {
  const { t } = useTranslation(["login", "common"]);
  const { form, submitting, validated } = props.state;
  const { validator, handleInputChange } = props;

  return (
    <Modal show={props.show} onHide={props.onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("titleModal")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <SuperFormControl
            type="email"
            name="email"
            autocomplete="email"
            label={t("emailLabel")}
            form={form}
            validator={validator}
            validated={validated}
            placeholder={t("emailPlaceHolder")}
            value={form.email}
            onChange={handleInputChange}
            rules="required|email"
          />
          <SuperFormControl
            type="password"
            name="password"
            label={t("passwordLabel")}
            form={form}
            validator={validator}
            validated={validated}
            autocomplete="current-password"
            placeholder={t("passwordPlaceHolder")}
            value={form.password}
            onChange={handleInputChange}
            rules="required"
          />

          <Button
            disabled={submitting}
            variant="primary"
            type="button"
            onClick={props.onSubmit}
          >
            {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
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
