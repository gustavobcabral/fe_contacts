import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

const MyVerticallyCenteredModal = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Vai o titulo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>publisher</th>
            <th>date</th>
            <th>information</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((detail) => (
            <tr key={detail.createdAt}>
              <td>{detail.name_publisher}</td>
              <td>{detail.createdAt}</td>
              <td>{detail.information}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const ShowDetails = (props) => {
  console.log(props)
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Mostrar
      </Button>

      <MyVerticallyCenteredModal
        data={props.data}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default ShowDetails;
