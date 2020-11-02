import React from 'react'
import SuperSelect from '../SuperSelect/SuperSelect'
import { withTranslation } from 'react-i18next'
import { responsibility } from '../../../services'
import { getOr, pipe, curry } from 'lodash/fp'
import { reduceResponsibility } from '../../../stateReducers/responsibility'

class ResponsibilitySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = { responsibilityOptions: [], submitting: false }
    this.handleGetAll = this.handleGetAll.bind(this)
  }

  async handleGetAll() {
    this.setState({ submitting: true })
    const { t } = this.props
    const responsibilityOptions = pipe(
      getOr([], 'data.data'),
      curry(reduceResponsibility)(t)
    )(await responsibility.get())
    this.setState({ responsibilityOptions, submitting: false })
  }

  componentDidMount() {
    this.handleGetAll()
  }

  render() {
    const {
      value,
      onChange,
      validated,
      name,
      validator,
      t,
      label,
      rules,
    } = this.props
    const { responsibilityOptions } = this.state

    return (
      <SuperSelect
        name={name || 'idResponsibility'}
        label={label || t('responsibility')}
        isClearable={true}
        validator={validator}
        validated={validated}
        value={value}
        options={responsibilityOptions}
        onChange={onChange}
        rules={rules}
      />
    )
  }
}

export default withTranslation(['responsibility', 'common'])(
  ResponsibilitySelect
)
