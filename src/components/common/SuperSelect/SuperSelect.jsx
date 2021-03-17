import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { find } from 'lodash/fp'
import './style-super-select.css'
import ReactPlaceholder from 'react-placeholder'
import { withTranslation } from 'react-i18next'

const SuperSelect = (props) => {
  const {
    validator,
    onChange,
    name,
    value,
    options,
    validated,
    isClearable,
    label,
    rules,
    disabled = false,
    loading = false,
    rows = 2,
    t,
    placeHolderSelect = 'placeHolderSelect'
  } = props

  const [touched, setTouched] = React.useState(false)

  const onBlurLocal = () => {
    setTouched(true)
    //validator.showMessageFor(name);
  }
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="text"
      ready={!loading}
      rows={rows}
    >
      <Form.Group
        controlId={name}
        className={
          (validated || touched) && rules && !validator.fieldValid(name)
            ? 'is-invalid'
            : (validated || touched) &&
              ((rules && validator.fieldValid(name)) || !rules)
            ? 'is-valid'
            : ''
        }
      >
        <Form.Label>{label}</Form.Label>
        <Select
          name={name}
          value={
            value &&
            value !== '' &&
            options &&
            find((option) => option.value === value, options)
          }
          options={options}
          isClearable={isClearable || false}
          placeholder={t(placeHolderSelect)}
          onBlur={onBlurLocal}
          onChange={(obj) =>
            onChange({ target: { name, value: obj ? obj.value : '' } })
          }
          classNamePrefix="react-select"
          isDisabled={disabled}
        />
        {rules && validator.message(name, value, rules)}
      </Form.Group>
    </ReactPlaceholder>
  )
}

export default withTranslation(['common'])(SuperSelect)
