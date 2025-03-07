import React, { useEffect } from 'react'
import type { ThemeProps } from '@jtsang/vite-plugin-react-pages/clientTypes'
import { useStaticData } from '@jtsang/vite-plugin-react-pages/client'
import { useLocation } from 'react-router-dom'

import AppLayout, { MDX } from './Layout'
import { themeConfigCtx, themePropsCtx } from './ctx'

import './style.less'
import { Demo } from './Layout/Demo'
import AnchorLink from './components/AnchorLink'
import type { ThemeConfig } from './ThemeConfig.doc'

export function createTheme(themeConfig: ThemeConfig) {
  const ThemeComp = (props: ThemeProps) => {
    const { loadState, loadedData } = props
    const staticData = useStaticData()
    // console.log('theme', loadState, loadedData, staticData)

    const location = useLocation()
    useEffect(() => {
      // scroll to anchor after page component loaded
      if (loadState.type === 'loaded') {
        if (location.hash) {
          AnchorLink.scrollToAnchor(decodeURIComponent(location.hash.slice(1)))
        }
      }
    }, [loadState, loadedData])

    if (loadState.type === 'loading') {
      return <AppLayout></AppLayout>
    }

    if (loadState.type === 'load-error') {
      const errMsg = loadState.error?.message
      return (
        <AppLayout>
          <h1>Load Error</h1>
          {errMsg && <p>{errMsg}</p>}
        </AppLayout>
      )
    }

    const pageData = loadedData[loadState.routePath]

    if (loadState.type === '404' || !pageData) {
      const Comp404 = themeConfig.Component404
      return (
        <AppLayout>{Comp404 ? <Comp404 /> : <p>Page not found.</p>}</AppLayout>
      )
    }

    const pageStaticData = staticData[loadState.routePath]
    let body = Object.entries(pageData).map(([key, dataPart], idx) => {
      const ContentComp = (dataPart as any).default
      const pageStaticDataPart = pageStaticData?.[key]
      const content = (() => {
        if (pageStaticDataPart?.sourceType === 'md')
          return (
            <MDX>
              <ContentComp />
            </MDX>
          )
        if (dataPart?.isDemo)
          return <Demo style={{ margin: '16px 45px' }} {...dataPart} />
        return <ContentComp />
      })()
      return <React.Fragment key={key}>{content}</React.Fragment>
    })

    return <AppLayout>{body}</AppLayout>
  }

  return withThemeProvider(ThemeComp)

  function withThemeProvider(Component: React.FC<ThemeProps>) {
    const HOC: React.FC<ThemeProps> = (props) => {
      return (
        <themeConfigCtx.Provider value={themeConfig}>
          <themePropsCtx.Provider value={props}>
            <Component {...props} />
          </themePropsCtx.Provider>
        </themeConfigCtx.Provider>
      )
    }
    return HOC
  }
}

export { defaultSideNavs } from './Layout/Sider'
export type { DefaultSideNavsOpts } from './Layout/Sider'

export { Demo } from './Layout/Demo'
export { TsInfo } from './Layout/TsInfo'
export { FileText } from './Layout/FileText'
export * from './ThemeConfig.doc'
