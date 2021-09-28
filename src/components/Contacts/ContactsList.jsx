import React from 'react'
import { Button, Table, Row, Col, Form } from 'react-bootstrap'
import ContainerCRUD from '../../components/common/ContainerCRUD/ContainerCRUD'
import { withTranslation } from 'react-i18next'
import { contacts } from '../../services'
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
  isNil,
  get,
} from 'lodash/fp'
import AskDelete from '../common/AskDelete/AskDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList,
  faFileExcel,
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons'

import ListDetailsContact from '../DetailsContact/Modal/ListDetailsContact'
import { Link } from 'react-router-dom'
import NoRecords from '../common/NoRecords/NoRecords'
import Pagination from '../common/Pagination/Pagination'
import Search from '../common/Search/Search'
import {
  parseQuery,
  formatDateDMYHHmm,
  getFiltersFromURL,
  setFiltersToURL,
} from '../../utils/forms'
import {
  RECORDS_PER_PAGE,
  MAX_DAYS_ALLOWED_WITH_NUMBERS,
} from '../../constants/application'
import {
  ID_STATUS_AVAILABLE,
  ID_STATUS_BIBLE_STUDY,
  ID_STATUS_RETURN_VISIT,
  ID_STATUS_NO_VISIT,
  ID_STATUS_SEND_TO_OTHER_CONG,
} from '../../constants/status'

