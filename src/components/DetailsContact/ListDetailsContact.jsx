import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { details } from "../../services";
import { getOr, map } from "lodash/fp";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    //  this.handleDelete = this.handleDelete.bind(this);
  }
  async handleGetAllOneContact() {
    const phone = getOr(0, "props.match.params.phone", this);
    this.setState({ submitting: true });
    const response = await details.getAllOneContact(phone);
    this.setState({ data: response.data.data, submitting: false });
  }

  // handleEdit(id) {
  //   console.log("i will get contact id " + id);
  // }

  // async handleDelete(t, id) {
  //   this.setState({ submitting: true });
  //   await contacts
  //     .dellOne(id)
  //     .then(() => {
  //       this.handleGetAll();
  //     })
  //     .catch((error) => {
  //       this.setState({ submitting: false });
  //       Swal.fire({
  //         icon: "error",
  //         title: t(getOr("errorTextUndefined", "response.data.cod", error)),
  //       });
  //     });
  // }

  componentDidMount() {
    this.handleGetAllOneContact();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    console.log(data);
    const phone = getOr(0, "props.match.params.phone", this);

    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>LIST TODOS OS DETALHES phone: {phone}</h1>

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
            {map(
              (detail) => (
                <tr>
                  <td>{detail.information}</td>
                  <td>
                    <Button
                      variant="success"
                      as={Link}
                      to={`/contacts/${phone}/details/edit/1`}
                    >
                      Editar
                    </Button>
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

export default withTranslation(["contacts", "common"])(ListDetailsContact);
