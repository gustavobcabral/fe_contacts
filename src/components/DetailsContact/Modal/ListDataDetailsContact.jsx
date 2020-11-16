import React from "react";
import { withTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import { map, isEmpty, truncate } from "lodash/fp";
import moment from "moment";
import NewDetailsContact from "./NewDetailsContact";
import EditDetailsContact from "./EditDetailsContact";
import AskDelete from "../../common/AskDelete/AskDelete";
import NoRecords from "../../common/NoRecords/NoRecords";

class ListDataDetailsContact extends React.Component {
  render() {
    const {
      t,
      contact,
      data,
      afterClose,
      funcToCallAfterConfirmation,
      waitingFeedback
    } = this.props;
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>{t("publisher")}</th>
            <th>{t("date")}</th>
            <th>{t("information")}</th>
            <th>
              <NewDetailsContact
                afterClose={afterClose}
                contact={contact}
                phone={contact.phone}
                waitingFeedback={waitingFeedback}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(data) ? (
            map(
              (detail) => (
                <tr key={detail.id}>
                  <td>{detail.publisherName}</td>
                  <td>{moment(detail.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{truncate({ length: 45 }, detail.information)}</td>
                  <td style={{ width: "114px" }}>
                    <EditDetailsContact
                      data={detail}
                      contact={contact}
                      id={detail.id}
                      afterClose={afterClose}
                    />{" "}
                    <AskDelete
                      id={detail.id}
                      funcToCallAfterConfirmation={funcToCallAfterConfirmation}
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
    );
  }
}

export default withTranslation(["detailsContacts", "common"])(
  ListDataDetailsContact
);
