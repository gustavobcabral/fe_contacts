import React from "react";
import { Form } from "react-bootstrap";
import { getOr } from "lodash/fp";
import { withTranslation } from "react-i18next";

const Search = (props) => {
  const { onFilter, t } = props;

  const sendSearch = (event) => {
    if (event.key === "Enter") {
      onFilter({ filter: getOr("", "target.value", event) });
    }
  };

  return (
    <tr>
      <th colSpan="6" style={{ border: 0 }}>
        <Form.Control
          name="search"
          type="text"
          placeholder={t("placeHolder")}
          onKeyPress={sendSearch}
          onBlur={(e) => onFilter({ filter: getOr("", "target.value", e) })}
        />
      </th>
    </tr>
  );
};

export default withTranslation(["search"])(Search);
