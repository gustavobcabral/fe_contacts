import React from "react";
import { Form } from "react-bootstrap";
import { getOr } from "lodash/fp";
import { withTranslation } from "react-i18next";

const Search = (props) => {
  const { onFilter, t, name } = props;

  const sendSearch = (event) => {
    if (event.key === "Enter") {
      const value = getOr("", "target.value", event);
      onFilter({ filters: JSON.stringify({ name: value, phone: value }) });
    }
  };

  return (
    <tr>
      <th colSpan="6" style={{ border: 0 }}>
        <Form.Control
          name={name || "search"}
          type="text"
          placeholder={t("placeHolder")}
          onKeyPress={sendSearch}
          onBlur={(e) =>
            onFilter({
              filters: JSON.stringify({
                name: getOr("", "target.value", e),
                phone: getOr("", "target.value", e),
              }),
            })
          }
        />
      </th>
    </tr>
  );
};

export default withTranslation(["search"])(Search);
