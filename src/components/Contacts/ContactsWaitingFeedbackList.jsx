import React from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import ContainerCRUD from '../../components/common/ContainerCRUD/ContainerCRUD'
import { withTranslation } from 'react-i18next'
import { details } from '../../services'
import {
  map,
  getOr,
  isEmpty,
  pipe,
  uniq,
  compact,
  remove,
  contains,
  find,
  get,
} from 'lodash/fp'
import AskDelete from '../common/AskDelete/AskDelete'
import NoRecords from '../common/NoRecords/NoRecords'
import Pagination from '../common/Pagination/Pagination'
import Search from '../common/Search/Search'
import {
  parseQuery,
  formatDateDMY,
  diffDate,
  setFiltersToURL,
  getFiltersFromURL,
} from '../../utils/forms'
import {
  RECORDS_PER_PAGE,
  MAX_DAYS_ALLOWED_WITH_NUMBERS,
} from '../../constants/application'
import FilterData from '../common/FilterData/FilterData'
import EditDetailsContact from '../DetailsContact/Modal/EditDetailsContact'
import SendPhones from './SendPhones/SendPhones'
import { showError } from '../../utils/generic'
import ReactPlaceholder from 'react-placeholder'
import { CSVLink } from 'react-csv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faHourglass } from '@fortawesome/free-solid-svg-icons'
import OurToolTip from '../common/OurToolTip/OurToolTip'
import { Checkbox } from 'pretty-checkbox-react'
import './styles.css'

