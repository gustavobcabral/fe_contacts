import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { publishers } from "../../services";
import Swal from "sweetalert2";
import { getOr } from "lodash/fp";

class Publishers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], submitting: false };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    const response = await publishers.getAll("");
    this.setState({ data: response.data.data });
  }

  handleEdit(id) {
    console.log("i will get contact id " + id);
  }

  askForSureWantDelete(t, id){
    Swal.fire({
      title: t('common:askDeleteMessage'),
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: t('common:yes'),
      denyButtonText: t('common:no'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleDelete(t, id)
      } 
    })
  }

  async handleDelete(t, id) {
    this.setState({ submitting: true });
    await publishers
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
              <tr key={publishers.id}>
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
                    onClick={this.askForSureWantDelete.bind(this, t, publishers.id)}
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
