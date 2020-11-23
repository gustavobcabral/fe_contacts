import React from "react";
import { withTranslation } from "react-i18next";
import { Form, Card, Col } from "react-bootstrap";
import {
  pipe,
  uniq,
  compact,
  remove,
  getOr,
  map,
  isEmpty,
  contains,
} from "lodash/fp";
import { parseErrorMessage } from "../../../utils/generic";
import ReactPlaceholder from "react-placeholder";

class FilterData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      genders: [],
      checksGender: [],
      languages: [],
      checksLanguages: [],
      status: [],
      checksStatus: [],
      responsibility: [],
      checksResponsibility: [],
      typeCompany: "-1",
    };
    this.getAllFilters = this.getAllFilters.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleBooleanValues = this.handleBooleanValues.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  handleOnClick(event) {
    const {
      target: { name, value, checked },
    } = event;
    const newValues = checked
      ? pipe(uniq, compact)([...this.state[name], value])
      : remove((arrayValue) => arrayValue === value, this.state[name]);
    this.updateValues(name, newValues);
  }

  handleBooleanValues(event) {
    const {
      target: { name, value },
    } = event;

    this.updateValues(name, value);
  }

  updateValues(name, newValues) {
    const { handleFilters } = this.props;

    this.setState({
      [name]: newValues,
    });
    handleFilters({
      filters: {
        [name]: newValues,
      },
    });
  }

  async getAllFilters() {
    this.setState({ loading: true });
    try {
      const { getFilters } = this.props;
      const response = await getFilters();
      this.setState({
        checksGender: getOr([], "data.data.genders", response),
        checksLanguages: getOr([], "data.data.languages", response),
        checksStatus: getOr([], "data.data.status", response),
        checksResponsibility: getOr([], "data.data.responsibility", response),
        loading: false,
      });
    } catch (error) {
      const { t } = this.props;
      this.setState({
        error: t(`common:${parseErrorMessage(error)}`),
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.getAllFilters();
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state;
    const { refresh, error } = this.props;
    const { prevRefresh } = prevProps;
    if (refresh && !prevRefresh && !loading && !error) this.getAllFilters();
  }

  render() {
    const {
      checksGender,
      genders,
      checksLanguages,
      languages,
      checksResponsibility,
      responsibility,
      checksStatus,
      status,
      error,
      loading,
      typeCompany,
    } = this.state;

    const noData =
      isEmpty(checksGender) &&
      isEmpty(checksLanguages) &&
      isEmpty(checksResponsibility) &&
      isEmpty(checksStatus);
    const { t, showTypeCompany = false } = this.props;
    return (
      <ReactPlaceholder
        showLoadingAnimation={true}
        type="text"
        ready={!loading}
        rows={18}
      >
        <Col className="text-center">
          <h3>{t("title")}</h3>
        </Col>
        <Col className="text-center text-muted">{error}</Col>
        <Col className="text-center text-muted">
          {noData && t("common:noData")}
        </Col>
        {!isEmpty(checksGender) && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("gendersTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Group
                      controlId={`genders${data.gender}`}
                      key={data.gender}
                    >
                      <Form.Check
                        type="checkbox"
                        name="genders"
                        checked={contains(data.gender, genders)}
                        label={t(`contacts:${data.gender}`)}
                        value={data.gender}
                        onChange={this.handleOnClick}
                      />
                    </Form.Group>
                  ),
                  checksGender
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
        {!isEmpty(checksLanguages) && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("languagesTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Group
                      controlId={`languages${data.idLanguage}`}
                      key={data.idLanguage}
                    >
                      <Form.Check
                        type="checkbox"
                        name="languages"
                        checked={contains(String(data.idLanguage), languages)}
                        label={t(`languages:${data.languageName}`)}
                        value={data.idLanguage}
                        onChange={this.handleOnClick}
                      />
                    </Form.Group>
                  ),
                  checksLanguages
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
        {!isEmpty(checksStatus) && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("statusTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Group
                      controlId={`status${data.idStatus}`}
                      key={data.idStatus}
                    >
                      <Form.Check
                        type="checkbox"
                        name="status"
                        checked={contains(String(data.idStatus), status)}
                        label={t(`status:${data.statusDescription}`)}
                        value={data.idStatus}
                        onChange={this.handleOnClick}
                      />
                    </Form.Group>
                  ),
                  checksStatus
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
        {!isEmpty(checksResponsibility) && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("responsibilityTitleFilter")}</Card.Title>
                {map(
                  (data) => (
                    <Form.Group
                      controlId={`responsibility${data.idResponsibility}`}
                    >
                      <Form.Check
                        key={data.idResponsibility}
                        type="checkbox"
                        name="responsibility"
                        checked={contains(
                          String(data.idResponsibility),
                          responsibility
                        )}
                        label={t(
                          `responsibility:${data.responsibilityDescription}`
                        )}
                        value={data.idResponsibility}
                        onChange={this.handleOnClick}
                      />
                    </Form.Group>
                  ),
                  checksResponsibility
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
        {showTypeCompany && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("typeCompanyTitleFilter")}</Card.Title>
                <Col xs={6} lg={2}>
                  <Form.Group controlId="both">
                    <Form.Check
                      key="typeCompanyBoth"
                      type="radio"
                      name="typeCompany"
                      label={t("typeCompanyBoth")}
                      checked={typeCompany === "-1"}
                      value={"-1"}
                      onChange={this.handleBooleanValues}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} lg={2}>
                  <Form.Group controlId="residential">
                    <Form.Check
                      key="typeCompanyResidential0"
                      type="radio"
                      name="typeCompany"
                      label={t("contacts:residential")}
                      checked={typeCompany === "0"}
                      value={"0"}
                      onChange={this.handleBooleanValues}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="commercial">
                    <Form.Check
                      key="typeCompanyCommercial1"
                      type="radio"
                      name="typeCompany"
                      label={t("contacts:commercial")}
                      checked={typeCompany === "1"}
                      value={"1"}
                      onChange={this.handleBooleanValues}
                    />
                  </Form.Group>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        )}
      </ReactPlaceholder>
    );
  }
}

export default withTranslation([
  "filterData",
  "languages",
  "status",
  "contacts",
])(FilterData);
