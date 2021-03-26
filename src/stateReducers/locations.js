import { getOr, map } from 'lodash/fp'

const reduceLocations = (locations) =>
  map(
    ({value, label}) => ({
      value,
      label,
    }),
    getOr([], 'data.data', locations)
  )

export { reduceLocations }
