import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const FormLogin = (props) => {
  const { t } = useTranslation(['login', 'common']);
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('titleModal')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.onSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder={t('emailPlaceHolder')}
              value={props.state.form.email}
              onChange={props.handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>{t('passwordLabel')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('passwordPlaceHolder')}
              name="password"
              value={props.state.form.password}
              onChange={props.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
          {t('btnSubmit')}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{t('common:close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormLogin;
