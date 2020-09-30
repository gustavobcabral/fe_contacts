import React from "react";
import { get, map, isEmpty, getOr } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";
import { contacts } from "../../services";
import { withTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { Col, Row, Card, ListGroup } from "react-bootstrap";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byContacted: [],
      byFeedback: [],
      byPublishers: [],
      loading: false,
    };
    this.handleGetSummary = this.handleGetSummary.bind(this);
  }

  getByContacted(data) {
    const { t } = this.props;
    if (
      getOr(0, "totalPercentContacted", data) === 0 ||
      getOr(0, "totalPercentWithoutContacted", data) === 0
    )
      return [];

    return [
      {
        title: t("contacted"),
        value: getOr(0, "totalPercentContacted", data),
        label: `${getOr(0, "totalPercentContacted", data)}% ${t("contacted")}`,
        color: "#28a745",
      },
      {
        title: t("withoutContact"),
        label: `${getOr(0, "totalPercentWithoutContacted", data)}% ${t(
          "withoutContact"
        )}`,
        value: getOr(0, "totalPercentWithoutContacted", data),
        color: "#f73939",
      },
    ];
  }

  getByFeedback = (data) => {
    const { t } = this.props;
    if (
      getOr(0, "totalPercentContactsAssignByMeWaitingFeedback", data) === 0 ||
      getOr(0, "totalPercentContactsAssignByOthersWaitingFeedback", data) === 0
    )
      return [];

    return [
      {
        title: t("totalContactsAssignByMeWaitingFeedback"),
        value: getOr(0, "totalPercentContactsAssignByMeWaitingFeedback", data),
        label: `${getOr(
          0,
          "totalPercentContactsAssignByMeWaitingFeedback",
          data
        )}% ${t("totalContactsAssignByMeWaitingFeedback")}`,
        color: "#007bff",
      },
      {
        title: t("totalContactsWaitingFeedback"),
        label: `${getOr(
          0,
          "totalPercentContactsAssignByOthersWaitingFeedback",
          data
        )}% ${t("totalContactsWaitingFeedback")}`,
        value: getOr(
          0,
          "totalPercentContactsAssignByOthersWaitingFeedback",
          data
        ),
        color: "#6610f2",
      },
    ];
  };

  randomColor = () =>
    `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

  generateLabel = (dataPublisher) =>
    `${getOr(0, "percent", dataPublisher)}% ${getOr(
      "no Name",
      "publisherName",
      dataPublisher
    ).slice(0, 10)}`;

  getByPublishers = (data) =>
    map(
      (dataPublisher) => ({
        title: `${getOr(0, "percent", dataPublisher)}% ${getOr(
          this.props.t("noName"),
          "publisherName",
          dataPublisher
        )}`,
        value: getOr(0, "percent", dataPublisher),
        label: this.generateLabel(dataPublisher),
        color: this.randomColor(),
      }),
      getOr([], "totalsContactsWaitingFeedbackByPublisher", data)
    );

  async handleGetSummary() {
    this.setState({ loading: true });
    const response = await contacts.getSummary();
    const data = get("data", response);

    this.setState({
      byContacted: this.getByContacted(data),
      byFeedback: this.getByFeedback(data),
      byPublishers: this.getByPublishers(data),
      loading: false,
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
        <Col xs={{ span: 8, offset: 2 }} lg={{ span: 3, offset: 1 }}>
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
                  label={({ dataEntry }) => get("label", dataEntry)}
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
        <Col xs={{ span: 8, offset: 2 }} lg={{ span: 3, offset: 0 }}>
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
                  label={({ dataEntry }) => get("label", dataEntry)}
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
        <Col xs={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 0 }}>
          <Card>
            <Card.Header className="text-center" style={{ minHeight: "73px" }}>
              {t("titleChartWaitingFeedbackByPublishers")}
            </Card.Header>
            <Card.Body>
              {!isEmpty(byPublishers) ? (
                <Row>
                  <Col>
                    <PieChart
                      animate={true}
                      data={byPublishers}
                      totalValue={100}
                    />
                  </Col>
                  <Col lg={4} md={12}>
                    <ListGroup>
                      {map(
                        (dataPublisher) => (
                          <ListGroup.Item
                            style={{
                              backgroundColor: get("color", dataPublisher),
                            }}
                          >
                            {dataPublisher.label}
                          </ListGroup.Item>
                        ),
                        byPublishers
                      )}
                    </ListGroup>
                  </Col>
                </Row>
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
