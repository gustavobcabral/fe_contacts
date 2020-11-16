import { get } from "lodash/fp";
import moment from "moment";

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

export { randomColor, parseErrorMessage, formatDate };
