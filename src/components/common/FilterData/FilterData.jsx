import React from 'react'
import { withTranslation } from 'react-i18next'
import { Form, Card, Col } from 'react-bootstrap'
import {
  pipe,
  uniq,
  compact,
  remove,
  getOr,
  map,
  isEmpty,
  contains,
} from 'lodash/fp'
import { parseErrorMessage } from '../../../utils/generic'
import ReactPlaceholder from 'react-placeholder'
import SuperSelect from '../SuperSelect/SuperSelect'

class FilterData extends React.Component {
  constructor(props) {
    super(props)

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
      publishersResponsibles: [],
      checksPublishersResponsibles: [],
      typeCompany: '-1',
    }
    this.getAllFilters = this.getAllFilters.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleGetValuesTradicional = this.handleGetValuesTradicional.bind(this)
    this.updateValues = this.updateValues.bind(this)
  }

  handleOnClick(event) {
    const {
      target: { name, value, checked },
    } = event
    const newValues = checked
      ? pipe(uniq, compact)([...this.state[name], value])
      : remove((arrayValue) => arrayValue === value, this.state[name])
    this.updateValues(name, newValues)
  }

  handleGetValuesTradicional(event) {
    const {
      target: { name, value },
    } = event
    this.updateValues(name, value)
  }

  updateValues(name, newValues) {
    const { handleFilters } = this.props

    this.setState({
      [name]: newValues,
    })
    handleFilters({
      filters: {
        [name]: newValues,
      },
    })
  }

  async getAllFilters() {
    this.setState({ loading: true })
    try {
      const { getFilters } = this.props
      const response = await getFilters()
      const data = getOr([], 'data.data', response)
      this.setState({
        checksGender: getOr([], 'genders', data),
        checksLanguages: getOr([], 'languages', data),
        checksStatus: getOr([], 'status', data),
        checksResponsibility: getOr([], 'responsibility', data),
        checksPublishersResponsibles: getOr([], 'publishersResponsibles', data),
        loading: false,
      })
    } catch (error) {
      const { t } = this.props
      this.setState({
        error: t(`common:${parseErrorMessage(error)}`),
        loading: false,
      })
    }
  }

  componentDidMount() {
    this.getAllFilters()
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.state
    const { refresh, error } = this.props
    const prevRefresh = getOr(true, 'refresh', prevProps)
    if (refresh && !prevRefresh && !loading && !error) this.getAllFilters()
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
      checksPublishersResponsibles,
      publishersResponsibles,
    } = this.state

    const noData =
      isEmpty(checksGender) &&
      isEmpty(checksLanguages) &&
      isEmpty(checksResponsibility) &&
      isEmpty(checksPublishersResponsibles) &&
      isEmpty(checksStatus)
    const { t, showTypeCompany = false } = this.props
    return (
      <>
        <Col className="text-center">
          <h3>{t('title')}</h3>
        </Col>
        <Col className="text-center text-muted">{error}</Col>
        <Col className="text-center text-muted">
          {!loading && noData && t('common:noData')}
        </Col>
        {(loading || !isEmpty(checksPublishersResponsibles)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {t('publishersResponsiblesTitleFilter')}
                </Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={3}
                >
                  <SuperSelect
                    name="publishersResponsibles"
                    value={publishersResponsibles}
                    isMulti={true}
                    options={map(
                      ({ createdBy, publisherNameCreatedBy }) => ({
                        label: publisherNameCreatedBy,
                        value: createdBy,
                      }),
                      checksPublishersResponsibles
                    )}
                    onChange={this.handleGetValuesTradicional}
                  />
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
        {(loading || !isEmpty(checksGender)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t('gendersTitleFilter')}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={3}
                >
                  {map(
                    ({ gender }) => (
                      <Form.Group controlId={`genders${gender}`} key={gender}>
                        <Form.Check
                          type="checkbox"
                          name="genders"
                          checked={contains(gender, genders)}
                          label={t(`contacts:${gender}`)}
                          value={gender}
                          onChange={this.handleOnClick}
                        />
                      </Form.Group>
                    ),
                    checksGender
                  )}
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
        {(loading || !isEmpty(checksLanguages)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t('languagesTitleFilter')}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={5}
                >
                  {map(
                    ({ idLanguage, languageName }) => (
                      <Form.Group
                        controlId={`languages${idLanguage}`}
                        key={idLanguage}
                      >
                        <Form.Check
                          type="checkbox"
                          name="languages"
                          checked={contains(String(idLanguage), languages)}
                          label={t(`languages:${languageName}`)}
                          value={idLanguage}
                          onChange={this.handleOnClick}
                        />
                      </Form.Group>
                    ),
                    checksLanguages
                  )}
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
        {(loading || !isEmpty(checksStatus)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t('statusTitleFilter')}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={6}
                >
                  {map(
                    ({ idStatus, statusDescription }) => (
                      <Form.Group
                        controlId={`status${idStatus}`}
                        key={idStatus}
                      >
                        <Form.Check
                          type="checkbox"
                          name="status"
                          checked={contains(String(idStatus), status)}
                          label={t(`status:${statusDescription}`)}
                          value={idStatus}
                          onChange={this.handleOnClick}
                        />
                      </Form.Group>
                    ),
                    checksStatus
                  )}
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
        {(loading || !isEmpty(checksResponsibility)) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t('responsibilityTitleFilter')}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={4}
                >
                  {map(
                    ({ idResponsibility, responsibilityDescription }) => (
                      <Form.Group
                        key={idResponsibility}
                        controlId={`responsibility${idResponsibility}`}
                      >
                        <Form.Check
                          type="checkbox"
                          name="responsibility"
                          checked={contains(
                            String(idResponsibility),
                            responsibility
                          )}
                          label={t(
                            `responsibility:${responsibilityDescription}`
                          )}
                          value={idResponsibility}
                          onChange={this.handleOnClick}
                        />
                      </Form.Group>
                    ),
                    checksResponsibility
                  )}
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
        {showTypeCompany && (loading || !noData) && !error && (
          <Col className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t('typeCompanyTitleFilter')}</Card.Title>
                <ReactPlaceholder
                  showLoadingAnimation={true}
                  type="text"
                  ready={!loading}
                  rows={3}
                >
                  <Col xs={6} lg={2}>
                    <Form.Group controlId="both">
                      <Form.Check
                        key="typeCompanyBoth"
                        type="radio"
                        name="typeCompany"
                        label={t('typeCompanyBoth')}
                        checked={typeCompany === '-1'}
                        value={'-1'}
                        onChange={this.handleGetValuesTradicional}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} lg={2}>
                    <Form.Group controlId="typeCompanyResidencial0Filter">
                      <Form.Check
                        key="typeCompanyResidential0"
                        type="radio"
                        name="typeCompany"
                        label={t('contacts:residential')}
                        checked={typeCompany === '0'}
                        value={'0'}
                        onChange={this.handleGetValuesTradicional}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="typeCompanyCommercial1Filter">
                      <Form.Check
                        key="typeCompanyCommercial1"
                        type="radio"
                        name="typeCompany"
                        label={t('contacts:commercial')}
                        checked={typeCompany === '1'}
                        value={'1'}
                        onChange={this.handleGetValuesTradicional}
                      />
                    </Form.Group>
                  </Col>
                </ReactPlaceholder>
              </Card.Body>
            </Card>
          </Col>
        )}
      </>
    )
  }
}

export default withTranslation([
  'filterData',
  'languages',
  'status',
  'contacts',
])(FilterData)
