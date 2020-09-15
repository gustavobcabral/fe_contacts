import React from "react";
import { Jumbotron, Form, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ContainerWithNavBar from "../ContainerWithNavBar/ContainerWithNavBar";
import { setUserSettings } from "../../utils/loginDataManager";
import Select from "react-select";
import { find } from "lodash/fp";

const languagesOptions = (t) => [
  { label: t("languageOptionEnglish"), value: "en-US" },
  { label: t("languageOptionPortuguese"), value: "pt-BR" },
];

const handleInputChange = (value, i18n) => {
  i18n.changeLanguage(value);
  setUserSettings({ language: value });
};

const Languages = (props) => {
  const { t, i18n } = useTranslation("languages");
  const optionsLanguages = languagesOptions(t);
  const valueSelected = find(
    (option) => option.value === i18n.language,
    optionsLanguages
  );
  return (
    <ContainerWithNavBar>
      <Row>
        <Col sm={4}>
          <Jumbotron>
            <h1>{t("title")}</h1>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>{t("optionsLabel")}</Form.Label>
              <Select
                value={valueSelected}
                options={optionsLanguages}
                onChange={({ value }) => handleInputChange(value, i18n)}
              />
            </Form.Group>
          </Jumbotron>
        </Col>
      </Row>
    </ContainerWithNavBar>
  );
};

export default Languages;
