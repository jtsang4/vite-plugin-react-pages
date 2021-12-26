var g=Object.defineProperty,h=Object.defineProperties;var f=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var s=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var p=(a,t,n)=>t in a?g(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n,i=(a,t)=>{for(var n in t||(t={}))s.call(t,n)&&p(a,n,t[n]);if(r)for(var n of r(t))l.call(t,n)&&p(a,n,t[n]);return a},u=(a,t)=>h(a,f(t));var c=(a,t)=>{var n={};for(var o in a)s.call(a,o)&&t.indexOf(o)<0&&(n[o]=a[o]);if(a!=null&&r)for(var o of r(a))t.indexOf(o)<0&&l.call(a,o)&&(n[o]=a[o]);return n};import{c as e,L as d}from"./clientRender.07108da0.js";const y={},b="wrapper";function m(n){var o=n,{components:a}=o,t=c(o,["components"]);return e(b,u(i(i({},y),t),{components:a,mdxType:"MDXLayout"}),e("h1",null,"Official Theme"),e("p",null,e("inlineCode",{parentName:"p"},"vite-pages-theme-doc")," is an official theme of vite-pages. It should satisfy most users' needs. This document site is powered by this theme."),e("h2",null,"How to use"),e("p",null,"You should config the theme in ",e("inlineCode",{parentName:"p"},"_theme.tsx"),":"),e("pre",null,e("code",{parentName:"pre",className:"language-tsx"},`// _theme.tsx
import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'

export default createTheme({
  topNavs: [
    { label: 'index', path: '/' },
    { label: 'Vite', href: 'https://github.com/vitejs/vite' },
  ],
  logo: 'Vite Pages',
  // Other configs...
})
`)),e("p",null,e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/tree/master/packages/playground/use-theme-doc"},"Here is a complete example"),"."),e("h2",null,"Auto side menu generation"),e("p",null,"Doc theme can generation a side menu automatically, based on the pages information."),e("p",null,"You can control the title/sorting/grouping of the side menu, by notating these ",e(d,{to:"/page-data#static-data",mdxType:"Link"},"page static data"),":"),e("ul",null,e("li",{parentName:"ul"},"title"),e("li",{parentName:"ul"},"order (default order is 1)"),e("li",{parentName:"ul"},"group (explain later)"),e("li",{parentName:"ul"},"subGroup (explain later)")),e("h3",null,"How side menu generation works"),e("p",null,"For example, if your site has these pages:"),e("pre",null,e("code",{parentName:"pre"},`/
/playground
/components
/components/button
/components/card
/references/glossary
/references/apis/api1
/references/apis/api2
/references/error-codes/code1
/references/error-codes/code2
`)),e("p",null,"First, it will first divide them into ",e("inlineCode",{parentName:"p"},"group"),"s:"),e("pre",null,e("code",{parentName:"pre"},`group /:
  /
  /playground

group components:
  /components
  /components/button
  /components/card

group references:
  /references/glossary
  /references/apis/api1
  /references/apis/api2
  /references/error-codes/code1
  /references/error-codes/code2
`)),e("p",null,"The classification of ",e("inlineCode",{parentName:"p"},"group"),"s is based on the ",e("strong",{parentName:"p"},"first segment")," of pages' path. You can also customize it in page static data."),e("p",null,"Then, it will divide them into ",e("inlineCode",{parentName:"p"},"subGroup"),"s:"),e("pre",null,e("code",{parentName:"pre"},`group /:
  subGroup /:
    /
    /playground

group components:
  subGroup /:
    /components
    /components/button
    /components/card

group references:
  subGroup /:
    /references/glossary
  subGroup apis:
    /references/apis/api1
    /references/apis/api2
  subGroup error-codes:
    /references/error-codes/code1
    /references/error-codes/code2
`)),e("p",null,"The classification of ",e("inlineCode",{parentName:"p"},"subGroup"),"s is based on the ",e("strong",{parentName:"p"},"second segment")," of pages' path. You can also customize it in page static data."),e("p",null,"What is the meanings of ",e("inlineCode",{parentName:"p"},"group")," and ",e("inlineCode",{parentName:"p"},"subGroup"),"?"),e("ul",null,e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"group")," is isolation boundary: we only display ",e("strong",{parentName:"li"},"one")," ",e("inlineCode",{parentName:"li"},"group")," at a time. If a user open a page in group ",e("inlineCode",{parentName:"li"},"references"),", he/she will only see menu items from that group. He/She will not see menu items from ",e("inlineCode",{parentName:"li"},"components")," group."),e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"subGroup")," is how we actual grouping menu items in sider. All pages with same ",e("inlineCode",{parentName:"li"},"subGroup")," will be displayed together. This document site is an example.")),e("h2",null,"Theme configs"),e("p",null,"The ",e("inlineCode",{parentName:"p"},"createTheme")," exported by ",e("inlineCode",{parentName:"p"},"vite-pages-theme-doc")," accepts ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/theme-doc/src/index.tsx"},"these options"),":"),e("pre",null,e("code",{parentName:"pre",className:"language-ts"},`interface ThemeConfig {
  /**
   * Logo at top bar
   */
  logo?: React.ReactNode
  /**
   * Logo link path
   * @defaultValue "/"
   */
  logoLink?: string | null
  /**
   * Navigation menu at top bar.
   */
  topNavs?: ReadonlyArray<MenuConfig>
  /**
   * Side menu.
   */
  sideNavs?:
    | ReadonlyArray<MenuConfig>
    | ((ctx: SideNavsContext) => ReadonlyArray<MenuConfig> | null | undefined)
  /**
   * Extra area at top bar.
   */
  TopBarExtra?: React.ComponentType
}

interface SideNavsContext {
  readonly loadState: LoadState
  readonly loadedData: PagesLoaded
  readonly staticData: Record<string, any>
}

type MenuConfig =
  | {
      readonly label: string
      /**
       * The url.
       * @example 'https://www.google.com/'
       */
      readonly href: string
      readonly icon?: React.ReactNode
    }
  | {
      readonly label: string
      /**
       * The path in the current webapp.
       * @example '/posts/hello-world'
       */
      readonly path: string
      readonly icon?: React.ReactNode
      /**
       * The menu item will show an "active" state
       * if it matches with current browsing path.
       */
      readonly activeIfMatch?: string | string[] | RouteProps
    }
  | {
      /**
       * The label of the subnav
       */
      readonly subMenu: string
      readonly children: ReadonlyArray<MenuConfig>
      readonly icon?: React.ReactNode
      readonly activeIfMatch?: string | string[] | RouteProps
    }
  | {
      /**
       * The label of the nav group
       */
      readonly group: string
      readonly children: ReadonlyArray<MenuConfig>
    }
`)),e("h2",null,"Fully theme customization"),e("p",null,"If the basic theme doesn't satisfy your need, you can ",e(d,{to:"/theme-customization",mdxType:"Link"},"create your own theme"),"."),e("blockquote",null,e("p",{parentName:"blockquote"},"Contributions to ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/tree/master/packages/theme-doc"},"the theme")," are always welcomed.")))}m.isMDXComponent=!0;var N=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:m});const C={};C.main=N;export{C as default};
