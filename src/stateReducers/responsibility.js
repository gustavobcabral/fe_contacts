import { get, map, getOr, pipe, compact } from "lodash/fp";
import { getUserData } from "../utils/loginDataManager";

const reduceResponsibility = (t, justAllowedForMe = false, allResponsibility) => {
  const idResponsibilityCurrentUser = getOr(
    0,
    "idResponsibility",
    getUserData()
  );
  console.log('justAllowedForMe', justAllowedForMe)
  return pipe(
    map((responsibility) => {
      return !justAllowedForMe || responsibility.id <= idResponsibilityCurrentUser
        ? {
            label: t(get("description", responsibility)),
            value: get("id", responsibility),
          }
        : null;
    }),
    compact
  )(getOr([], "data.data", allResponsibility));
};

export { reduceResponsibility };
