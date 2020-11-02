import React from "react";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import ContainerCRUD from "../../components/common/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import {
  map,
  getOr,
  isEmpty,
  pipe,
  uniq,
  compact,
  remove,
  contains,
} from "lodash/fp";
import AskDelete from "../common/AskDelete/AskDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import ListDetailsContact from "../DetailsContact/Modal/ListDetailsContact";
import { Link } from "react-router-dom";
import NoRecords from "../common/NoRecords/NoRecords";
import Pagination from "../common/Pagination/Pagination";
import Search from "../common/Search/Search";
import { parseQuery } from "../../utils/forms";
import { RECORDS_PER_PAGE } from "../../constants/application";
import FilterData from "../common/FilterData/FilterData";
import NewContact from "./NewContact";
import EditContact from "./EditContact";
import SendPhones from "./SendPhones/SendPhones";
import { parseErrorMessage, formatDate } from "../../utils/generic";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      data: [],
      error: false,
      checksContactsPhones: [],
      submitting: false,
      pagination: {},
      queryParams: {
        sort: "contacts.name:ASC",
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: "",
          phone: "",
          genders: [],
          languages: [],
          status: [],
        }),
      },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.afterSentPhones = this.afterSentPhones.bind(this);
  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true });
    const { t } = this.props;
    try {
      const queryParams = parseQuery(objQuery, this.state);
      const response = await contacts.getAll(queryParams);
      this.setState({
        data: getOr([], "data.data.list", response),
        pagination: getOr({}, "data.data.pagination", response),
        submitting: false,
        error: false,
        queryParams,
      });
    } catch (error) {
      this.setState({
        error,
      });
      Swal.fire({
        icon: "error",
        title: t(`common:${parseErrorMessage(error)}`),
      });
    }
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

  handleOnClick(event) {
    const {
      target: { value, checked },
    } = event;
    const newValues = checked
      ? pipe(uniq, compact)([...this.state.checksContactsPhones, value])
      : remove(
          (valueSaved) => valueSaved === value,
          this.state.checksContactsPhones
        );

    this.setState({
      checksContactsPhones: newValues,
    });
  }

  handleCheckAll(event) {
    const {
      target: { checked },
    } = event;

    const newValues = checked
      ? map((contact) => contact.phone, this.state.data)
      : [];
    this.setState({ checksContactsPhones: newValues });
  }

  afterSentPhones(){
    this.handleGetAll();
    this.setState({ checksContactsPhones: [] });

  }

  componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const {
      data,
      pagination,
      submitting,
      checksContactsPhones,
      error,
    } = this.state;
    const colSpan = "8";
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Row>
          <Col xs={12} lg={2}>
            <FilterData
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              getFilters={contacts.getAllFilters}
            />
          </Col>
          <Col xs={12} lg={10}>
            <Table striped bordered hover responsive>
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={["name", "phone"]}
                  colspan={colSpan}
                />
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      name=""
                      label=""
                      value="all"
                      onClick={this.handleCheckAll}
                    />
                  </th>
                  <th>{t("name")}</th>
                  <th>{t("phone")}</th>
                  <th>{t("gender")}</th>
                  <th>{t("language")}</th>
                  <th>{t("status")}</th>
                  <th>{t("lastConversasion")}</th>
                  <th>{t("waitingFeedback")}</th>
                  <th>{t("details")}</th>
                  <th>
                    <NewContact afterClose={() => this.handleGetAll()} />{" "}
                    <SendPhones
                      checksContactsPhones={checksContactsPhones}
                      contactsData={data}
                      afterClose={() => this.afterSentPhones()}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(data) ? (
                  map(
                    (contact) => (
                      <tr key={contact.phone}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={contains(
                              contact.phone,
                              checksContactsPhones
                            )}
                            name="checksContactsPhones"
                            value={contact.phone}
                            className="checkBoxPhones"
                            onChange={this.handleOnClick}
                          />
                        </td>
                        <td style={{width:"25%"}}>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{t(`contacts:${contact.gender}`)}</td>
                        <td>{t(`languages:${contact.languageName}`)}</td>
                        <td>{t(`status:${contact.statusDescription}`)}</td>
                        <td>{formatDate(contact.details.createdAt)}</td>
                        <td
                          className={`text-${
                            contact.waitingFeedback ? "danger" : "success"
                          }`}
                        >
                          {t(
                            `common:${contact.waitingFeedback ? "yes" : "no"}`
                          )}
                        </td>

                        <td>
                          <ListDetailsContact
                            contact={contact}
                            id={contact.phone}
                            afterClose={() => this.handleGetAll()}
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
                          <EditContact
                            id={contact.phone}
                            afterClose={() => this.handleGetAll()}
                          />{" "}
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
                  <NoRecords cols={colSpan} />
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={colSpan} style={{ border: 0 }}>
                    <Pagination
                      pagination={pagination}
                      onClick={this.handleGetAll}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
      </ContainerCRUD>
    );
  }
}

export default withTranslation([
  "contacts",
  "common",
  "detailsContacts",
  "languages",
  "status",
])(Contacts);
