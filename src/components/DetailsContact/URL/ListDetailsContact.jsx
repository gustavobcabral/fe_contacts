import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/common/ContainerCRUD/ContainerCRUD";
import moment from "moment";
import { details } from "../../../services";
import { getOr, map, first, isEmpty } from "lodash/fp";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AskDelete from "../../common/AskDelete/AskDelete";
import NoRecords from "../../common/NoRecords/NoRecords";
import { faPlusSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseErrorMessage } from "../../../utils/generic";

class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      phone: getOr(0, "match.params.phone", props),
    };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAllOneContact() {
    this.setState({ submitting: true });
    try {
      const phone = getOr(0, "props.match.params.phone", this);
      const data = getOr(
        [],
        "data.data",
        await details.getAllOneContact(phone, null)
      );
      const { name } = first(data) || { name: "" };
      this.setState({ data, name, submitting: false });
    } catch (error) {
      const { t } = this.props;
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(`common:${parseErrorMessage(error)}`),
      });
  }
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

  getNameForTitle() {
    const { name } = this.state;
    return !isEmpty(name) ? `- ${name}` : "";
  }

  render() {
    const { t, history } = this.props;
    const { data, phone } = this.state;

    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>{`${t(
          "detailsContacts:title"
        )} #${phone} ${this.getNameForTitle()}`}</h1>
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
                  to={`/contacts/${encodeURI(phone)}/details/new`}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </Button>{" "}
                <Button variant="secondary" onClick={() => history.goBack()}>
                  {t("common:back")}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(data) ? (
              map(
                (detail) => (
                  <tr key={detail.id}>
                    <td>{detail.publisherName}</td>
                    <td>
                      {moment(detail.createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td>{detail.information}</td>
                    <td>
                      <Button
                        variant="success"
                        as={Link}
                        to={`/contacts/${encodeURI(phone)}/details/edit/${
                          detail.id
                        }`}
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
              )
            ) : (
              <NoRecords cols="6" />
            )}
          </tbody>
        </Table>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(ListDetailsContact);
