import React from "react";
import { Table } from "react-bootstrap";
import ContainerCRUD from "../../components/common/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { publishers } from "../../services";
import Swal from "sweetalert2";
import { getOr, map } from "lodash/fp";
import AskDelete from "../common/AskDelete/AskDelete";
import EditPublisher from "./EditPublisher";
import NewPublisher from "./NewPublisher";
import { parseErrorMessage } from "../../utils/generic";

class Publishers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submitting: false,
      queryParams: {
        sort: "publishers.name:ASC",
      },
    };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAll() {
    const { t } = this.props;

    try {
      const { queryParams } = this.state;
      const response = await publishers.getAllWithPagination(queryParams);
      this.setState({ data: response.data.data });
    } catch (error) {
      this.setState({ submitting: false });
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

  async handleDelete(id) {
    const { t } = this.props;
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
    const { data } = this.state;
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Table striped bordered hover responsive>
          <thead>
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
                  <td>
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
        </Table>
      </ContainerCRUD>
    );
  }
}
export default withTranslation(["publishers", "common", "responsibility"])(
  Publishers
);
