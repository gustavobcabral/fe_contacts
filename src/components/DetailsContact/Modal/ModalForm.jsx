//aqui vai toda a logica para criar um novo
// Aqui voce devera usar o mesmo formulario que vc usa via rora o arquivo FormDetails.js que na verdade deveri ser jsx porque rederiza componentes

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import FormDetails from "../FormDetails";

const ModalListDetailsContact = (props) => {
 
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <FormDetails onSubmit={(e) => this.handleSubmit(e)} {...this} />
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
