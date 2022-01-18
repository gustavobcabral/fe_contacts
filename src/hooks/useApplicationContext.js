import { useContext, useEffect } from 'react'

import { ApplicationContext } from '../contexts/application'

export default function useApplicationContext(initialProps) {
  const context = useContext(ApplicationContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => context.updateContext(previous => ({ ...previous, ...initialProps })), []);

  return context
}
