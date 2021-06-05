import { getOr, omit, trim, isString } from 'lodash/fp'
import GqlBuilder from 'graphql-query-builder-v2'

export const unformatDate = (date) => {
  const split = date.slice(0, 10).split('-')
  return `${split[2]}/${split[1]}/${split[0]}`
}

export const formatDate = (date) => {
  const split = date.split('/')
  return `${split[2]}-${split[1]}-${split[0]}`
}

export const getLocale = (props) => props.i18n.language

export const handleInputChangeGeneric = (event, componentReact) => {
  const {
    target: { name, value },
  } = event
  const { form } = componentReact.state
  const valueTrim = isString(value) ? trim(value) : value
  componentReact.setState({
    form: {
      ...form,
      [name]: valueTrim,
    },
  })
}

export const parseQuery = (objQuery, state) => {
  return {
    ...getOr({}, 'queryParams', state),
    ...omit(['filters'], objQuery),
    ...appendFilters(objQuery, state),
  }
}

export const appendFilters = (filters, state) => {
  const newPreFilters = {
    ...JSON.parse(getOr('{}', 'queryParams.filters', state)),
    ...getOr({}, 'filters', filters),
  }

  return {
    filters: JSON.stringify(newPreFilters),
  }
}

export const objectFlip = (obj) =>
  Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key
    return ret
  }, {})

export const toQueryString = (paramsObject) =>
  '?' +
  Object.keys(paramsObject)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
    )
    .join('&')

export const buildGql = (type, { name, find, filter, variables = null }) => {
  const query = new GqlBuilder(name, variables)

  if (filter) {
    query.filter(filter)
  }

  if (find) {
    query.find(find)
  }

  return type === 'mutation'
    ? `
        ${type} {${query.toString()}}
      `.trim()
    : `
      ?${type}={${query.toString()}}
    `.trim()
}
