import React from 'react'
import { Button, Table, Row, Col, Form } from 'react-bootstrap'
import ContainerCRUD from '../../components/common/ContainerCRUD/ContainerCRUD'
import { withTranslation } from 'react-i18next'
import { contacts } from '../../services'
import Swal from 'sweetalert2'
import { map, getOr, isEmpty, pipe, uniq, compact, remove } from 'lodash/fp'
import AskDelete from '../common/AskDelete/AskDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import ListDetailsContact from '../DetailsContact/Modal/ListDetailsContact'
import { Link } from 'react-router-dom'
import NoRecords from '../common/NoRecords/NoRecords'
import Pagination from '../common/Pagination/Pagination'
import Search from '../common/Search/Search'
import { parseQuery } from '../../utils/forms'
import { RECORDS_PER_PAGE } from '../../constants/application'
import FilterData from '../common/FilterData/FilterData'
import NewContact from './NewContact'
import EditContact from './EditContact'
import OurModal from '../common/OurModal/OurModal'

class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnClick = this.handleOnClick.bind(this)
    this.state = {
      data: [],
      checksContactsPhones: [],
      submitting: false,
      pagination: {},
      queryParams: {
        sort: 'name:ASC',
        perPage: RECORDS_PER_PAGE,
        currentPage: 1,
        filters: JSON.stringify({
          name: '',
          phone: '',
          genders: [],
          languages: [],
          status: [],
        }),
      },
    }
    this.handleGetAll = this.handleGetAll.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleGetAll(objQuery) {
    this.setState({ submitting: true })
    const queryParams = parseQuery(objQuery, this.state)
    const response = await contacts.getAll(queryParams)
    this.setState({
      data: getOr([], 'data.data.list', response),
      phone: getOr([], 'data.data.list.phone', response),
      pagination: getOr({}, 'data.data.pagination', response),
      submitting: false,
      queryParams,
    })
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
        Swal.fire({
          icon: 'error',
          title: t(
            `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
          ),
          text: t(
            `common:${getOr(
              'errorWithoutDetails',
              'response.data.error.code',
              error
            )}`
          ),
        })
      })
  }
  handleOnClick(event) {
    const {
      target: { name, value, checked },
    } = event
    const newValues = checked
      ? pipe(uniq, compact)([...this.state.checksContactsPhones, value])
      : remove((arrayValue) => arrayValue === value, this.state[name])

    this.setState({ checksContactsPhones: newValues })
    return ''
  }

  componentDidMount() {
    this.handleGetAll()
  }

  render() {
    const { t } = this.props
    const { data, pagination, submitting, checksContactsPhones } = this.state
    console.log(checksContactsPhones, "MARCADO")
    return (
      <ContainerCRUD title={t('title')} {...this.props}>
        <Row>
          <Col xs={12} lg={2}>
            <FilterData
              handleFilters={this.handleGetAll}
              refresh={submitting}
              getFilters={contacts.getAllFilters}
            />
          </Col>
          <Col xs={12} lg={10}>
            <Table striped bordered hover responsive>
              <thead>
                <Search
                  onFilter={this.handleGetAll}
                  fields={['name', 'phone']}
                />
                <tr>
                  <th colSpan="2">{t('name')}</th>
                  <th>{t('phone')}</th>
                  <th>{t('gender')}</th>
                  <th>{t('language')}</th>
                  <th>{t('status')}</th>
                  <th>{t('details')}</th>
                  <th>
                    <NewContact afterClose={() => this.handleGetAll()} />{' '}
                    <Button
                      variant="warning"
                      disabled={!checksContactsPhones.length > 0}
                      onClick={
                        <OurModal
                        //body={FormContacts}
                        // validator={this.validator}
                        // validated={validated}
                        //handleSubmit={this.handleSubmit}
                        //handleInputChange={this.handleInputChange}
                        // form={form}
                        //onEnter={this.handleGetOne}
                        //onExit={afterClose}
                        //publishersOptions={publishersOptions}
                        // statusOptions={statusOptions}
                        // title={`${t('common:edit')} ${t('titleCrud')}`}
                        //buttonText={<FontAwesomeIcon icon={faEdit} />}
                        // buttonVariant="success"
                        />
                      }
                    >
                      <FontAwesomeIcon icon={faShareAlt} />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(data) ? (
                  map(
                    (contact) => (
                      <tr key={contact.phone}>
                        <td>
                          <Form.Check
                            //key={data.gender}
                            type="checkbox"
                            name="checksContactsPhones"
                            // label={t(`contacts:${data.gender}`)}
                            value={contact.phone}
                            onClick={this.handleOnClick}
                            //enableButton={checked.length>0}
                          />
                        </td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{t(`contacts:${contact.gender}`)}</td>
                        <td>{t(`languages:${contact.languageName}`)}</td>
                        <td>{t(`status:${contact.statusDescription}`)}</td>
                        <td>
                          <ListDetailsContact
                            contact={contact}
                            id={contact.phone}
                            afterClose={() => this.handleGetAll()}
                          />{' '}
                          <Button
                            variant="success"
                            as={Link}
                            to={`/contacts/${encodeURI(contact.phone)}/details`}
                          >
                            <FontAwesomeIcon icon={faList} />
                          </Button>
                        </td>
                        <td>
                          <EditContact
                            id={contact.phone}
                            afterClose={() => this.handleGetAll()}
                          />{' '}
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
                  <NoRecords cols="6" />
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" style={{ border: 0 }}>
                    <Pagination
                      pagination={pagination}
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
