import React from "react";
import { Table, Container } from "react-bootstrap";
import ContainerCRUD from "../../components/common/ContainerCRUD/ContainerCRUD";
import { withTranslation } from "react-i18next";
import { status } from "../../services";
import { map, isEmpty } from "lodash/fp";
import AskDelete from "../common/AskDelete/AskDelete";
import StatusEdit from "./StatusEdit";
import StatusNew from "./StatusNew";
import NoRecords from "../common/NoRecords/NoRecords";
import { showError } from "../../utils/generic";

class StatusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], submitting: false };
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleGetAll() {
    try {
      const response = await status.getAll("");
      this.setState({ data: response.data.data });
    } catch (error) {
      const { t } = this.props;
      showError(error, t, "status");
    }
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
        showError(error, t, "status");
      });
  }

  async componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    return (
      <ContainerCRUD title={t("titleList")} {...this.props}>
        <Container>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>{t("descriptionLabel")}</th>
                <th>{t("descriptionTraducedLabel")}</th>
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
                      <td>{status.description}</td>
                      <td>{t(status.description)}</td>
                      <td style={{ minWidth: "114px" }}>
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
                <NoRecords cols={3} />
              )}
            </tbody>
          </Table>
        </Container>
      </ContainerCRUD>
    );
  }
}
export default withTranslation(["status", "common"])(StatusList);
