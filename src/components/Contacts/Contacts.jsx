import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import { getOr } from "lodash/fp";

import AskDelete from "../AskDelete/AskDelete";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    const response = await contacts.getAll("");
    this.setState({ data: response.data.data.list });
    // console.log(response);
  }

  handleEdit(id) {
    // console.log("i will get contact id " + id);
  }

  // askForSureWantDelete(t, id) {
  //   Swal.fire({
  //     title: t("common:askDeleteMessage"),
  //     icon: "question",
  //     showDenyButton: true,
  //     confirmButtonText: t("common:yes"),
  //     denyButtonText: t("common:no"),
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.handleDelete(t, id);
  //       // this.props.funcToCallAfterConfirmation
  //     }
  //   });
  // }

  async handleDelete(t, id) {
    this.setState({ submitting: true });
    await contacts
      .dellOne(id)
      .then(() => {
        //sirve p atualizar a pagina
        this.handleGetAll();
        this.setState({ submitting: false });
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
              <th>{t("date")}</th>
              <th>{t("status")}</th>
              <th>{t("details")}</th>
              <th>
                <Button variant="primary">{t("common:add")}</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((contacts) => (
              <tr key={contacts.id}>
                <td>{contacts.name}</td>
                <td>{contacts.phone}</td>
                <td>{contacts.id_language}</td>
                <td>Dos Detalhes ?</td>
                <td>{contacts.id_status}</td>
                <td>
                  <Button variant="outline-info">Mostrar</Button>
                </td>

                <td>
                  <Button
                    variant="success"
                    onClick={this.handleEdit.bind(this, "aqui vai o id")}
                  >
                    {t("common:edit")}
                  </Button>{" "}
                  {/* <Button
                    variant="danger"
                    onClick={this.askForSureWantDelete.bind(this,t,contacts.phone)}>
                    {t("common:delete")}
                  </Button> */}
                  <AskDelete
                    id={contacts.id}
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
