import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { publishers } from "../../services";

class Publishers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    const response = await publishers.getAll("");
    this.setState({ data: response.data.data });
  }

  handleEdit(id) {
    console.log("i will get contact id " + id);
  }

  async handleDelete(id) {
    await publishers.dellOne(id);

    // console.log("i will get contact id " + id);
  }

  async componentDidMount() {
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
              <th>Nome</th>
              <th>Telefone</th>
              <th>
                <Button variant="primary">{t("common:add")}</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((publishers) => (
              <tr>
                <td>{publishers.name}</td>
                <td>{publishers.email}</td>
                {/* {console.log(publishers)} */}
                <td>
                  <Button
                    variant="success"
                    onClick={this.handleEdit.bind(this, "aqui vai o id")}
                  >
                    {t("common:edit")}
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={this.handleDelete.bind(publishers.id)}
                    // this.handleDelete.bind
                  >
                    {t("common:delete")}
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Luciano</td>
              <td>Pioneiro</td>
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
            <tr>
              <td>Rafael</td>
              <td>Pioneiro</td>
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
export default withTranslation(["publishers", "common"])(Publishers);
