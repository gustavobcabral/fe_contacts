import React from "react";
import { Jumbotron, Form, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { get, map, find, pipe } from "lodash/fp";
import ContainerWithNavBar from "../ContainerWithNavBar/ContainerWithNavBar";
import { setUserSettings } from "../../utils/loginDataManager";

const languagesEnglish = [
  { label: "English", value: "en-US" },
  { label: "Portuguese", value: "pt-BR" },
];

const languagesPortuguese = [
  { label: "Inglês", value: "en-US" },
  { label: "Português", value: "pt-BR" },
];

const languagesOptions = [
  { cod: "en-US", options: languagesEnglish },
  { cod: "pt-BR", options: languagesPortuguese },
];

const handleInputChange = (event, i18n) => {
  const { target } = event;
  const value = target.value;
  i18n.changeLanguage(value);
  setUserSettings({ language: value });
};

const Languages = (props) => {
  const { t, i18n } = useTranslation(["languages"]);
  const currentLanguage = pipe(
    find((option) => option.cod === i18n.language),
    get("options")
  )(languagesOptions);
  return (
    <ContainerWithNavBar>
      <Col sm={4}>
        <Jumbotron>
          <h1>{t("title")}</h1>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>{t("optionsLabel")}</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleInputChange(e, i18n)}
            >
              {map(
                (language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ),
                currentLanguage
              )}
            </Form.Control>
          </Form.Group>
        </Jumbotron>
      </Col>
    </ContainerWithNavBar>
  );
};

export default Languages;
