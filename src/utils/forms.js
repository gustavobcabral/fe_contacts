import {
  isEmpty,
  every,
  get,
  pipe,
  flatMap,
  flatten,
  forEach,
  map,
} from "lodash/fp";

export const unformatDate = (date) => {
  const split = date.slice(0, 10).split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
};

export const formatDate = (date) => {
  const split = date.split("/");
  return `${split[2]}-${split[1]}-${split[0]}`;
};

export const patternEmail = `^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$`;

export const isValidEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export function getValidation({ form, fields, submitted }) {
  let state = {};

  pipe(
    forEach((it) => {
      state[it.key] = map(
        (validator) => ({
          isValid: validator.isValid(form[it.key], form),
          message: validator.message,
        }),
        it.validators
      );
    })
  )(fields);

  return {
    state,
    form: {
      submitted,
      isValid: isFormValid(state),
    },
  };
}

export function getValidationClass({ validation }) {
  if (validation && validation.field) {
    const isInvalid = isFieldInvalid({ validation, field: validation.field });
    return get("form.submitted", validation)
      ? {
          "is-invalid": isInvalid,
          "is-valid": !isInvalid,
        }
      : null;
  } else return {};
}

export function isFormValid(state) {
  return pipe(
    flatMap((it) => it),
    flatten,
    every((it) => Boolean(it.isValid))
  )(state);
}

export function isFieldInvalid({ validation, field }) {
  return (
    get("form.submitted", validation) &&
    !validateFieldState({ validation, field })
  );
}

export function validateFieldState({ validation, field, form, optional }) {
  const isSubmitted = get("form.submitted", validation);

  if (!isSubmitted || !mustValidate({ field, optional, form })) {
    return null;
  }
}

export function mustValidate({ field, form, optional }) {
  return !optional || (optional && !isEmpty(get(field, form)))
}