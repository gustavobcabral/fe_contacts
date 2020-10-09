import React from "react";
import { withTranslation } from "react-i18next";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import ModalListDetailsContact from "./ModalListDetailsContact";
import { details } from "../../../services";
import { getOr, map, get } from "lodash/fp";
import Swal from "sweetalert2";
import moment from "moment";
import NewDetailsContact from "./NewDetailsContact";
import EditDetailsContact from "./EditDetailsContact";

import AskDelete from "../../Common/AskDelete/AskDelete";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], modalShow: false };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAllOneContact(id) {
    this.setState({ submitting: true });
    const response = await details.getAllOneContact(id);
    this.setState({ data: response.data.data, submitting: false });
  }

  async handleDelete(id) {
    const { t } = this.props;
    this.setState({ submitting: true });
    await details
      .dellOne(id)
      .then(() => {
        this.handleGetAllOneContact();
        this.setState({ submitting: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ submitting: false });
        Swal.fire({
          icon: "error",
          title: t(
            `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
          ),
          text: t(
            `${getOr("errorTextUndefined", "response.data.error", error)}`
          ),
        });
      });
  }

  setModalShow = (action) => this.setState({ modalShow: action });

  componentDidMount() {
    this.handleGetAllOneContact(this.props.id);
  }
  render() {
    const { t, data } = this.props;
    const { modalShow } = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => this.setModalShow(true)}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
        {/* Eu nao recomendo chamar esse component abaixo dessa maneira ja que teria que ficar fora da classe. 
        É melhor voce importar. o ideal seria ate criar um component chamado modal la na pasta de common ja que usamos bastante e passariamos para esse
        component somente o que vai mostrar no modal.body. mas isso pode ser feito depois.
        E o nome do component tem que ser algo mais claro o que ele é.
        MyVerticallyCenteredModalToEdit -> ModalDetailsContact
        
        */}
        {/* <ModalListDetailsContact
          data={data}
          show={modalShow}
          del={this.handleDelete.bind(this)}
          onHide={this.setModalShow.bind(this, false)}
          t={t}
        /> */}

        <Modal
          show={modalShow}
          onHide={this.setModalShow.bind(this, false)}
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
                  <th>{t("common:publisher")}</th>
                  <th>{t("common:date")}</th>
                  <th>{t("common:information")}</th>
                  <th>
                    <NewDetailsContact data={data} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {map(
                  ({ createdAt, namePublisher, information }) => (
                    <tr key={createdAt}>
                      <td>{namePublisher}</td>
                      <td>{moment(createdAt).format("DD/MM/YYYY HH:mm")}</td>
                      <td colSpan="2">{information}</td>
                      <td>
                        {/* <Button variant="success" onClick={() => {}}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>{" "} */}
                        {/* <EditDetailsContacts
                         data={status}
                        afterClose={this.handleGetAll}
                      />{" "} */}
                        <EditDetailsContact data={data} />{" "}
                        <AskDelete
                          id={data.details.id}
                          funcToCallAfterConfirmation={this.handleDelete.bind(
                            this
                          )}
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
            <Button onClick={this.setModalShow.bind(this, false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(ModalEdit);
