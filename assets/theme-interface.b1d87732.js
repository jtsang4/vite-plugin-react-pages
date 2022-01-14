var y=Object.defineProperty,g=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;var l=(e,a,t)=>a in e?y(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,n=(e,a)=>{for(var t in a||(a={}))i.call(a,t)&&l(e,t,a[t]);if(r)for(var t of r(a))s.call(a,t)&&l(e,t,a[t]);return e},p=(e,a)=>g(e,m(a));var c=(e,a)=>{var t={};for(var o in e)i.call(e,o)&&a.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&r)for(var o of r(e))a.indexOf(o)<0&&s.call(e,o)&&(t[o]=e[o]);return t};import{c as d}from"./clientRender.1634fafe.js";const h={},u="wrapper";function f(t){var o=t,{components:e}=o,a=c(o,["components"]);return d(u,p(n(n({},h),a),{components:e,mdxType:"MDXLayout"}),d("pre",null,d("code",{parentName:"pre",className:"language-ts"},`/** The type of a theme. */
export type Theme = React.ComponentType<ThemeProps>

export interface ThemeProps {
  readonly loadedData: PagesLoaded
  readonly loadState: LoadState
}

/**
 * A react hook to get static data.
 * import { useStaticData } from 'vite-plugin-react-pages/client'
 */
export interface UseStaticData {
  (): PagesStaticData
  (path: string): Record<string, any>
}

/**
 * All pages' static data.
 */
export interface PagesStaticData {
  /**
   * For each page, its static data is indexed by keys.
   */
  readonly [routePath: string]: Record<string, any>
}

/**
 * All runtime data that is already loaded.
 */
export interface PagesLoaded {
  readonly [routePath: string]: PageLoaded
}

/**
 * For each page, its runtime data can be composed of multile modules.
 * These modules are indexed by keys.
 *
 * Normally, a page only contains one module, with the key being \`main\`.
 * And the default export of the main module is a React component,
 * which will render the page. In that case, \`pageLoaded.main.default\` is the component.
 */
export type PageLoaded = Record<string, any>

/**
 * The current loading state of the app.
 */
export type LoadState =
  | {
      readonly type: 'loading' | 'loaded' | '404'
      readonly routePath: string
    }
  | {
      readonly type: 'load-error'
      readonly routePath: string
      readonly error?: any
    }
`)))}f.isMDXComponent=!0;export{f as M};
