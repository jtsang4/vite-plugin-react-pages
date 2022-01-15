var m=Object.defineProperty,g=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;var l=(a,t,n)=>t in a?m(a,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[t]=n,p=(a,t)=>{for(var n in t||(t={}))i.call(t,n)&&l(a,n,t[n]);if(r)for(var n of r(t))s.call(t,n)&&l(a,n,t[n]);return a},u=(a,t)=>g(a,h(t));var c=(a,t)=>{var n={};for(var o in a)i.call(a,o)&&t.indexOf(o)<0&&(n[o]=a[o]);if(a!=null&&r)for(var o of r(a))t.indexOf(o)<0&&s.call(a,o)&&(n[o]=a[o]);return n};import{c as e}from"./clientRender.cbf774e7.js";const f={},y="wrapper";function d(n){var o=n,{components:a}=o,t=c(o,["components"]);return e(y,u(p(p({},f),t),{components:a,mdxType:"MDXLayout"}),e("h1",null,"Official Theme"),e("p",null,e("inlineCode",{parentName:"p"},"vite-pages-theme-doc")," is an official theme of vite-pages. It should satisfy most users' needs. This document site is powered by this theme."),e("h2",null,"How to use"),e("p",null,"You should config the theme in ",e("inlineCode",{parentName:"p"},"_theme.tsx"),":"),e("pre",null,e("code",{parentName:"pre",className:"language-tsx"},`// _theme.tsx
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
`)),e("p",null,e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/tree/master/packages/playground/use-theme-doc"},"Here is a complete example"),"."),e("h2",null,"Auto side menu generation"),e("p",null,"Doc theme can generation a side menu automatically, based on the pages information."),e("p",null,"You can control the title/sorting/grouping of the side menu, by notating these ",e("a",{parentName:"p",href:"/page-data#static-data"},"page static data"),":"),e("ul",null,e("li",{parentName:"ul"},"title"),e("li",{parentName:"ul"},"order (default order is 1)"),e("li",{parentName:"ul"},"group (explain later)"),e("li",{parentName:"ul"},"subGroup (explain later)")),e("h3",null,"How side menu generation works"),e("p",null,"For example, if your site has these pages:"),e("pre",null,e("code",{parentName:"pre"},`/
/playground
/components
/components/button
/components/card
/references/glossary
/references/apis/api1
/references/apis/api2
/references/error-codes/code1
/references/error-codes/code2
`)),e("p",null,"Firstly, the theme will divide pages into ",e("inlineCode",{parentName:"p"},"group"),"s based on the ",e("strong",{parentName:"p"},"first segment")," of page path:"),e("pre",null,e("code",{parentName:"pre"},`group /:
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
`)),e("p",null,"You can customize ",e("inlineCode",{parentName:"p"},"group")," in page static data. For example:"),e("pre",null,e("code",{parentName:"pre"},`Put this at top of a markdown page:
---
group: references
---
Or put this at top of a tsx/jsx page:
/**
 * @group references
 */
`)),e("p",null,"Then, the theme will divide pages into ",e("inlineCode",{parentName:"p"},"subGroup"),"s based on the ",e("strong",{parentName:"p"},"second segment")," of pages' path:"),e("pre",null,e("code",{parentName:"pre"},`group /:
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
`)),e("p",null,e("inlineCode",{parentName:"p"},"subGroup")," can also be customized in page static data, just like ",e("inlineCode",{parentName:"p"},"group")," does."),e("p",null,"What is the meanings of ",e("inlineCode",{parentName:"p"},"group")," and ",e("inlineCode",{parentName:"p"},"subGroup"),"?"),e("ul",null,e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"group")," is a site isolation boundary: we only display ",e("strong",{parentName:"li"},"one")," ",e("inlineCode",{parentName:"li"},"group")," at a time. If a user open a page in group ",e("inlineCode",{parentName:"li"},"references"),", he/she will ",e("strong",{parentName:"li"},"only see side menu items from that group"),". He/She will not see menu items from ",e("inlineCode",{parentName:"li"},"components")," group."),e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"subGroup")," decide how the theme sort side menu items. All side menu items with same ",e("inlineCode",{parentName:"li"},"subGroup")," will be rendered adjacently. This document site is an example.")),e("h2",null,"Theme configs"),e("p",null,"The ",e("inlineCode",{parentName:"p"},"createTheme")," exported by ",e("inlineCode",{parentName:"p"},"vite-pages-theme-doc")," accepts ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/theme-doc/src/index.tsx"},"these options"),":"),e("pre",null,e("code",{parentName:"pre",className:"language-ts"},`interface ThemeConfig {
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
  /**
   * view to be rendered when app in 404 state
   * (url not matching any page)
   */
  Component404?: React.ComponentType
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
`)),e("h2",null,"Fully theme customization"),e("p",null,"If the basic theme doesn't satisfy your need, you can ",e("a",{parentName:"p",href:"/theme-customization"},"create your own theme"),"."),e("blockquote",null,e("p",{parentName:"blockquote"},"Contributions to ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/tree/master/packages/theme-doc"},"the theme")," are always welcomed.")))}d.isMDXComponent=!0;var N=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:d});const b={};b.main=N;export{b as default};
