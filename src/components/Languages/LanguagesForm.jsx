import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SuperFormControl from "../common/SuperFormControl/SuperFormControl";

const LanguagesForm = (props) => {
  const { t } = useTranslation(["languages", "common"]);
  const {
    validator,
    handleInputChange,
    form,
    submitting,
    validated,
    onHide,
    handleSubmit,
  } = props;
console.log(form, "FORM PROPS MODAL")
  return (
    <Form>
      <SuperFormControl
        type="text"
        name="name"
        label={t("nameLabel")}
        validator={validator}
        validated={validated}
        placeholder={t("namePlaceHolder")}
        value={form.name}
        onChange={handleInputChange}
        rules="required|max:25"
      />
      <Button
        disabled={submitting}
        variant="primary"
        type="button"
        onClick={() => handleSubmit(onHide)}
      >
        {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")}
      </Button>
    </Form>
  );
};

export default LanguagesForm;
