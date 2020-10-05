import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";



const MyVerticallyCenteredModalToEdit = ({ data, onHide, show, t }) => {
  console.log(data, "MERDAZ");
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
          {data.name} - {data.phone}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover responsive>
          <thead></thead>
          <tbody>
            <Form.Group>
              <Form.Label>Publisher</Form.Label>
              <Select
              //  name="idPublisher"
              //  value={data.phone.namePublisher}
              //options={data.namePublisher}
              // onChange={({ value }) => props.setFormData("idPublisher", value)}
              />
              {/* {validator.message("idPublisher", form.idPublisher, "required")} */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Select
              // name="idStatus"
              // value={statusSelected}
              // options={statusOptions}
              // onChange={({ value }) => props.setFormData("idStatus", value)}
              />
              {/* {validator.message("idStatus", form.idStatus, "required")} */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
              // as="textarea"
              // rows={3}
              // name="information"
              // onChange={props.handleInputChange}
              // defaultValue={form.information}
              />
              {/* {validator.message("information", form.information, "required")} */}
            </Form.Group>
            <Button variant="primary" onClick={() => {}}>
              SALVAR
              {/* {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")} */}
            </Button>{" "}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ShowDetails = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation(["common"]);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>

      <MyVerticallyCenteredModalToEdit
        data={props.data}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
      />
    </>
  );
};
export default ShowDetails;
