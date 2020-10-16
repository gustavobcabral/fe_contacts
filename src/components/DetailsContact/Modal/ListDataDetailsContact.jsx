import React from 'react'
import { withTranslation } from 'react-i18next'
import { Table } from 'react-bootstrap'
import { map } from 'lodash/fp'
import moment from 'moment'
import NewDetailsContact from './NewDetailsContact'
import EditDetailsContact from './EditDetailsContact'
import AskDelete from '../../Common/AskDelete/AskDelete'

class ListDataDetailsContact extends React.Component {
  render() {
    const {
      t,
      contact,
      data,
      afterClose,
      funcToCallAfterConfirmation,
    } = this.props
     return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>{t('publisher')}</th>
            <th>{t('date')}</th>
            <th>{t('information')}</th>
            <th>
              <NewDetailsContact
                afterClose={afterClose}
                contact={contact}
                phone={contact.phone}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {map(
            (detail) => (
              <tr key={detail.id}>
                <td>{detail.publisherName}</td>
                <td>{moment(detail.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                <td>{detail.information}</td>
                <td style={{ width: '114px' }}>
                  <EditDetailsContact
                    data={detail}
                    contact={contact}
                    id={detail.id}
                    afterClose={afterClose}
                  />{' '}
                  <AskDelete
                    id={detail.id}
                    funcToCallAfterConfirmation={funcToCallAfterConfirmation}
                  />
                </td>
              </tr>
            ),
            data
          )}
        </tbody>
      </Table>
    )
  }
}

export default withTranslation(['detailsContacts', 'common'])(
  ListDataDetailsContact
)
