import React from 'react'
import KeyValueTable from './KeyValueTable'

function PreviewCard({ selected, entities, alias, ...rest }) {
  const record = entities[selected]

  const getData = () => {
    switch (alias) {
      case 'tasks':
        return Object.keys(entities[selected])
          .filter(key => key[0] !== '_')
          .map(field => ({
            name: field,
            value: entities[selected][field]
          }))
      case 'cases':
        return [
          {
            name: 'Вид работ:',
            value: record._caseSchemeTitle
          },
          {
            name: 'Название:',
            value: record.objectTitle
          },
          {
            name: 'Адрес:',
            value: record.objectAddress
          },
          {
            name: 'Заказчик:',
            value: record.client
          }
        ]
      default:
        return <div />
    }
  }

  return (
    <KeyValueTable
      data={getData()}
    />
  )
}

export default PreviewCard
