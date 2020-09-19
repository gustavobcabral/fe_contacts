import React from "react";
import { Button, Table, Accordion } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import { getOr } from "lodash/fp";
import { map } from "lodash/fp";
import AskDelete from "../AskDelete/AskDelete";

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
    // console.log("i will get contact id " + id);
  }

  async handleDelete(t, id) {
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
    // console.log("i am ready");
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    // console.log(data);

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
                <Button variant="primary">{t("common:add")}</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact) => (
              <tr key={contact.phone}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.language_name}</td>
                <td>{contact.status_description}</td>
                <td>
                  <Accordion>
                    <Accordion.Toggle
                      as={Button}
                      variant="success"
                      eventKey="0"
                    >
                      nao ficou bom, melhor mostrar num modal!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>publisher</th>
                            <th>date</th>
                            <th>information</th>
                          </tr>
                        </thead>
                        <tbody>
                          {map(
                            (detail) => (
                              <tr key={detail.createdAt}>
                                <td>{detail.id_publisher}</td>
                                <td>{detail.createdAt}</td>
                                <td>{detail.information}</td>
                              </tr>
                            ),
                            contact.details
                          )}
                        </tbody>
                      </Table>
                    </Accordion.Collapse>
                  </Accordion>{" "}
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={this.handleEdit.bind(this, "aqui vai o id")}
                  >
                    {t("common:edit")}
                  </Button>{" "}
                  <AskDelete
                    id={contacts.phone}
                    funcToCallAfterConfirmation={this.handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(Contacts);
