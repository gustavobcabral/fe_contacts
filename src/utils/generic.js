import { get } from "lodash/fp";

const randomColor = () =>
  `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

const parseErrorMessage = (error) => {
  const message = get("message", error);
  const errorMessage = get("response.data.error", error);
  return errorMessage ? errorMessage : message ? message : "errorTextUndefined";
};

export { randomColor, parseErrorMessage };
