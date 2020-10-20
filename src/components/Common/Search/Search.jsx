import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { getOr } from "lodash/fp";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const { onFilter, t, name, colspan } = props;

  const sendSearch = (event) => {
    if (event.key === "Enter") {
      const value = getOr("", "target.value", event);
      onFilter({ name: value, phone: value });
    }
  };

  return (
    <>
      <tr>
        <th colSpan={colspan || "6"}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name={name || "search"}
              type="text"
              placeholder={t("placeHolder")}
              onKeyPress={sendSearch}
              onBlur={(e) =>
                onFilter({
                  name: getOr("", "target.value", e),
                  phone: getOr("", "target.value", e),
                })
              }
            />
          </InputGroup>
        </th>
      </tr>
      <tr>
        <th colSpan={colspan || "6"} style={{ border: 0 }}></th>
      </tr>
    </>
  );
};

export default withTranslation(["search"])(Search);
