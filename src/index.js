import React from 'react'
import ReactDOM from 'react-dom'
import LocalTime from 'local-time'
import './styles/BootswatchYetiCustom.css'
import './styles/index.css'
import './styles/MiscStyles.css'
import './styles/Spacers.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}

LocalTime.start()
