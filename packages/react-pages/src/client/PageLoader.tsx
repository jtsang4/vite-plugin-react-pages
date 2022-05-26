import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { dataCacheCtx } from './ssr/ctx'
import { useTheme } from './state'
import useAppState from './useAppState'

const PageLoader = React.memo(() => {
  const Theme = useTheme()
  const { pathname } = useLocation()
  const loadState = useAppState(pathname)
  const dataCache = useContext(dataCacheCtx)

  return (
    <Theme
      loadState={loadState}
      loadedData={dataCache}
    />
  )
})

export default PageLoader
