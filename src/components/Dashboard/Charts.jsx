import React from "react";
import { get, map, isEmpty } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";
import { contacts } from "../../services";
import { withTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { Col, Row, Card } from "react-bootstrap";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byContacted: [],
      byFeedback: [],
      byPublishers: [],
      submitting: false,
    };
    this.handleGetSummary = this.handleGetSummary.bind(this);
  }

  getByContacted(data) {
    const { t } = this.props;

    return data.totalPercentContacted > 0 ||
      data.totalPercentWithoutContacted > 0
      ? [
          {
            title: t("contacted"),
            value: data.totalPercentContacted,
            label: `${data.totalPercentContacted}% ${t("contacted")}`,
            color: "#ffc107",
          },
          {
            title: t("withoutContact"),
            label: `${data.totalPercentWithoutContacted}% ${t(
              "withoutContact"
            )}`,
            value: data.totalPercentWithoutContacted,
            color: "#1ad641",
          },
        ]
      : [];
  }

  randomColor = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  generateLabel = (dataPublisher, data) =>
    data.totalsContactsWaitingFeedbackByPublisher.length <= 4
      ? `${dataPublisher.percent}% ${dataPublisher.publisherName.slice(0, 10)}`
      : "";

  getByPublishers = (data) =>
    map(
      (dataPublisher) => ({
        title: `${dataPublisher.percent}% ${dataPublisher.publisherName}`,
        value: dataPublisher.percent,
        label: this.generateLabel(dataPublisher, data),
        color: this.randomColor(),
      }),
      data.totalsContactsWaitingFeedbackByPublisher
    );

  getByFeedback = (data) => {
    const { t } = this.props;
    return data.totalPercentContactsAssignByMeWaitingFeedback > 0 ||
      data.totalPercentContactsAssignByOthersWaitingFeedback > 0
      ? [
          {
            title: t("totalContactsAssignByMeWaitingFeedback"),
            value: data.totalPercentContactsAssignByMeWaitingFeedback,
            label: `${data.totalPercentContactsAssignByMeWaitingFeedback}% ${t(
              "totalContactsAssignByMeWaitingFeedback"
            )}`,
            color: "#007bff",
          },
          {
            title: t("totalContactsWaitingFeedback"),
            label: `${
              data.totalPercentContactsAssignByOthersWaitingFeedback
            }% ${t("totalContactsWaitingFeedback")}`,
            value: data.totalPercentContactsAssignByOthersWaitingFeedback,
            color: "#6610f2",
          },
        ]
      : [];
  };

  async handleGetSummary() {
    this.setState({ submitting: true });
    const response = await contacts.getSummary();
    const data = get("data", response);

    this.setState({
      byContacted: this.getByContacted(data),
      byFeedback: this.getByFeedback(data),
      byPublishers: this.getByPublishers(data),
      submitting: false,
    });
  }

  buildSubTitleMessage = () =>
    `${this.props.t("welcome")}, ${get("name", getUserData())}`;

  componentDidMount() {
    this.handleGetSummary();
  }

  render() {
    const { byContacted, byFeedback, byPublishers } = this.state;
    const { t } = this.props;
    return (
      <Row className="mt-4">
        <Col xs={12} lg={{ span: 3, offset: 1 }}>
          <Card>
            <Card.Header className="text-center" style={{ minHeight: "73px" }}>
              {t("titleChartContacts")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(byContacted) ? (
                <PieChart
                  animate={true}
                  data={byContacted}
                  totalValue={100}
                  label={({ dataEntry }) => dataEntry.label}
                  labelStyle={{
                    fontSize: "5px",
                  }}
                />
              ) : (
                <Card.Text className="text-center">
                  {t("common:noData")}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={{ span: 3, offset: 0 }}>
          <Card>
            <Card.Header className="text-center" style={{ minHeight: "73px" }}>
              {t("titleChartWaitingFeedback")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(byFeedback) ? (
                <PieChart
                  animate={true}
                  data={byFeedback}
                  totalValue={100}
                  label={({ dataEntry }) => dataEntry.label}
                  labelStyle={{
                    fontSize: "5px",
                  }}
                />
              ) : (
                <Card.Text className="text-center">
                  {t("common:noData")}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={{ span: 3, offset: 0 }}>
          <Card>
            <Card.Header className="text-center" style={{ minHeight: "73px" }}>
              {t("titleChartWaitingFeedback")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(byPublishers) ? (
                <PieChart
                  animate={true}
                  data={byPublishers}
                  totalValue={100}
                  label={({ dataEntry }) => dataEntry.label}
                  labelStyle={{
                    fontSize: "5px",
                  }}
                />
              ) : (
                <Card.Text className="text-center">
                  {t("common:noData")}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withTranslation(["dashboard", "common"])(Charts);
