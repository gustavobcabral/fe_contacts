import React from "react";
import { Jumbotron, Form, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { map } from "lodash/fp";
import ContainerWithNavBar from "../ContainerWithNavBar/ContainerWithNavBar";
import { setUserSettings } from "../../utils/loginDataManager";

const languagesOptions = [
  { label: "languageOptionEnglish", value: "en-US" },
  { label: "languageOptionPortuguese", value: "pt-BR" },
];

const handleInputChange = (event, i18n) => {
  const { target } = event;
  const value = target.value;
  i18n.changeLanguage(value);
  setUserSettings({ language: value });
};

const Languages = (props) => {
  const { t, i18n } = useTranslation("languages");
  return (
    <ContainerWithNavBar>
      <Row>
        <Col sm={4}>
          <Jumbotron>
            <h1>{t("title")}</h1>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>{t("optionsLabel")}</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleInputChange(e, i18n)}
                defaultValue={i18n.language}
              >
                {map(
                  (language) => (
                    <option key={language.value} value={language.value}>
                      {t(language.label)}
                    </option>
                  ),
                  languagesOptions
                )}
              </Form.Control>
            </Form.Group>
          </Jumbotron>
        </Col>
      </Row>
    </ContainerWithNavBar>
  );
};

export default Languages;
