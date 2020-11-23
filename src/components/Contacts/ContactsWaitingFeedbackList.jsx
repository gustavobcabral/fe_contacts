import React from "react";
import { Table, Row, Col, Form } from "react-bootstrap";
import ContainerCRUD from "../../components/common/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { details } from "../../services";
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
import NoRecords from "../common/NoRecords/NoRecords";
import Pagination from "../common/Pagination/Pagination";
import Search from "../common/Search/Search";
import { parseQuery } from "../../utils/forms";
import { RECORDS_PER_PAGE } from "../../constants/application";
import FilterData from "../common/FilterData/FilterData";
import EditDetailsContact from "../DetailsContact/Modal/EditDetailsContact";
import SendPhones from "./SendPhones/SendPhones";
import { parseErrorMessage } from "../../utils/generic";
import ReactPlaceholder from "react-placeholder";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: false,
      checksContactsPhones: [],
      submitting: false,
      pagination: {},
      queryParams: {
        sort: `"detailsContacts"."createdAt":ASC`,
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: "",
          phone: "",
          responsible: "",
          creator: "",
          note: "",
          typeCompany: "-1",
          genders: [],
          languages: [],
          status: [],
        }),
      },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true });
    const { t } = this.props;
    try {
      const queryParams = parseQuery(objQuery, this.state);
      const response = await details.getAllWaitingFeedback(queryParams);
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
    await details
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
          text: t(`common:${parseErrorMessage(error)}`),
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

  componentDidMount() {
    this.handleGetAll();
  }

  afterSentPhones() {
    document.getElementById("checkall").checked = false;
    this.handleGetAll();
    this.setState({ checksContactsPhones: [] });
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
    const colSpan = "9";
    return (
      <ContainerCRUD title={t("titleWaitingFeedback")} {...this.props}>
        <Row>
          <Col xs={12} lg={2}>
            <FilterData
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              showTypeCompany={true}
              getFilters={details.getAllWaitingFeedbackFilters}
            />
          </Col>
          <Col xs={12} lg={10}>
            <Table striped bordered hover responsive>
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={["name", "phone", "responsible", "creator", "note"]}
                  colspan={colSpan}
                />
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      id="checkall"
                      name=""
                      label=""
                      value="all"
                      onClick={this.handleCheckAll}
                    />
                  </th>
                  <th>{t("phone")}</th>
                  <th className="d-none d-sm-table-cell">{t("name")}</th>
                  <th className="d-none d-lg-table-cell">{t("gender")}</th>
                  <th className="d-none d-lg-table-cell">{t("language")}</th>
                  <th className="d-none d-lg-table-cell">{t("status")}</th>
                  <th className="d-none d-lg-table-cell">
                    {t("publisherResponsible")}
                  </th>
                  <th className="d-none d-lg-table-cell">
                    {t("publisherCreatedBy")}
                  </th>
                  <th style={{ minWidth: "116px" }}>
                    <SendPhones
                      checksContactsPhones={checksContactsPhones}
                      contactsData={data}
                      afterClose={() => this.afterSentPhones()}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {submitting ? (
                  <tr>
                    <td colSpan={colSpan}>
                      <ReactPlaceholder
                        showLoadingAnimation={true}
                        type="text"
                        ready={!submitting}
                        rows={RECORDS_PER_PAGE}
                      />
                    </td>
                  </tr>
                ) : !isEmpty(data) ? (
                  map(
                    (detailContact) => (
                      <tr key={detailContact.phone}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={contains(
                              detailContact.phone,
                              checksContactsPhones
                            )}
                            name="checksContactsPhones"
                            value={detailContact.phone}
                            className="checkBoxPhones"
                            onChange={this.handleOnClick}
                          />
                        </td>
                        <td>{detailContact.phone}</td>
                        <td className="d-none d-sm-table-cell">
                          {detailContact.contactName}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`contacts:${detailContact.gender}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`languages:${detailContact.languageName}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`status:${detailContact.statusDescription}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {detailContact.publisherName}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {detailContact.publisherNameCreatedBy}
                        </td>

                        <td>
                          {/* <EditDetailsContact
                            data={detailContact}
                            contact={detailContact}
                            id={detailContact.id}
                            afterClose={this.handleGetAll}
                          />{" "}
                          <AskDelete
                            id={detailContact.id}
                            funcToCallAfterConfirmation={this.handleDelete}
                          /> */}
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
                      submitting={submitting}
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
