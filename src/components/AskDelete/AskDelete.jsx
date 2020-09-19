import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { contacts } from "../../services";
import Swal from "sweetalert2";
import { getOr, props } from "lodash/fp";

const AskDelete = (props) => {
  const { t } = useTranslation([" "]);

  const askForSureWantDelete = (id) => {
    Swal.fire({
      title: t("common:askDeleteMessage"),
      icon: "question",
      showDenyButton: true,
      confirmButtonText: t("common:yes"),
      denyButtonText: t("common:no"),
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcToCallAfterConfirmation();
      }
    });
  };

  return (
    <Button variant="danger" onClick={() => askForSureWantDelete()}>
      {t("common:delete")}
    </Button>
  );
};

export default AskDelete;
