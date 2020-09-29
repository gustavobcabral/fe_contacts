import React from "react";
import { get } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";
import { contacts } from "../../services";
import { withTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import ContainerWithNavBar from "../ContainerWithNavBar/ContainerWithNavBar";
import logo from "../../assets/images/logo.png";
import { Col, Row, Card, Image } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacted: [],
      feedback: [],
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
        color: "#E38627",
      },
      {
        title: t("withoutContact"),
        label: `${data.totalPercentWithoutContacted}% ${t("withoutContact")}`,
        value: data.totalPercentWithoutContacted,
        color: "#C13C37",
      },
    ];

    const dataWaitingFeedbackSummaryParsed = [
      {
        title: t("totalContactsAssignByMeWaitingFeedback"),
        value: data.totalPercentContactsAssignByMeWaitingFeedback,
        label: `${data.totalPercentContactsAssignByMeWaitingFeedback}% ${t(
          "totalContactsAssignByMeWaitingFeedback"
        )}`,
        color: "#E38627",
      },
      {
        title: t("totalContactsWaitingFeedback"),
        label: `${data.totalPercentContactsAssignByOthersWaitingFeedback}% ${t(
          "totalContactsWaitingFeedback"
        )}`,
        value: data.totalPercentContactsAssignByOthersWaitingFeedback,
        color: "#C13C37",
      },
    ];

    this.setState({
      contacted: dataContactedSummaryParsed,
      feedback: dataWaitingFeedbackSummaryParsed,
      submitting: false,
    });
  }

  buildSubTitleMessage = () =>
    `${this.props.t("welcome")}, ${get("name", getUserData())}`;

  componentDidMount() {
    this.handleGetSummary();
  }

  render() {
    const { contacted, feedback } = this.state;
    const { t } = this.props;
    return (
      <ContainerWithNavBar {...this.props}>
        <Row className="mt-4">
          <Col lg={{ span: 4, offset: 1 }} xs={12}>
            <Row>
              <Col className="text-center" style={{ marginTop: '31%'}}>
                <h1>Agenda Telefonica</h1>
                <h2>Cong. Santa Rita</h2>
                <h3>{this.buildSubTitleMessage()}</h3>
              </Col>
            </Row>
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
          <Image src={logo} fluid />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} lg={{ span: 3, offset: 2 }}>
            <Card>
              <Card.Header className="text-center">{t("titleChartContacts")}</Card.Header>
              <Card.Body>
                <PieChart
                  animate={true}
                  data={contacted}
                  totalValue={100}
                  label={({ dataEntry }) => dataEntry.label}
                  labelStyle={{
                    fontSize: "5px",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={{ span: 3, offset: 2 }}>
            <Card>
              <Card.Header className="text-center">{t("titleChartWaitingFeedback")}</Card.Header>
              <Card.Body>
                <PieChart
                  animate={true}
                  data={feedback}
                  totalValue={100}
                  label={({ dataEntry }) => dataEntry.label}
                  labelStyle={{
                    fontSize: "5px",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </ContainerWithNavBar>
    );
  }
}

export default withTranslation(["dashboard", "common"])(Dashboard);
