import { getOr } from "lodash/fp";

const randomColor = () =>
  `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

const parseErrorMessage = (error) => {
  const message = getOr("errorTextUndefined", "message", error);
  return message
};

export { randomColor, parseErrorMessage };
