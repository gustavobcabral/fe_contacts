import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { getOr, reduce } from "lodash/fp";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const { onFilter, t, name, colspan, fields } = props;

  const sendSearch = (event) => {
    if (event.key === "Enter") {
      toSearch(event);
    }
  };

  const toSearch = (event) => {
    const value = getOr("", "target.value", event);
    const newValues = reduce(
      (result, current) => ({ ...result, [current]: value }),
      {},
      fields
    );
    onFilter(newValues);
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
              onBlur={toSearch}
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
