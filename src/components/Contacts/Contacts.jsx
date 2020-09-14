import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  handleGetAll() {
    console.log("i am ready to get all");
  }

  handleEdit(id) {
    console.log("i will get contact id " + id);
  }

  handleDelete(id) {
    console.log("i will get contact id " + id);
  }

  componentDidMount() {
    console.log("i am ready");
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;

    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Idioma</th>
              <th>Data</th>
              <th>Status</th>
              <th>Detalhes</th>
              <th>
                <Button variant="primary">Adicionar</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Zé</td>
              <td>30232713</td>
              <td>espanhol</td>
              <td>09/09/2020</td>
              <td>Revisita</td>
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
                <Button
                  variant="danger"
                  onClick={this.handleDelete.bind(this, "aqui vai o id")}
                >
                  {t("common:delete")}
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(Contacts);
