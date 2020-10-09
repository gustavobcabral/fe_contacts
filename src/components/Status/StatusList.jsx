import React from "react";
import { Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { status } from "../../services";
import Swal from "sweetalert2";
import { getOr, map, isEmpty } from "lodash/fp";
import AskDelete from "../Common/AskDelete/AskDelete";
import StatusEdit from "./StatusEdit";
import StatusNew from "./StatusNew";
import NoRecords from "../Common/NoRecords/NoRecords";

class StatusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], submitting: false };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAll() {
    const response = await status.getAll("");
    this.setState({ data: response.data.data });
   }

  async handleDelete(id) {
    const { t } = this.props;
    this.setState({ submitting: true });
    await status
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
              <th>{t("descriptionLabel")}</th>
              <th>
                <StatusNew afterClose={this.handleGetAll} />
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(data) ? (
              map(
                (status) => (
                  <tr key={status.id}>
                    <td>{t(status.description)}</td>
                    <td>
                      <StatusEdit
                        data={status}
                        afterClose={this.handleGetAll}
                      />{" "}
                      <AskDelete
                        id={status.id}
                        funcToCallAfterConfirmation={this.handleDelete}
                      />
                    </td>
                  </tr>
                ),
                data
              )
            ) : (
              <NoRecords cols={2} />
            )}
          </tbody>
        </Table>
      </ContainerCRUD>
    );
  }
}
export default withTranslation(["status", "common"])(StatusList);
