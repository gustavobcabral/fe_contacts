import SimpleReactValidator from "simple-react-validator";

// Brazilian Portuguesse
SimpleReactValidator.addLocale("en-US", {
  accepted: "This field must be accepted.",
  after: "This field must be after :date.",
  after_or_equal: "This field must be after or on :date.",
  alpha: "This field may only contain letters.",
  alpha_space: "This field may only contain letters and spaces.",
  alpha_num: "This field may only contain letters and numbers.",
  alpha_num_space:
    "This field may only contain letters, numbers, and spaces.",
  alpha_num_dash:
    "This field may only contain letters, numbers, and dashes.",
  alpha_num_dash_space:
    "This field may only contain letters, numbers, dashes, and spaces.",
  array: "This field must be an array.",
  before: "This field must be before :date.",
  before_or_equal: "This field must be before or on :date.",
  between: "This field must be between :min and :max:type.",
  boolean: "This field must be a boolean.",
  card_exp: "This field must be a valid expiration date.",
  card_num: "This field must be a valid credit card number.",
  currency: "This field must be a valid currency.",
  date: "This field must be a date.",
  date_equals: "This field must be on :date.",
  email: "This field must be a valid email address.",
  in: "The selected field must be :values.",
  integer: "This field must be an integer.",
  max: "This field may not be greater than :max:type.",
  min: "This field must be at least :min:type.",
  not_in: "The selected field must not be :values.",
  not_regex: "This field must not match the required pattern.",
  numeric: "This field must be a number.",
  phone: "This field must be a valid phone number.",
  regex: "This field must match the required pattern.",
  required: "This field field is required.",
  size: "This field must be :size:type.",
  string: "This field must be a string.",
  typeof: "This field is not the correct type of :type.",
  url: "This field must be a url.",
});
