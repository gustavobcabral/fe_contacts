import { get, getOr, isEmpty } from "lodash/fp";
import moment from "moment";
import Swal from "sweetalert2";

const formatDate = (date) =>
  date ? moment(date).format("DD/MM/YYYY HH:mm") : null;

const randomColor = () =>
  `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

const parseErrorMessage = (error) => {
  const message = get("message", error);
  const errorConstraint = get("response.data.error.constraint", error);
  const errorCode = get("response.data.error.code", error);
  const errorMessage = get("response.data.error", error);
  return errorConstraint
    ? errorConstraint
    : errorCode
    ? errorCode
    : errorMessage
    ? errorMessage
    : message
    ? message
    : "errorTextUndefined";
};

const showError = (error, t, fileTranslationName) => {
  Swal.fire({
    icon: "error",
    title: t(
      `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
    ),
    text: t(
      `${fileTranslationName}:${parseErrorMessage(error)}`,
      t(`common:${parseErrorMessage(error)}`)
    ),
  });
};

const showSuccessful = (t) => {
  Swal.fire({
    title: t("common:dataSuccessfullySaved"),
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
  });
};

const ifEmptySetNull = (value) => (isEmpty(value) ? null : value);

export {
  randomColor,
  parseErrorMessage,
  formatDate,
  showError,
  showSuccessful,
  ifEmptySetNull
};
