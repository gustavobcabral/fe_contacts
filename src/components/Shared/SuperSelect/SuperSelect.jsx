import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "./style-super-select.css";

const SuperSelect = (props) => {
  const {
    validator,
    onChange,
    name,
    value,
    options,
    form,
    validated,
    label,
    rules
  } = props;

  const [touched, setTouched] = React.useState(false);

  const onBlurLocal = () => {
    setTouched(true);
    validator.showMessageFor(name);
  };

  return (
    <Form.Group
      className={
        (validated || touched) && !validator.fieldValid(name)
          ? "is-invalid"
          : (validated || touched) && validator.fieldValid(name)
          ? "is-valid"
          : ""
      }
    >
      <Form.Label>{label}</Form.Label>
      <Select
        name={name}
        value={value}
        options={options}
        onBlur={onBlurLocal}
        onChange={({ value }) => onChange({ target: { name, value } })}
        classNamePrefix="react-select"
      />
      {rules && validator.message(name, form[name], rules)}
    </Form.Group>
  );
};

export default SuperSelect;
