import React from "react";
import { get } from "lodash/fp";
import { withTranslation } from "react-i18next";
import { Row } from "react-bootstrap";
import { getUserData } from "../../utils/loginDataManager";
import { contacts } from "../../services";
import ChartByContacted from "./ByContacted";
import ChartByFeedback from "./ByFeedback";
import ChartByGender from "./ByGender";
import ChartByLanguage from "./ByLanguage";
import ChartByPublishers from "./ByPublishers";
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
    this.handleGetSummary = this.handleGetSummary.bind(this);
  }

  async handleGetSummary() {
    this.setState({ loading: true });
    const response = await contacts.getSummary();
    const data = get("data", response);

    this.setState({
      data,
      loading: false,
    });
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
        <Row className="mt-4">
          <ChartByContacted data={data} />
          <ChartByFeedback data={data} />
          <ChartByGender data={data} />
        </Row>
        <Row className="mt-4">
          <ChartByLanguage data={data} />
          <ChartByPublishers data={data} />
        </Row>
      </>
    );
  }
}

export default withTranslation(["dashboard", "common"])(Charts);
