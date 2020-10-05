import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { getOr } from "lodash/fp";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { data: [] };
    // this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    //  this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    // const { t } = this.props;
    // const { data } = this.state;
    // const phone = getOr(0, "props.match.params.phone", this);

    const MyVerticallyCenteredModalToEdit = ({ props, onHide, show, t }) => {
      console.log(props, "QUE MERDA VEM ?");
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
              <thead>header</thead>
              <tbody>body</tbody>
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

    return <ShowDetails />;
  }
}

export default withTranslation(["contacts", "common"])(ModalEdit);
