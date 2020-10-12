import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../../Common/SuperFormControl/SuperFormControl";
import SuperSelect from "../../Common/SuperSelect/SuperSelect";

const FormDetails = (props) => {
  const { t } = useTranslation(["detailsContacts","common"]);
  const { validator } = props;
  const {
    form,
    submitting,
    publishersOptions,
    statusOptions,
    handleSubmit,
    onHide,
    handleInputChange,
    validated,
  } = props;

  return (
    <Form>
      <SuperSelect
        name="idPublisher"
        label="Publisher"
        validator={validator}
        validated={validated}
        value={form.idPublisher}
        options={publishersOptions}
        onChange={handleInputChange}
        rules="required"
      />
      <SuperSelect
        name="idStatus"
        label="Status"
        validator={validator}
        validated={validated}
        value={form.idStatus}
        options={statusOptions}
        onChange={handleInputChange}
        rules="required"
      />
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
      <Button
        disabled={submitting}
        variant="primary"
        onClick={() => handleSubmit(onHide)}
      >
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>{" "}
    </Form>
  );
};

export default FormDetails;
