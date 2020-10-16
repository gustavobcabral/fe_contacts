import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts, translations } from "../../services";
import Swal from "sweetalert2";
import { map, getOr, isEmpty, upperFirst } from "lodash/fp";
import AskDelete from "../Common/AskDelete/AskDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import ListDetailsContact from "../DetailsContact/Modal/ListDetailsContact";
import { Link } from "react-router-dom";
import NoRecords from "../Common/NoRecords/NoRecords";
import NewContacts from "./NewContacts";
import Pagination from "../Common/Pagination/Pagination";
import Search from "../Common/Search/Search";
import { parseQuery, objectFlip } from "../../utils/forms";
import { RECORDS_PER_PAGE } from "../../constants/application";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pagination: {},
      queryParams: {
        sort: "name:ASC",
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filter: "",
      },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.translateSearch = this.translateSearch.bind(this);
  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true });
    const queryParams = parseQuery(objQuery, this.state);
    console.log(queryParams);
    const response = await contacts.getAll(queryParams);
    this.setState({
      data: getOr([], "data.data.list", response),
      pagination: getOr({}, "data.data.pagination", response),
      submitting: false,
    });
  }

  async translateSearch(search) {
    const { t, i18n } = this.props;
    const { filter } = search;
    const translationsContacts = await translations.get(
      i18n.language,
      "contacts"
    );
    const swap = objectFlip(translationsContacts.data);
    const newFilter = { filter: swap[upperFirst(filter)] || "" };
    console.log(newFilter);
    this.handleGetAll(newFilter);
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
            <Search onFilter={this.translateSearch} />
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
