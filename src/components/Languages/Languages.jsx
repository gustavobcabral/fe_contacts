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
      <Row className="justify-content-md-center">
        <Col xs={12} xl={3}>
          <Jumbotron>
            <div className="h2 text-center mb-4">{t("title")}</div>
            <Form.Group>
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
