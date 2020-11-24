import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/common/ContainerCRUD/ContainerCRUD";
import moment from "moment";
import { details } from "../../../services";
import { getOr, map, first, isEmpty, truncate } from "lodash/fp";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AskDelete from "../../common/AskDelete/AskDelete";
import NoRecords from "../../common/NoRecords/NoRecords";
import Pagination from "../../common/Pagination/Pagination";
import Search from "../../common/Search/Search";
import { parseQuery } from "../../../utils/forms";
import { RECORDS_PER_PAGE } from "../../../constants/application";
import { faPlusSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseErrorMessage } from "../../../utils/generic";
import ReactPlaceholder from "react-placeholder";

class ListDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      loading: false,
      phone: getOr(0, "match.params.phone", props),
      pagination: {},
      queryParams: {
        sort: '"detailsContacts"."createdAt":DESC',
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          publisher: "",
          details: "",
        }),
      },
    };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAllOneContact(objQuery) {
    this.setState({ loading: true });
    try {
      const phone = getOr(0, "props.match.params.phone", this);
      const queryParams = parseQuery(objQuery, this.state);
      const response = await details.getAllOneContact(phone, queryParams);
      const data = getOr([], "data.data.list", response);
      const { name } = first(data) || { name: "" };

      this.setState({
        data,
        pagination: getOr({}, "data.data.pagination", response),
        error: false,
        queryParams,
        name,
        loading: false,
      });
    } catch (error) {
      const { t } = this.props;

      this.setState({
        error,
        loading: false,
      });

      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(
          `detailsContacts:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      });
    }
  }

  async handleDelete(id) {
    const t = this.props;
    this.setState({ loading: true });

    await details
      .dellOne(id)
      .then(() => {
        this.handleGetAllOneContact();
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
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
    const { data, phone, loading, pagination } = this.state;
    const colSpan = 4;

    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Container className="border p-4">
          <Row>
            <Col>
              <h2>{`${t("title")} #${phone} ${this.getNameForTitle()}`}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover responsive>
                <thead>
                  <Search
                    onFilter={this.handleGetAllOneContact}
                    fields={["publisher", "details"]}
                    colspan={colSpan}
                  />
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
                      <Button
                        variant="secondary"
                        onClick={() => history.goBack()}
                      >
                        {t("common:back")}
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={colSpan}>
                        <ReactPlaceholder
                          showLoadingAnimation={true}
                          type="text"
                          ready={!loading}
                          rows={5}
                        />
                      </td>
                    </tr>
                  ) : !isEmpty(data) ? (
                    map(
                      (detail) => (
                        <tr key={detail.id}>
                          <td>{detail.publisherName}</td>
                          <td>
                            {moment(detail.createdAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </td>
                          <td>
                            {t(
                              detail.information,
                              truncate({ length: 45 }, detail.information)
                            )}
                          </td>
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
                    <NoRecords cols={colSpan} />
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={colSpan} style={{ border: 0 }}>
                      <Pagination
                        pagination={pagination}
                        onClick={this.handleGetAllOneContact}
                        loading={loading}
                      />
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Col>
          </Row>
        </Container>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["detailsContacts", "common"])(
  ListDetailsContact
);
