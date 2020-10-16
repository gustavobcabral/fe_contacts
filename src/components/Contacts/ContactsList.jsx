import React from "react";
import { Button, Table, Form } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import { map, getOr, isEmpty } from "lodash/fp";
import AskDelete from "../Common/AskDelete/AskDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import ListDetailsContact from "../DetailsContact/Modal/ListDetailsContact";
import { Link } from "react-router-dom";
import NoRecords from "../Common/NoRecords/NoRecords";
import NewContacts from "./NewContacts";
import Pagination from "../Common/Pagination/Pagination";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pagination: {},
      queryParams: { sort: "name:ASC", perPage: 1, currentPage: 1 },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.parseQuery = this.parseQuery.bind(this);
  }

  parseQuery(toPage) {
    const queryParams = getOr({}, "queryParams", this.state);
    return toPage ? { ...queryParams, currentPage: toPage } : queryParams;
  }

  async handleGetAll(toPage) {
    this.setState({ submitting: true });
    const response = await contacts.getAll(this.parseQuery(toPage));
    this.setState({
      data: getOr([], "data.data.list", response),
      pagination: getOr({}, "data.data.pagination", response),
      submitting: false,
    });
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
          title: t(
            `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
          ),
          text: t(
            `common:${getOr(
              "errorWithoutDetails",
              "response.data.error.code",
              error
            )}`
          ),
        });
      });
  }

  componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const { data, pagination } = this.state;
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th colSpan="6" style={{ border: 0 }}>
                <Form.Control
                  name="search"
                  type="search"
                  placeholder="search here to filter results"
                  onChange={(e) => console.log(e)}
                  onBlur={(e) => console.log(e)}
                />
              </th>
            </tr>
            <tr>
              <th>{t("name")}</th>
              <th>{t("phone")}</th>
              <th>{t("language")}</th>
              <th>{t("status")}</th>
              <th>{t("details")}</th>
              <th>
                {/* <Button variant="primary">
                  <FontAwesomeIcon icon={faUserPlus} />
                </Button> */}
                <NewContacts />
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(data) ? (
              map(
                (contact) => (
                  <tr key={contact.phone}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.languageName}</td>
                    <td>{contact.statusDescription}</td>
                    <td>
                      <ListDetailsContact
                        contact={contact}
                        id={contact.phone}
                        afterClose={this.handleGetAll}
                      />{" "}
                      <Button
                        variant="success"
                        as={Link}
                        to={`/contacts/${encodeURI(contact.phone)}/details`}
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
              )
            ) : (
              <NoRecords cols="6" />
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" style={{ border: 0 }}>
                <Pagination
                  pagination={pagination}
                  onClick={this.handleGetAll}
                />
              </td>
            </tr>
          </tfoot>
        </Table>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common", "detailsContacts"])(
  Contacts
);
