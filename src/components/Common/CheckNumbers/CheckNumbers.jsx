import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { URL_SEND_MESSAGE } from "../../../constants/settings";

const CheckNumber = (props) => {
  const { t } = useTranslation([
    "publishers",
    "responsibility",
    "detailsContacts",
    "common",
    "contacts",
  ]);

  const textToSend = props.text ? props.text : t("works");

  const check = () =>
    window.open(`${URL_SEND_MESSAGE}?phone=${props.phone}&text=${textToSend}`);

  return (
    <Button variant="success" onClick={() => check()}>
      <FontAwesomeIcon icon={faWhatsapp} />
    </Button>
  );
};

export default CheckNumber;
