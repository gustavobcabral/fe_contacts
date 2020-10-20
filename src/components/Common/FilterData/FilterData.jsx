import React from "react";
import { withTranslation } from "react-i18next";
import { Form, Card, Row, Col } from "react-bootstrap";
import { pipe, uniq, compact, remove, getOr, map } from "lodash/fp";
import { contacts } from "../../../services/";
class FilterData extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      loading: false,
      genders: [],
      checksGender: [],
      languages: [],
      checksLanguages: [],
    };
    this.getAllFilters = this.getAllFilters.bind(this);
  }

  handleOnClick(event) {
    const { handleFilters } = this.props;
    const {
      target: { name, value, checked },
    } = event;
    const newValues = checked
      ? pipe(uniq, compact)([...this.state[name], value])
      : remove((arrayValue) => arrayValue === value, this.state[name]);

    this.setState({
      [name]: newValues,
    });
    handleFilters({
      [name]: newValues,
    });
    return ""
  }

  async getAllFilters() {
    this.setState({ loading: true });

    const response = await contacts.getAllFilters();
    this.setState({
      checksGender: getOr([], "data.data.genders", response),
      checksLanguages: getOr([], "data.data.languages", response),
      loading: false,
    });
  }

  componentDidMount() {
    this.getAllFilters();
  }

  render() {
    const { checksGender, checksLanguages } = this.state;
    const { t } = this.props;
    return (
      <Form>
        <Row className="text-center mb-4">
          <Col>
            <h3>Filters</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{t("gendersTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Check
                      key={data.gender}
                      type="checkbox"
                      name="genders"
                      label={t(data.gender)}
                      value={data.gender}
                      onClick={this.handleOnClick}
                    />
                  ),
                  checksGender
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{t("languagesTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Check
                      key={data.idLanguage}
                      type="checkbox"
                      name="languages"
                      label={t(`languages:${data.languageName}`)}
                      value={data.idLanguage}
                      onClick={this.handleOnClick}
                    />
                  ),
                  checksLanguages
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withTranslation(["contacts", "languages"])(
  FilterData
);
