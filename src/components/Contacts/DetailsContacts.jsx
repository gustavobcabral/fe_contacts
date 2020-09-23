import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import moment from "moment";
import { map, get } from "lodash/fp";
import { useTranslation } from "react-i18next";
import AskDelete from "../AskDelete/AskDelete";

const MyVerticallyCenteredModal = ({ data, onHide, show, t }) => {
  const handleEdit = (id) => {
    console.log("id " + id);
  };

  const handleDelete = (t, id) => {
    console.log("id " + id);
  };

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
          <thead>
            <tr>
              <th>Publisher</th>
              <th>Date</th>
              <th>Information</th>
              <th>
                <Button variant="primary">{t("common:add")}</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {map(
              ({ createdAt, name_publisher, information, id_detail }) => (
                <tr key={createdAt}>
                  <td>{name_publisher}</td>
                  <td>{moment(createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{information}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={handleEdit.bind(this, id_detail)}
                    >
                      {t("common:edit")}
                    </Button>{" "}
                    <AskDelete
                      id={id_detail}
                      funcToCallAfterConfirmation={handleDelete}
                    />
                  </td>
                </tr>
              ),
              get("details", data)
            )}
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
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Mostrar
      </Button>

      <MyVerticallyCenteredModal
        data={props.data}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
      />
    </>
  );
};
export default ShowDetails;
