import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const ModalDetailsContact = ({ data, onHide, show, t }) => {
  console.log(data, "QUE MERDA VEM ?");
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Titulo</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>thead</th>
              <th>aqui chama o component new passando os parametros necesarios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{data.phone}</td>
            <td>aqui chama o component editar passando os parametros necesarios</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailsContact;
