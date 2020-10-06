import { getOr } from "lodash/fp";

const generateLabel = (t, data, field) =>
  `${getOr(0, "percent", data)}% ${getOr(t("noName"), field, data).slice(
    0,
    10
  )}`;

export { generateLabel };
