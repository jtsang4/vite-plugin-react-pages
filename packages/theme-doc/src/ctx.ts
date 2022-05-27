import { createContext } from 'react'
import { ThemeConfig } from '.'
import type { ThemeProps } from '@jtsang/vite-plugin-react-pages/clientTypes'

export const themeConfigCtx = createContext<ThemeConfig>({})
export const themePropsCtx = createContext<ThemeProps>({
  loadState: { type: 'loading', routePath: '/' },
  loadedData: {},
})
