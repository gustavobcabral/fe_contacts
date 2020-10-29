import { get, getOr, map } from 'lodash/fp'

const reduceResponsibility = (t, data) =>
  map(
    (option) => ({
      label: t(get('description', option)),
      value: get('id', option),
    }),
    data
  )

// const reduceResponsibility = (responsibility) =>
// map(
//   (responsibility) => ({
//     label: responsibility.description,
//     value: responsibility.id,
//   }),
//   getOr([], 'data.data', responsibility)
// )

// const reduceStatus = (t, data) =>
//   map(
//     (option) => ({
//       label: t(get("description", option)),
//       value: get("id", option),
//     }),
//     data
//   );


export { reduceResponsibility }

