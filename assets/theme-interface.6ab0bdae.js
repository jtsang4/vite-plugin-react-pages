var y=Object.defineProperty,g=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;var l=(e,t,a)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,n=(e,t)=>{for(var a in t||(t={}))i.call(t,a)&&l(e,a,t[a]);if(r)for(var a of r(t))s.call(t,a)&&l(e,a,t[a]);return e},p=(e,t)=>g(e,m(t));var c=(e,t)=>{var a={};for(var o in e)i.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&r)for(var o of r(e))t.indexOf(o)<0&&s.call(e,o)&&(a[o]=e[o]);return a};import{c as d}from"./clientRender.cbf774e7.js";const h={},u="wrapper";function f(a){var o=a,{components:e}=o,t=c(o,["components"]);return d(u,p(n(n({},h),t),{components:e,mdxType:"MDXLayout"}),d("pre",null,d("code",{parentName:"pre",className:"language-ts"},`/** The type of a theme. */
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
