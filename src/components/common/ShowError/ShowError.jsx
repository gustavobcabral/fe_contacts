import React from "react";
// import { useTranslation } from "react-i18next";

const ShowError = ({ error }) => {
  // const { t } = useTranslation(["common"]);

  return <span className="text-center text-muted">{error}</span>;
};

export default ShowError;
