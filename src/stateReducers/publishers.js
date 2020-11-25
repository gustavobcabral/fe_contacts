import { getOr, map } from "lodash/fp";

const reducePublishers = (publishers) =>
  map(
    (publisher) => ({ value: publisher.id, label: publisher.name }),
    getOr([], "data.data", publishers)
  );

export { reducePublishers };