class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      error: false,
      hiddenFilter: false,
      checksContactsPhones: [],
      headers: [],
      dataCVS: [],
      submitting: false,
      pagination: {},
      queryParams: {
        sort: `"createdAt":ASC,"publisherName":ASC`,
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: '',
          owner: '',
          phone: '',
          responsible: '',
          creator: '',
          note: '',
          typeCompany: '-1',
          genders: [],
          languages: [],
          status: [],
        }),
      },
    }
    this.handleGetAll = this.handleGetAll.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCheckAll = this.handleCheckAll.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.parseDataCVS = this.parseDataCVS.bind(this)
  }

  uncheckCheckboxSelectAll() {
    document.getElementById('checkall').checked = false
  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true, checksContactsPhones: [] })
    this.uncheckCheckboxSelectAll()
    const { t } = this.props
    try {
      const queryParams = parseQuery(objQuery, this.state)
      setFiltersToURL(queryParams, this.props)

      const response = await details.getAllWaitingFeedback(queryParams)
      this.setState({
        data: getOr([], 'data.data.list', response),
        pagination: getOr({}, 'data.data.pagination', response),
        submitting: false,
        error: false,
        queryParams,
      })
    } catch (error) {
      this.setState({
        error,
        submitting: false,
      })
      showError(error, t, 'contacts')
    }
  }

  async handleDelete(id) {
    const { t } = this.props
    this.setState({ submitting: true })
    await details
      .dellOne(id)
      .then(() => {
        this.handleGetAll()
      })
      .catch((error) => {
        this.setState({ submitting: false })
        showError(error, t, 'contacts')
      })
  }

  handleOnClick(event) {
    const {
      target: { value, checked },
    } = event
    const newValues = checked
      ? pipe(uniq, compact)([...this.state.checksContactsPhones, value])
      : remove(
          (valueSaved) => valueSaved === value,
          this.state.checksContactsPhones
        )

    this.setState({
      checksContactsPhones: newValues,
    })
  }

  handleCheckAll(event) {
    const {
      target: { checked },
    } = event

    const newValues = checked
      ? map((contact) => contact.phone, this.state.data)
      : []
    this.setState({ checksContactsPhones: newValues })
  }

  componentDidMount() {
    const filters = getFiltersFromURL(this.props)
    this.handleGetAll({ filters })
  }

  afterSentPhones() {
    this.handleGetAll()
  }

  toggleFilter() {
    this.setState({ hiddenFilter: !getOr(false, 'hiddenFilter', this.state) })
  }

  parseDataCVS() {
    const { t } = this.props
    const { checksContactsPhones, data } = this.state
    const dataCVS = map((phone) => {
      const contact = find((item) => item.phone === phone, data)
      return {
        ...contact,
        gender: t(contact.gender),
        typeCompany: t(`${contact.typeCompany ? 'commercial' : 'residential'}`),
        languageName: t(`languages:${contact.languageName}`),
        statusDescription: t(`status:${contact.statusDescription}`),
      }
    }, checksContactsPhones)
    this.setState({
      dataCVS,
      headers: [
        { label: t('phone'), key: 'phone' },
        { label: t('name'), key: 'contactName' },
        { label: t('owner'), key: 'owner' },
        { label: t('gender'), key: 'gender' },
        { label: t('typeCompany'), key: 'typeCompany' },
        { label: t('language'), key: 'languageName' },
        { label: t('status'), key: 'statusDescription' },
        {
          label: t('publisherCreatedBy'),
          key: 'publisherNameCreatedBy',
        },
        { label: t('publisherResponsible'), key: 'publisherName' },
      ],
    })
  }

  getDateWithDays(date) {
    const { t } = this.props

    return `${formatDateDMY(date)} (${t('diffDate', {
      days: diffDate(date),
    })})`
  }

  thisDateAlreadyReachedMaxAllowed = (date) => {
    const days = diffDate(date)
    return days > MAX_DAYS_ALLOWED_WITH_NUMBERS
  }

  getStyleForFieldDays(date) {
    return this.thisDateAlreadyReachedMaxAllowed(date)
      ? 'link text-danger'
      : 'link'
  }

  render() {
    const { t } = this.props
    const {
      data,
      pagination,
      submitting,
      checksContactsPhones,
      error,
      hiddenFilter,
      headers,
      dataCVS,
      queryParams,
    } = this.state
    const colSpan = '9'
    const filters = JSON.parse(get('filters', queryParams))

    const title = (
      <React.Fragment>
        {' '}
        <FontAwesomeIcon icon={faHourglass} /> {t('titleWaitingFeedback')}{' '}
      </React.Fragment>
    )

    return (
      <ContainerCRUD color="warning" title={title} {...this.props}>
        <Row>
          <Col xs={12} lg={3} xl={2} className={hiddenFilter ? 'd-none' : ''}>
            <FilterData
              filters={filters}
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              showTypeCompany={true}
              getFilters={details.getAllWaitingFeedbackFilters}
            />
          </Col>
          <Col xs={12} lg={hiddenFilter ? 12 : 9} xl={hiddenFilter ? 12 : 10}>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={[
                    'name',
                    'phone',
                    'responsible',
                    'creator',
                    'note',
                    'owner',
                  ]}
                  colspan={colSpan}
                  toggleFilter={this.toggleFilter}
                />
                <tr>
                  <th style={{ minWidth: '60px' }}>
                    <Checkbox
                      type="checkbox"
                      id="checkall"
                      name="checkall"
                      className="marginLeftCheckbox"
                      color="success"
                      bigger
                      animation="pulse"
                      value="all"
                      onClick={this.handleCheckAll}
                    />
                  </th>
                  <th>{t('phone')}</th>
                  <th className="d-none d-sm-table-cell">{t('name')}</th>
                  <th className="d-none d-lg-table-cell">{t('language')}</th>
                  <th className="d-none d-lg-table-cell">{t('status')}</th>
                  <th className="d-none d-lg-table-cell">
                    {t('publisherCreatedBy')}
                  </th>
                  <th className="d-none d-lg-table-cell">{t('createdAt')}</th>
                  <th className="d-none d-lg-table-cell">
                    {t('publisherResponsible')}
                  </th>
                  <th style={{ minWidth: '116px' }}>
                    <SendPhones
                      checksContactsPhones={checksContactsPhones}
                      contactsData={data}
                      afterClose={() => this.afterSentPhones()}
                    />{' '}
                    <CSVLink
                      data={dataCVS}
                      headers={headers}
                      filename={`${t('titleWaitingFeedback')}.csv`}
                      title={t('titleExportToCVSWaitingFeedback')}
                      className={`btn btn-primary ${
                        checksContactsPhones.length > 0 ? '' : 'disabled'
                      }`}
                      onClick={this.parseDataCVS}
                    >
                      <FontAwesomeIcon icon={faFileExcel} />
                    </CSVLink>
                  </th>
                </tr>
              </thead>
              <tbody>
                {submitting ? (
                  <tr>
                    <td colSpan={colSpan}>
                      <ReactPlaceholder
                        showLoadingAnimation={true}
                        type="text"
                        ready={!submitting}
                        rows={RECORDS_PER_PAGE}
                      />
                    </td>
                  </tr>
                ) : !isEmpty(data) ? (
                  map(
                    (detailContact) => (
                      <tr key={detailContact.id}>
                        <td style={{ width: '60px' }}>
                          <Checkbox
                            type="checkbox"
                            checked={contains(
                              detailContact.phone,
                              checksContactsPhones
                            )}
                            name="checksContactsPhones"
                            value={detailContact.phone}
                            color="success"
                            className="marginLeftCheckbox"
                            bigger
                            onChange={this.handleOnClick}
                          />
                        </td>
                        <td>{detailContact.phone}</td>
                        <td className="d-none d-sm-table-cell">
                          {detailContact.contactName}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`languages:${detailContact.languageName}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`status:${detailContact.statusDescription}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {detailContact.publisherNameCreatedBy}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          <OurToolTip
                            info={formatDateDMY(detailContact.createdAt)}
                            toolTipContent="toolTipWaitingFeedback"
                            showTooltip={this.thisDateAlreadyReachedMaxAllowed(
                              detailContact.createdAt
                            )}
                            getStyleForFieldDays={() =>
                              this.getStyleForFieldDays(detailContact.createdAt)
                            }
                          />
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {detailContact.publisherName}
                        </td>
                        <td>
                          <EditDetailsContact
                            data={detailContact}
                            contact={detailContact}
                            id={detailContact.id}
                            afterClose={this.handleGetAll}
                          />{' '}
                          <AskDelete
                            id={detailContact.id}
                            title={t('deleteRecordWaitingFeedback')}
                            funcToCallAfterConfirmation={this.handleDelete}
                          />
                        </td>
                      </tr>
                    ),
                    data
                  )
                ) : (
                  <NoRecords cols={colSpan} />
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={colSpan} style={{ border: 0 }}>
                    <Pagination
                      pagination={pagination}
                      submitting={submitting}
                      onClick={this.handleGetAll}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
      </ContainerCRUD>
    )
  }
}

export default withTranslation([
  'contacts',
  'common',
  'detailsContacts',
  'languages',
  'status',
])(Contacts)
