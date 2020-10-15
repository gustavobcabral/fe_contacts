import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { useTranslation } from "react-i18next";

const GenderSelect = (props) => {
  const { t } = useTranslation(["contacts"]);

  const { validator } = props;
  const { value, onChange, validated } = props;

  const genderOptions = [
    { label: t("male"), value: "male" },
    { label: t("female"), value: "female" },
  ];

  return (
    <SuperSelect
      name="gender"
      label={t("gender")}
      isClearable={true}
      validator={validator}
      validated={validated}
      value={value}
      options={genderOptions}
      onChange={onChange}
    />
  );
};

export default GenderSelect;
