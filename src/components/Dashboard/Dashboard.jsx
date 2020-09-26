import React from "react";
import { get } from "lodash/fp";
import { getUserData } from "../../utils/loginDataManager";
import { contacts } from "../../services";
import { withTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import NavBarMenu from "../NavBar/NavBar";
import "./styles.css";
import logo from "../../assets/images/logo.png";
import { Col, Container, Row } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submitting: false,
    };
    this.handleGetSummary = this.handleGetSummary.bind(this);
  }

  async handleGetSummary() {
    this.setState({ submitting: true });
    const response = await contacts.getSummary();
    const data = get("data", response);
    const dataSummaryParsed = [
      {
        title: "contacted",
        value: data.totalPercentContacted,
        label: `${data.totalPercentContacted}% Contacted`,
        color: "#E38627",
      },
      {
        title: "withoutContact",
        label: `${data.totalPercentWithoutContacted}% no contacted`,
        value: data.totalPercentWithoutContacted,
        color: "#C13C37",
      },
    ];

    this.setState({ data: dataSummaryParsed, submitting: false });
  }

  buildSubTitleMessage = () =>
    `${this.props.t("welcome")}, ${get("name", getUserData())}`;

  componentDidMount() {
    this.handleGetSummary();
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <NavBarMenu {...this.props} />
        <Container>
          <Row className="mt-4">
            <Col lg={6} xs={12}>
              <Row>
                <Col className="text-center">
                  <h1>Agenda Telefonica</h1>
                  <h2>Cong. Santa Rita</h2>
                  <h3>{this.buildSubTitleMessage()}</h3>
                </Col>
              </Row>
              <Row>
                <Col xs={5}>
                  <PieChart
                    animate={true}
                    data={data}
                    totalValue={100}
                    label={({ dataEntry }) => dataEntry.label}
                    labelStyle={{
                      fontSize: "5px",
                      // fontFamily: "sans-serif",
                      // fill: "#E38627",
                    }}
                    // lineWidth={20}
                    // labelPosition={0}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <img src={logo} alt="logo" className="hero-image" />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withTranslation(["dashboard", "common"])(Dashboard);
