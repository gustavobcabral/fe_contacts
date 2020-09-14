import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const FormLogin = (props) => (
  <Modal show={props.show} onHide={props.onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={props.onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={props.state.email}
            onChange={props.handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={props.state.Password}
            onChange={props.handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Logar
        </Button>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default FormLogin;
