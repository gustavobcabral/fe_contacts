import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../../common/SuperFormControl/SuperFormControl";
import SuperSelect from "../../common/SuperSelect/SuperSelect";
import GenderSelect from "../../common/GenderSelect/GenderSelect";
import StatusSelect from "../../common/StatusSelect/StatusSelect";
import LanguageSelect from "../../common/LanguageSelect/LanguageSelect";
import ReactPlaceholder from "react-placeholder";

const FormDetails = (props) => {
  const { t } = useTranslation(["detailsContacts", "common", "contacts"]);
  const { validator } = props;
  const {
    form,
    loading,
    publishersOptions,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
  } = props;

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="text"
      ready={!loading}
      rows={12}
    >
      <Form>
        <Row className="mb-2">
          <Col xs={6} lg={2}>
            <Form.Group controlId="residential">
              <Form.Check
                type="radio"
                name="typeCompany"
                label={t("contacts:residential")}
                checked={!form.typeCompany || form.typeCompany === "0"}
                value={0}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="commercial">
              <Form.Check
                type="radio"
                name="typeCompany"
                label={t("contacts:commercial")}
                validator={validator}
                checked={form.typeCompany || form.typeCompany === "1"}
                value={1}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <SuperFormControl
              type="text"
              name="name"
              label={t("detailsContacts:name")}
              validator={validator}
              validated={validated}
              value={form.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={6} lg={4}>
            <GenderSelect
              validator={validator}
              validated={validated}
              value={form.gender}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={6} lg={4}>
            <StatusSelect
              name="idStatus"
              label={t("contacts:status")}
              validator={validator}
              validated={validated}
              value={form.idStatus}
              onChange={handleInputChange}
              rules="required"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <LanguageSelect
              validator={validator}
              validated={validated}
              value={form.idLanguage}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} lg={6}>
            <SuperSelect
              name="idPublisher"
              label={t("publisher")}
              validator={validator}
              validated={validated}
              value={form.idPublisher}
              options={publishersOptions}
              onChange={handleInputChange}
              rules="required"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SuperFormControl
              as="textarea"
              name="information"
              rows={3}
              label={t("informationLabel")}
              validator={validator}
              validated={validated}
              placeholder={t("informationPlaceHolder")}
              value={form.information}
              onChange={handleInputChange}
              rules="required|max:250"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              disabled={loading}
              variant="primary"
              onClick={() => handleSubmit(onHide)}
            >
              {t(loading ? "common:btnSubmitting" : "common:btnSubmit")}
            </Button>{" "}
          </Col>
        </Row>
      </Form>
    </ReactPlaceholder>
  );
};

export default FormDetails;
