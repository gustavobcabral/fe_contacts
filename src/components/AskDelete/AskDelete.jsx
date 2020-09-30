import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AskDelete = (props) => {
  const { t } = useTranslation(["common"]);

  const askForSureWantDelete = () => {
    Swal.fire({
      title: t("askDeleteMessage"),
      icon: "question",
      showDenyButton: true,
      confirmButtonText: t("yes"),
      denyButtonText: t("no"),
    }).then((result) => {
      if (result.isConfirmed) {
        props.funcToCallAfterConfirmation(t, props.id);
      }
    });
  };

  return (
    <Button variant="danger" onClick={() => askForSureWantDelete()}>
       <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default AskDelete;