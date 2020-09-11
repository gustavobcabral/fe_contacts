import { isValidEmail } from '../utils/forms'

export const loginFields = [
  {
    key: 'email_address',
    validators: [
      {
        isValid: value => {
          return Boolean(value) && isValidEmail(value)
        },
        message: 'common.invalidEmail'
      }
    ]
  },
  {
    key: 'password',
    validators: [
      {
        isValid: Boolean,
        message: 'common.requiredField'
      }
    ]
  }
]
