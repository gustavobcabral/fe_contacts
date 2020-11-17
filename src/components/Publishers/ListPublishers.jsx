import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import ContainerCRUD from "../../components/common/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { publishers } from "../../services";
import Swal from "sweetalert2";
import { getOr, map } from "lodash/fp";
import AskDelete from "../common/AskDelete/AskDelete";
import EditPublisher from "./EditPublisher";
import NewPublisher from "./NewPublisher";
import { parseErrorMessage } from "../../utils/generic";
import { getUserData } from "../../utils/loginDataManager";
import Pagination from "../common/Pagination/Pagination";
import Search from "../common/Search/Search";
import { parseQuery } from "../../utils/forms";
import { RECORDS_PER_PAGE } from "../../constants/application";
import FilterData from "../common/FilterData/FilterData";

class Publishers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submitting: false,
      pagination: {},
      queryParams: {
        sort: "publishers.name:ASC",
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: "",
          phone: "",
          email: "",
          responsibility: [],
        }),
      },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showErrorNotAllowedDeleteCurrentUser = this.showErrorNotAllowedDeleteCurrentUser.bind(
      this
    );
  }

  async handleGetAll(objQuery) {
    const { t } = this.props;

    try {
      const queryParams = parseQuery(objQuery, this.state);
      const response = await publishers.getAllWithPagination(queryParams);
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
        submitting: false,
      });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(
          `publishers:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      });
    }
  }

  showErrorNotAllowedDeleteCurrentUser() {
    const { t } = this.props;

    Swal.fire({
      icon: "error",
      title: t("notAllowedDeleteCurrentUser"),
    });
  }

  async handleDelete(id) {
    const { t } = this.props;
    if (id === getOr(0, "id", getUserData())) {
      this.showErrorNotAllowedDeleteCurrentUser();
      return;
    }
    this.setState({ submitting: true });
    await publishers
      .dellOne(id)
      .then(() => {
        this.handleGetAll();
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

  async componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const { data, pagination, submitting, error } = this.state;
    const colSpan = "11";
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Row>
          <Col xs={12} lg={2}>
            <FilterData
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              getFilters={publishers.getAllFilters}
            />
          </Col>
          <Col xs={12} lg={10}>
            <Table striped bordered hover responsive>
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={["name", "phone", "email"]}
                  colspan={colSpan}
                />
                <tr>
                  <th>{t("name")}</th>
                  <th>{t("email")}</th>
                  <th>{t("phone")}</th>
                  <th>{t("privilege")}</th>
                  <th>
                    <NewPublisher afterClose={() => this.handleGetAll()} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {map(
                  (publishers) => (
                    <tr key={publishers.id}>
                      <td>{publishers.name}</td>
                      <td>{publishers.email}</td>
                      <td>{publishers.phone}</td>
                      <td>
                        {t(
                          `responsibility:${publishers.responsibilityDescription}`
                        )}
                      </td>
                      <td style={{ width: "100px" }}>
                        <EditPublisher
                          id={publishers.id}
                          afterClose={() => this.handleGetAll()}
                        />{" "}
                        <AskDelete
                          id={publishers.id}
                          funcToCallAfterConfirmation={this.handleDelete}
                        />
                      </td>
                    </tr>
                  ),
                  data
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
export default withTranslation(["publishers", "common", "responsibility"])(
  Publishers
);
