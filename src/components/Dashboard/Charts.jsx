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
      contacted: [],
      feedback: [],
      byPublishers: [],
      submitting: false,
    };
    this.handleGetSummary = this.handleGetSummary.bind(this);
  }

  async handleGetSummary() {
    this.setState({ submitting: true });
    const response = await contacts.getSummary();
    const data = get("data", response);
    const { t } = this.props;
    const dataContactedSummaryParsed = [
      {
        title: t("contacted"),
        value: data.totalPercentContacted,
        label: `${data.totalPercentContacted}% ${t("contacted")}`,
        color: "#ffc107",
      },
      {
        title: t("withoutContact"),
        label: `${data.totalPercentWithoutContacted}% ${t("withoutContact")}`,
        value: data.totalPercentWithoutContacted,
        color: "#1ad641",
      },
    ];

    const randomColor = () => {
      let n = (Math.random() * 0xfffff * 1000000).toString(16);
      return "#" + n.slice(0, 6);
    };

    const generateLabel = (dataPublisher) =>
      data.totalsContactsWaitingFeedbackByPublisher.length <= 4
        ? `${dataPublisher.percent}% ${dataPublisher.publisherName.slice(
            0,
            10
          )}`
        : "";

    const dataWaitingFeedbackByPublishersSummaryParsed = map(
      (dataPublisher) => ({
        title: `${dataPublisher.percent}% ${dataPublisher.publisherName}`,
        value: dataPublisher.percent,
        label: generateLabel(dataPublisher),
        color: randomColor(),
      }),
      data.totalsContactsWaitingFeedbackByPublisher
    );

    const dataWaitingFeedbackSummaryParsed = [
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
        label: `${data.totalPercentContactsAssignByOthersWaitingFeedback}% ${t(
          "totalContactsWaitingFeedback"
        )}`,
        value: data.totalPercentContactsAssignByOthersWaitingFeedback,
        color: "#6610f2",
      },
    ];

    this.setState({
      contacted: dataContactedSummaryParsed,
      feedback: dataWaitingFeedbackSummaryParsed,
      byPublishers: dataWaitingFeedbackByPublishersSummaryParsed,
      submitting: false,
    });
  }

  buildSubTitleMessage = () =>
    `${this.props.t("welcome")}, ${get("name", getUserData())}`;

  componentDidMount() {
    this.handleGetSummary();
  }

  render() {
    const { contacted, feedback, byPublishers } = this.state;
    const { t } = this.props;
    return (
      <Row className="mt-4">
        <Col xs={12} lg={{ span: 3, offset: 1 }}>
          <Card>
            <Card.Header className="text-center" style={{ minHeight: '73px'}}>
              {t("titleChartContacts")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(contacted) ? (
                <PieChart
                  animate={true}
                  data={contacted}
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
            <Card.Header className="text-center" style={{ minHeight: '73px'}}>
              {t("titleChartWaitingFeedback")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(feedback) ? (
                <PieChart
                  animate={true}
                  data={feedback}
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
            <Card.Header className="text-center" style={{ minHeight: '73px'}}>
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
