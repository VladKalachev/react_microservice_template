import React from 'react'
import { Button, Alert } from 'antd'
import { browserHistory } from '../../redux'

const css = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center'
  }
}

class NoMatch extends React.PureComponent {
  render() {
    const { goBack } = browserHistory

    return (
      <div style={css.wrapper}>
        <div style={css.alert}>
          <Alert
            message="404"
            description={[
              <h4>Запрашиваемая страница не найдена</h4>,
              <Button
                // size="large"
                type="ghost"
                icon="left-circle-o"
                onClick={goBack}
                children="Вернуться"
              />
            ]}
            type="error"
            // showIcon
          />
        </div>
      </div>
    )
  }
}

export default NoMatch