import FilterData from '../common/FilterData/FilterData'
import NewContact from './NewContact'
import EditContact from './EditContact'
import SendPhones from './SendPhones/SendPhones'
import BatchChanges from './BatchChanges/BatchChanges'
import { showError } from '../../utils/generic'
import ReactPlaceholder from 'react-placeholder'
import { isPublisher, isAtLeastElder } from '../../utils/loginDataManager'
import { CSVLink } from 'react-csv'
import OurToolTip from '../common/OurToolTip/OurToolTip'
import { Checkbox } from 'pretty-checkbox-react'
import './styles.css'
class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      headers: [],
      dataCVS: [],
      error: false,
      hiddenFilter: false,
      checksContactsPhones: [],
      submitting: false,
      pagination: {},
      statusForbidden: [ID_STATUS_NO_VISIT, ID_STATUS_SEND_TO_OTHER_CONG],
      queryParams: {
        sort: '"idStatus":ASC,"lastConversationInDays":DESC,name:IS NULL DESC,name:ASC',
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: '',
          owner: '',
          phone: '',
          note: '',
          typeCompany: '-1',
          modeAllContacts: props.modeAllContacts ? '-1' : '0',
          genders: [],
          languages: [],
          status: [],
        }),
      },
    }
    this.handleGetAll = this.handleGetAll.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCheckAll = this.handleCheckAll.bind(this)
    this.afterSentPhones = this.afterSentPhones.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.parseDataCVS = this.parseDataCVS.bind(this)
    this.setRowColor = this.setRowColor.bind(this)
    this.setSubRowVisible = this.setSubRowVisible.bind(this)
    this.getInformationAboveName = this.getInformationAboveName.bind(this)
    this.setBackgroundForbidden = this.setBackgroundForbidden.bind(this)
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

      const response = await contacts.getAll(queryParams)
      const error = getOr([], 'data.errors[0]', response)
      if (isEmpty(error)) {
        this.setState({
          data: getOr([], 'data.data.data.data.list', response),
          pagination: getOr({}, 'data.data.data.data.pagination', response),
          submitting: false,
          error: false,
          queryParams,
        })
      } else {
        this.setState({
          error,
          submitting: false,
        })
        showError(error, t, 'contacts')
      }
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
    await contacts
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

  afterSentPhones() {
    this.handleGetAll()
  }

  componentDidMount() {
    if (isPublisher()) {
      const { history } = this.props
      history.push('/')
    } else {
      const filters = getFiltersFromURL(this.props)
      this.handleGetAll({ filters })
    }
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
        locationName: isNil(contact.idLocation)
          ? t('unknownLocation')
          : `${contact.locationName} - ${contact.departmentName}`,
        lastConversationInDays: t(`${contact.lastConversationInDays}`),
        details: contact.information,
      }
    }, checksContactsPhones)
    this.setState({
      dataCVS,
      headers: [
        { label: t('phone'), key: 'phone' },
        { label: t('name'), key: 'name' },
        { label: t('owner'), key: 'owner' },
        { label: t('gender'), key: 'gender' },
        { label: t('typeCompany'), key: 'typeCompany' },
        { label: t('language'), key: 'languageName' },
        { label: t('status'), key: 'statusDescription' },
        { label: t('location'), key: 'locationName' },
        {
          label: t('lastConversationsInDays'),
          key: 'lastConversationInDays',
        },
        { label: t('details'), key: 'details' },
      ],
    })
  }

  setRowColor(idStatus) {
    let color
    switch (idStatus) {
      case ID_STATUS_AVAILABLE:
        color = 'text-success'
        break
      case ID_STATUS_BIBLE_STUDY:
      case ID_STATUS_RETURN_VISIT:
        color = 'bg-warning'
        break
      default:
        color = ''
    }
    return color
  }

  setSubRowVisible(contact) {
    if (
      contact.idStatus === ID_STATUS_SEND_TO_OTHER_CONG ||
      ((contact.idStatus === ID_STATUS_RETURN_VISIT ||
        contact.idStatus === ID_STATUS_BIBLE_STUDY) &&
        !isEmpty(getOr('', 'publisherName', contact)))
    ) {
      return {}
    }
    return { visibility: 'hidden' }
  }

  thisDateAlreadyReachedMaxAllowed = ({
    waitingFeedback,
    lastConversationInDays,
  }) => {
    return (
      waitingFeedback &&
      lastConversationInDays !== '99999999999' &&
      lastConversationInDays > MAX_DAYS_ALLOWED_WITH_NUMBERS
    )
  }

  getStyleForFieldDays(contact) {
    return this.thisDateAlreadyReachedMaxAllowed(contact) ? ' text-danger' : ''
  }

  getTitle(title) {
    const { t } = this.props
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={faGlobeAmericas} /> {t(title)}
      </React.Fragment>
    )
  }

  setBackgroundForbidden(contact) {
    return contains(contact.idStatus, this.state.statusForbidden)
      ? 'bg-danger'
      : ''
  }

  getInformationAboveName(contact) {
    const { t } = this.props
    return (
      <span className="text-light ml-1">
        {this.setBackgroundForbidden(contact) === 'bg-danger'
          ? t('common:updatedByAt', {
              name: contact.publisherNameUpdatedBy,
              date: formatDateDMYHHmm(contact.updatedAt),
            })
          : `${t('lastSpokeToPublisherName')}: ${contact.publisherName}`}
      </span>
    )
  }

  render() {
    const { t, modeAllContacts } = this.props
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
    const colSpan = '10'
    const title = modeAllContacts
      ? this.getTitle('listAllTitle')
      : this.getTitle('listTitle')
    const filters = JSON.parse(get('filters', queryParams))
    return (
      <ContainerCRUD
        color={modeAllContacts ? 'gray-dark' : 'success'}
        title={title}
        {...this.props}
      >
        <Row>
          <Col xs={12} lg={3} xl={2} className={hiddenFilter ? 'd-none' : ''}>
            <FilterData
              filters={filters}
              handleFilters={this.handleGetAll}
              refresh={submitting}
              error={error}
              showTypeCompany={true}
              getFilters={contacts.getAllFilters}
            />
          </Col>
          <Col xs={12} lg={hiddenFilter ? 12 : 9} xl={hiddenFilter ? 12 : 10}>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={['name', 'phone', 'note', 'owner']}
                  colspan={colSpan}
                  toggleFilter={this.toggleFilter}
                />
                <tr>
                  <th style={{ width: '60px' }}>
                    <Checkbox
                      id="checkall"
                      name="all"
                      value="all"
                      onClick={this.handleCheckAll}
                      color="success"
                      className="marginLeftCheckbox"
                      bigger
                      animation="pulse"
                    />
                  </th>
                  <th>{t('phone')}</th>
                  <th className="d-none d-sm-table-cell">{t('name')}</th>
                  <th className="d-none d-lg-table-cell">{t('typeCompany')}</th>
                  <th className="d-none d-lg-table-cell">{t('language')}</th>
                  <th className="d-none d-lg-table-cell">{t('status')}</th>
                  <th
                    style={{ maxWidth: '90px' }}
                    className="d-none d-lg-table-cell text-center"
                  >
                    {t('lastConversationsInDays')}
                  </th>
                  {modeAllContacts && (
                    <th className="d-none d-lg-table-cell">
                      {t('waitingFeedback')}
                    </th>
                  )}
                  <th style={{ minWidth: '116px' }}>{t('details')}</th>
                  <th style={{ minWidth: '189px' }}>
                    <NewContact afterClose={this.handleGetAll} />{' '}
                    <SendPhones
                      checksContactsPhones={checksContactsPhones}
                      contactsData={data}
                      afterClose={this.afterSentPhones}
                    />{' '}
                    {isAtLeastElder() && (
                      <BatchChanges
                        checksContactsPhones={checksContactsPhones}
                        contactsData={data}
                        afterClose={this.handleGetAll}
                      />
                    )}{' '}
                    <CSVLink
                      data={dataCVS}
                      headers={headers}
                      filename={`${t(
                        modeAllContacts ? 'listAllTitle' : 'listTitle'
                      )}.csv`}
                      title={t('titleExportToCVS')}
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
                    (contact) => (
                      <tr
                        key={contact.phone}
                        className={this.setBackgroundForbidden(contact)}
                      >
                        <td style={{ minWidth: '60px' }}>
                          <Checkbox
                            checked={contains(
                              contact.phone,
                              checksContactsPhones
                            )}
                            name="checksContactsPhones"
                            value={contact.phone}
                            color="success"
                            className="marginLeftCheckbox"
                            bigger
                            onChange={this.handleOnClick}
                          />
                        </td>
                        <td>{contact.phone}</td>
                        <td className="d-none d-sm-table-cell verticalBottom">
                          <span>{contact.name}</span>
                          <div style={this.setSubRowVisible(contact)}>
                            <Form.Text
                              className={`text-muted ${this.setRowColor(
                                contact.idStatus
                              )}`}
                            >
                              {this.getInformationAboveName(contact)}
                            </Form.Text>
                          </div>
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(
                            `${
                              contact.typeCompany ? 'commercial' : 'residential'
                            }`
                          )}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          {t(`languages:${contact.languageName}`)}
                        </td>
                        <td
                          className={`d-none d-lg-table-cell ${this.setRowColor(
                            contact.idStatus
                          )}`}
                        >
                          {t(`status:${contact.statusDescription}`)}
                        </td>
                        <td className="d-none d-lg-table-cell">
                          <OurToolTip
                            info={t(contact.lastConversationInDays)}
                            toolTipContent="toolTipWaitingFeedback"
                            showTooltip={this.thisDateAlreadyReachedMaxAllowed(
                              contact
                            )}
                            getStyleForFieldDays={() =>
                              this.getStyleForFieldDays(contact)
                            }
                          />
                        </td>
                        {modeAllContacts && (
                          <td
                            className={`d-none d-lg-table-cell text-${
                              contact.waitingFeedback ? 'danger' : 'success'
                            }`}
                          >
                            {t(
                              `common:${contact.waitingFeedback ? 'yes' : 'no'}`
                            )}
                          </td>
                        )}
                        <td>
                          <ListDetailsContact
                            contact={contact}
                            id={contact.phone}
                            afterClose={() => this.handleGetAll()}
                          />{' '}
                          <Button
                            title={t('common:list')}
                            variant="secondary"
                            as={Link}
                            to={`/contacts/${encodeURI(contact.phone)}/details`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </td>
                        <td>
                          {!modeAllContacts && (
                            <EditContact
                              id={contact.phone}
                              afterClose={() => this.handleGetAll()}
                            />
                          )}{' '}
                          <AskDelete
                            id={contact.phone}
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
                      onClick={this.handleGetAll}
                      submitting={submitting}
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
