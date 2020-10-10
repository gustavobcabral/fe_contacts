import React from "react";
import { withTranslation } from "react-i18next";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faList } from "@fortawesome/free-solid-svg-icons";
import { details } from "../../../services";
import { getOr, map } from "lodash/fp";
import Swal from "sweetalert2";
import moment from "moment";
import NewDetailsContact from "./NewDetailsContact";
import EditDetailsContact from "./EditDetailsContact";

import AskDelete from "../../Common/AskDelete/AskDelete";

class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], modalShow: false };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAllOneContact() {
    this.setState({ submitting: true });
    const id = getOr(0, 'props.id', this)
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
    this.handleGetAllOneContact();
  }

  render() {
    const { t, contact } = this.props;
    const { modalShow, data } = this.state;
    return (
      <>
        <Button variant="primary" onClick={() => this.setModalShow(true)}>
          <FontAwesomeIcon icon={faList} />
        </Button>
        <Modal
          show={modalShow}
          onHide={this.setModalShow.bind(this, false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {contact.name} - {contact.phone}
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
                    <NewDetailsContact
                      afterClose={this.handleGetAllOneContact}
                      contact={contact}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {map(
                  (detail) => (
                     <tr key={detail.id}>
                      <td>{detail.publisherName}</td>
                      <td>
                        {moment(detail.createdAt).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td >{detail.information}</td>
                      <td style={{width:"114px"}}>
                        <EditDetailsContact
                          data={detail}
                          id={detail.id}
                          afterClose={this.handleGetAllOneContact}
                        />{" "}
                        <AskDelete
                          id={detail.id}
                          funcToCallAfterConfirmation={this.handleDelete}
                        />
                      </td>
                    </tr>
                  ),
                  data
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

export default withTranslation(["contacts", "common"])(ListDetailsContact);
