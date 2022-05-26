import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { usePagePaths } from './state'
import PageLoader from './PageLoader'

const App = () => {
  const pageRoutes = usePagePaths()
    .filter((path) => path !== '/404')
    .sort((pathA, pathB) => {
      // path with params should be put afront
      if (pathA.includes('/:')) return 1
      if (pathB.includes('/:')) return -1
      return 0
    })
    .map((path) => (
      // avoid re-mount layout component
      // https://github.com/ReactTraining/react-router/issues/3928#issuecomment-284152397
      <Route key="same" path={path} element={<PageLoader />} />
    ))

  return (
    <Routes>
      {pageRoutes}
      <Route
        key="same"
        path="*"
        element={<PageLoader />}
      />
    </Routes>
  )
}

export default App
