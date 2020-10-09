import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import StatusForm from "./StatusForm";

const ModalStatus = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.t("title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StatusForm {...props} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const StatusModalComponent = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation(["status", "common"]);
  const { modeEdit } = props;

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={modeEdit ? faEdit : faPlusSquare} />
      </Button>

      <ModalStatus
        {...props}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
      />
    </>
  );
};
export default StatusModalComponent;
