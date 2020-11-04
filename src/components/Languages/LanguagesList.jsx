import React from 'react'
import { Table } from 'react-bootstrap'
import ContainerCRUD from '../../components/common/ContainerCRUD/ContainerCRUD'
import { withTranslation } from 'react-i18next'
import { languages } from '../../services'
import Swal from 'sweetalert2'
import { getOr, map, isEmpty } from 'lodash/fp'
import AskDelete from '../common/AskDelete/AskDelete'
// import StatusEdit from "./StatusEdit";
import LanguagesNew from "./LanguagesNew";
import NoRecords from '../common/NoRecords/NoRecords'
import { parseErrorMessage } from '../../utils/generic'

class LanguagesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], submitting: false }
    this.handleGetAll = this.handleGetAll.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleGetAll() {
    try {
      const response = await languages.getAll('')
      this.setState({ data: response.data.data })
    } catch (error) {
      const { t } = this.props
      Swal.fire({
        icon: 'error',
        title: t(`common:${parseErrorMessage(error)}`),
      })
    }
  }

  async handleDelete(id) {
    const { t } = this.props
    this.setState({ submitting: true })
    await languages
      .dellOne(id)
      .then(() => {
        this.handleGetAll()
        this.setState({ submitting: false })
      })
      .catch((error) => {
        this.setState({ submitting: false })
        Swal.fire({
          icon: 'error',
          title: t(
            `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
          ),
          text: t(
            `${getOr('errorTextUndefined', 'response.data.error', error)}`
          ),
        })
      })
  }

  async componentDidMount() {
    this.handleGetAll()
  }

  render() {
    const { t } = this.props
    const { data } = this.state
    console.log(data, 'MERDATA')
    return (
      <ContainerCRUD title={t('titleCrud')} {...this.props}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{t('descriptionLabel')}</th>
              <th>{t('descriptionTraducedLabel')}</th>
              <th><LanguagesNew afterClose={this.handleGetAll} /></th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(data) ? (
              map(
                (languages) => (
                  <tr key={languages.id}>
                    <td>{languages.name}</td>
                    <td>{t(languages.name)}</td>
                    <td>
                      {/* <LanguagesEdit
                        data={status}
                        afterClose={this.handleGetAll}
                      />{" "} */}
                      <AskDelete
                        id={languages.id}
                        funcToCallAfterConfirmation={this.handleDelete}
                      />
                    </td>
                  </tr>
                ),
                data
              )
            ) : (
              <NoRecords cols={3} />
            )}
          </tbody>
        </Table>
      </ContainerCRUD>
    )
  }
}
export default withTranslation(['languages', 'common'])(LanguagesList)