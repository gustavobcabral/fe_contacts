import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import FormDetails from "./FormDetails";

const ModalForm = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.modeEdit ? "Edit" : "New"} Details Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* tive que copiar o form details para esta pasta porque era diferente alguns parametros */}
        <FormDetails {...props} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalFormComponent = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation(["status", "common"]);
  const { modeEdit, onOpen } = props;

  const toogleModal = () => {
    if (onOpen) onOpen();
    setModalShow(true);
  };


  return (
    <>
      <Button variant="primary" onClick={toogleModal}>
        <FontAwesomeIcon icon={modeEdit ? faEdit : faPlusSquare} />
      </Button>

      <ModalForm
        {...props}
        show={modalShow}
        onHide={() => setModalShow(false)}
        t={t}
      />
    </>
  );
};
export default ModalFormComponent;
