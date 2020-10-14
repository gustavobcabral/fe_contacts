import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/ContainerCRUD/ContainerCRUD";
import moment from "moment";
import { details } from "../../../services";
import { getOr, map } from "lodash/fp";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AskDelete from "../../Common/AskDelete/AskDelete";
import { faPlusSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAllOneContact() {
    const phone = getOr(0, "props.match.params.phone", this);
    this.setState({ submitting: true });
    const response = await details.getAllOneContact(phone);
    this.setState({ data: response.data.data, submitting: false });
  }
  async handleDelete(id) {
    const t = this.props;
    this.setState({ submitting: true });
    await details
      .dellOne(id)
      .then(() => {
        this.handleGetAllOneContact();
        this.setState({ submitting: false });
      })
      .catch((error) => {
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
  componentDidMount() {
    this.handleGetAllOneContact();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    const phone = getOr(0, "props.match.params.phone", this);

    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>{`LIST TODOS OS DETALHES phone: ${phone} -  ${data.name}`}</h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{t("publisher")}</th>
              <th>{t("date")}</th>
              <th>{t("details")}</th>
              <th>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/contacts/${phone}/details/new`}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {map(
              (detail) => (
                <tr key={detail.id}>
                  <td>{detail.publisherName}</td>
                  <td>{moment(detail.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{detail.information}</td>
                  <td>
                    <Button
                      variant="success"
                      as={Link}
                      to={`/contacts/${phone}/details/edit/${detail.id}`}
                    >
                     <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
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
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(ListDetailsContact);
