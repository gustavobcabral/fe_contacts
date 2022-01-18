import React, { Suspense, useState } from 'react'
import Routes from './routes/routes'
import Loading from './components/common/Loading/Loading'
import { ApplicationContext } from './contexts/application'
import { buildContextData } from './utils/loginDataManager'

const App = () => {
  const initialData = buildContextData()
  const [context, setContext] = useState(initialData)
  const initContext = { ...context, updateContext: setContext }

  return (
    <Suspense fallback={<Loading />}>
      <ApplicationContext.Provider value={initContext}>
        <Routes />
      </ApplicationContext.Provider>
    </Suspense>
  )
}

export default App
