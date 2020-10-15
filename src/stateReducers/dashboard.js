import { getOr } from "lodash/fp";

const generateLabel = (t, data, field) =>
  `${getOr(0, "percent", data)}% ${t(
    "languages:" + getOr("noName", field, data)
  )}`;

export { generateLabel };
