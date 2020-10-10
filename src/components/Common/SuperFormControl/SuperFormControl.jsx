import React from "react";
import { Form } from "react-bootstrap";

const SuperFormControl = (props) => {
  const {
    validator,
    onChange,
    name,
    value,
    validated,
    label,
    as,
    rows,
    placeholder,
    onBlur,
    type,
    rules,
    autocomplete
  } = props;

  const [touched, setTouched] = React.useState(false);

  const onBlurLocal = (e) => {
    setTouched(true);
    //validator.showMessageFor(name);
    if (typeof onBlur === "function") {
      onBlur(e);
    }
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        rows={rows}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onChange={onChange}
        onBlur={onBlurLocal}
        value={value}
        className={
          (validated || touched) && !validator.fieldValid(name)
            ? "is-invalid"
            : (validated || touched) && validator.fieldValid(name)
            ? "is-valid"
            : ""
        }
      />
      {rules && validator.message(name, value, rules)}
    </Form.Group>
  );
};

export default SuperFormControl;
