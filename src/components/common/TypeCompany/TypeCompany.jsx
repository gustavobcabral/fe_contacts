import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { useTranslation } from "react-i18next";

const TypeCompany = (props) => {
  const { t } = useTranslation(["contacts", "common"]);

  const { validator } = props;
  const { value, onChange, validated } = props;

  const TypeCompanyOptions = [
    { label: t("residencia"), value: false },
    { label: t("company"), value: true },
  ];

  return (
    <SuperSelect
      name="TypeCompany"
      label={t("TypeCompany")}
      isClearable={true}
      validator={validator}
      validated={validated}
      value={value}
      options={TypeCompanyOptions}
      onChange={onChange}
    />
    
  );
};

export default TypeCompany;
