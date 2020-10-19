import React, { useState } from "react";
import { Jumbotron, Form, Col, Row, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setUserSettings } from "../../utils/loginDataManager";
import Select from "react-select";
import { find } from "lodash/fp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const languagesOptions = (t) => [
  { label: t("languageOptionEnglish"), value: "en-US" },
  { label: t("languageOptionPortuguese"), value: "pt-BR" },
];

const handleInputChange = (value, i18n) => {
  i18n.changeLanguage(value);
  setUserSettings({ language: value });
};

const ModalLanguages = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.t("title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center">
          <Col>
            <Jumbotron>
              <Form.Group>
                <Form.Label>{props.t("optionsLabel")}</Form.Label>
                <Select
                  value={props.valueSelected}
                  options={props.optionsLanguages}
                  onChange={({ value }) => handleInputChange(value, props.i18n)}
                />
              </Form.Group>
            </Jumbotron>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const SystemLanguages = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t, i18n } = useTranslation("languages");
  const optionsLanguages = languagesOptions(t);
  const valueSelected = find(
    (option) => option.value === i18n.language,
    optionsLanguages
  );
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)} style={{width: '50px'}}>
        <FontAwesomeIcon icon={faLanguage} />
      </Button>

      <ModalLanguages
        {...props}
        valueSelected={valueSelected}
        optionsLanguages={optionsLanguages}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
        i18n={i18n}
      />
    </>
  );
};

export default SystemLanguages;
