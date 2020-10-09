//aqui vai toda a logica para criar um novo
// Aqui voce devera usar o mesmo formulario que vc usa via rora o arquivo FormDetails.js que na verdade deveri ser jsx porque rederiza componentes

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const ModalListDetailsContact = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Publisher</Form.Label>
          <Select
          // name="idPublisher"
          // value={publisherSelected}
          // options={publishersOptions}
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
        <Button
          //disabled={submitting}
          variant="primary"
          onClick={props.onSubmit}
        >
          {/* {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")} */}
        </Button>{" "}
        <Button
          variant="secondary"
          //onClick={() => props.props.history.goBack()}
        >
          {/* {t("common:back")} */}
        </Button>{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalListDetailsContactComponent = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation(["status", "common"]);
  const { modeEdit } = props;

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={modeEdit ? faEdit : faPlusSquare} />
      </Button>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        {t("common:add")}
      </Button> */}
      <ModalListDetailsContact
        {...props}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
      />
    </>
  );
};
export default ModalListDetailsContactComponent;
