import React from "react";
import { withTranslation } from "react-i18next";
import { Form, Card, Col } from "react-bootstrap";
import { pipe, uniq, compact, remove, getOr, map, isEmpty } from "lodash/fp";

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
      status: [],
      checksStatus: [],
    };
    this.getAllFilters = this.getAllFilters.bind(this);
    this.setGenderLabel = this.setGenderLabel.bind(this);
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
    return "";
  }

  async getAllFilters() {
    this.setState({ loading: true });
    const { getFilters } = this.props;
    const response = await getFilters();
    this.setState({
      checksGender: getOr([], "data.data.genders", response),
      checksLanguages: getOr([], "data.data.languages", response),
      checksStatus: getOr([], "data.data.status", response),
      loading: false,
    });
  }

  componentDidMount() {
    this.getAllFilters();
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state;
    const { refresh } = this.props;
    const { prevRefresh } = prevProps;
    if (refresh && !prevRefresh && !loading) this.getAllFilters();
  }

  setGenderLabel(data) {
    const { t } = this.props;
    const gender = isEmpty(data) ? "undefinedGender" : data;
    return t(`contacts:${gender}`);
  }

  setGenderValue(data) {
    return isEmpty(data) ? "undefinedGender" : data;
  }

  render() {
    const { checksGender, checksLanguages, checksStatus } = this.state;
    const { t } = this.props;
    return (
      <>
        <Col xs={3} lg={12} className="text-center">
          <h3>Filters</h3>
        </Col>
        {!isEmpty(checksGender) && (
          <Col xs={3} lg={12} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("gendersTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Check
                      key={data.gender}
                      type="checkbox"
                      name="genders"
                      label={this.setGenderLabel(data.gender)}
                      value={this.setGenderValue(data.gender)}
                      onClick={this.handleOnClick}
                    />
                  ),
                  checksGender
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
        {!isEmpty(checksLanguages) && (
          <Col xs={3} lg={12} className="mb-4">
            <Card>
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
        )}
        {!isEmpty(checksStatus) && (
          <Col xs={3} lg={12} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("statusTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Check
                      key={data.idStatus}
                      type="checkbox"
                      name="status"
                      label={t(`status:${data.statusDescription}`)}
                      value={data.idStatus}
                      onClick={this.handleOnClick}
                    />
                  ),
                  checksStatus
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
      </>
    );
  }
}

export default withTranslation([
  "filterData",
  "languages",
  "status",
  "contacts",
])(FilterData);
