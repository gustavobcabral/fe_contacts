import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { find } from "lodash/fp";
import "./style-super-select.css";

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
  } = props;

  const [touched, setTouched] = React.useState(false);

  const onBlurLocal = () => {
    setTouched(true);
    //validator.showMessageFor(name);
  };
  return (
    <Form.Group
      className={
        (validated || touched) && rules && !validator.fieldValid(name)
          ? "is-invalid"
          : (validated || touched) &&
            ((rules && validator.fieldValid(name)) || !rules)
          ? "is-valid"
          : ""
      }
    >
      <Form.Label>{label}</Form.Label>
      <Select
        name={name}
        value={
          value &&
          value !== "" &&
          options &&
          find((option) => option.value === value, options)
        }
        options={options}
        isClearable={isClearable || false}
        onBlur={onBlurLocal}
        onChange={(obj) =>
          onChange({ target: { name, value: obj ? obj.value : "" } })
        }
        classNamePrefix="react-select"
      />
      {rules && validator.message(name, value, rules)}
    </Form.Group>
  );
};

export default SuperSelect;
