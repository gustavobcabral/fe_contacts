import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import { getOr } from "lodash/fp";
import { map } from "lodash/fp";
import AskDelete from "../Common/AskDelete/AskDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserPlus, faList } from "@fortawesome/free-solid-svg-icons";
import ListDetailsContact from "../DetailsContact/Modal/ListDetailsContact";
import { Link } from "react-router-dom";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAll() {
    this.setState({ submitting: true });
    const response = await contacts.getAll("");
    this.setState({ data: response.data.data.list, submitting: false });
  }

  handleEdit(id) {
    console.log("i will get contact id " + id);
  }

  async handleDelete(id) {
    const { t } = this.props;
    this.setState({ submitting: true });
    await contacts
      .dellOne(id)
      .then(() => {
        this.handleGetAll();
      })
      .catch((error) => {
        this.setState({ submitting: false });
        Swal.fire({
          icon: "error",
          title: t(getOr("errorTextUndefined", "response.data.cod", error)),
        });
      });
  }

  componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{t("common:name")}</th>
              <th>{t("phone")}</th>
              <th>{t("language")}</th>
              <th>{t("status")}</th>
              <th>{t("details")}</th>
              <th>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faUserPlus} />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {map(
              (contact) => (
                <tr key={contact.phone}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.languageName}</td>
                  <td>{contact.statusDescription}</td>
                  <td>
                    <ListDetailsContact contact={contact} id={contact.phone} afterClose={this.handleGetAll} />{" "}
                    <Button
                      variant="success"
                      as={Link}
                      to={`/contacts/${contact.phone}/details`}
                    >
                      <FontAwesomeIcon icon={faList} />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={this.handleEdit.bind(this, contact.phone)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    <AskDelete
                      id={contact.phone}
                      funcToCallAfterConfirmation={this.handleDelete}
                    />
                  </td>
                </tr>
              ),
              data
            )}
          </tbody>
        </Table>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(Contacts);
