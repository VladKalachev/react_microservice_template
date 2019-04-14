import moment from 'moment'

export function dataToEntities(primaryKey, values) {
  return values.reduce((acc, current) => {
    acc[current[primaryKey]] = current
    return acc
  }, {})
}

export function formatDate(timestamp) {
  return moment(timestamp).format('DD-MM-YYYY')
}
