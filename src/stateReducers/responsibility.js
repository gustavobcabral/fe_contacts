import { get, map } from 'lodash/fp'

const reduceResponsibility = (t, data) =>
  map(
    (option) => ({
      label: t(get('description', option)),
      value: get('id', option),
    }),
    data
  )

export { reduceResponsibility }

