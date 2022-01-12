var c=Object.defineProperty,g=Object.defineProperties;var f=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var p=(t,a,o)=>a in t?c(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o,i=(t,a)=>{for(var o in a||(a={}))l.call(a,o)&&p(t,o,a[o]);if(r)for(var o of r(a))u.call(a,o)&&p(t,o,a[o]);return t},m=(t,a)=>g(t,f(a));var h=(t,a)=>{var o={};for(var n in t)l.call(t,n)&&a.indexOf(n)<0&&(o[n]=t[n]);if(t!=null&&r)for(var n of r(t))a.indexOf(n)<0&&u.call(t,n)&&(o[n]=t[n]);return o};import{c as e,L as s}from"./clientRender.7d513ba0.js";import{M as y}from"./theme-interface.d8ef6232.js";const b={},T="wrapper";function d(o){var n=o,{components:t}=n,a=h(n,["components"]);return e(T,m(i(i({},b),a),{components:t,mdxType:"MDXLayout"}),e("h1",null,"Theme customization"),e("blockquote",null,e("p",{parentName:"blockquote"},"This is an advance guide about how to make a theme by yourself. If there is already themes that meet your needs(.e.g ",e(s,{to:"/official-theme",mdxType:"Link"},"the official theme"),"), you don't need to read this guide now!")),e("p",null,"Vite-pages itself doesn't render any concrete DOM node. Users can customize ",e("strong",{parentName:"p"},"anything")," with a theme. That's why theme is so powerful."),e("p",null,"To use a theme, users should export their theme from ",e("inlineCode",{parentName:"p"},"_theme.tsx"),". It should export a React compoent. It will be rendered by vite-pages core, and get useful info from props:"),e("ul",null,e("li",{parentName:"ul"},"All pages' static data"),e("li",{parentName:"ul"},"All runtime data that is already loaded"),e("li",{parentName:"ul"},"The current loading state of the app")),e("p",null,"Here is the interface of a theme:"),e(y,{mdxType:"ThemeInterface"}),e("p",null,'You can learn more about the "data" received by the render functions in ',e(s,{to:"/page-data",mdxType:"Link"},"the page data doc"),"."),e("p",null,"This is probably ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/playground/basic/pages/_theme.tsx"},"the simplest theme"),":"),e("pre",null,e("code",{parentName:"pre",className:"language-tsx"},`import React, { useMemo } from 'react'
import type { Theme } from 'vite-plugin-react-pages'

const Theme: Theme = ({ staticData, loadedData, loadState }) => {
  console.log('#Theme', staticData, loadedData, loadState)

  // You can generate side nav menu from staticData
  // const sideMenuData = useMemo(() => generateSideMenu(staticData), [staticData])

  if (loadState.type === '404') return <p>Page not found.</p>
  if (loadState.type === 'load-error') return <p>Load error!</p>
  if (loadState.type === 'loading') return <p>Loading...</p>

  // loadState.type === 'loaded'
  // Runtime page data for current page
  const pageData = loadedData[loadState.routePath]
  // the default export of the main module
  const Component = pageData.main.default
  return <Component />
}

export default Theme
`)),e("blockquote",null,e("p",{parentName:"blockquote"},"Here is a more useful theme: ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/theme-doc/src/index.tsx"},"vite-pages-theme-doc"),". Learn more about it in ",e(s,{to:"/official-theme",mdxType:"Link"},"this guide"),".")),e("p",null,"You can customize every bits of UI with theme. Welcome to share your theme with a npm package!"),e("h2",null,"Suggestions"),e("h3",null,"To theme providers: make your theme easier to use"),e("p",null,"We encourage theme providers to export your theme as ",e("strong",{parentName:"p"},"a config function")," that receive user config and return a ",e("inlineCode",{parentName:"p"},"Theme"),"."),e("p",null,"For example, the theme provider can export theme like this:"),e("pre",null,e("code",{parentName:"pre",className:"language-tsx"},`// The theme config function accepts navs config
export default function createTheme({ navs }: Option = {}): Theme {
  return ({ loadedData, loadState }) => {
    if (loadState.type !== 'loaded')
      return (
        <Layout navs={navs}>
          <p>Loading...</p>
        </Layout>
      )
    // Runtime page data for current page
    const pageData = loadedData[loadState.routePath]
    // the default export of the main module
    const Component = pageData.main.default
    return (
      <Layout navs={navs}>
        <Component />
      </Layout>
    )
  }
}
`)),e("p",null,"Theme consumers can use it to config their navs menu:"),e("pre",null,e("code",{parentName:"pre",className:"language-tsx"},`// Theme users can configure sideMenu in \`/_theme.tsx\`:
import createTheme from 'theme-pkg'
export default createTheme({
  navs: [
    { path: '/guides/guide1', label: 'guide1' },
    { path: '/guides/guide2', label: 'guide1' },
  ],
})
`)),e("p",null,"As you can see, the theme is easier to use because ",e("strong",{parentName:"p"},"theme consumers don't need to know about the ",e("inlineCode",{parentName:"strong"},"Theme")," API of vite-pages"),". They only need to know about ",e("inlineCode",{parentName:"p"},"createTheme")," API from the theme. Users should be talking to the theme, instead of talking directly to vite-pages framework."),e("p",null,"For this reason, we encourage theme providers to export config function like the ",e("inlineCode",{parentName:"p"},"createTheme")," above."),e("blockquote",null,e("p",{parentName:"blockquote"},"You can refer to ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/theme-doc/src/index.tsx"},"vite-pages-theme-doc"))),e("h4",null,"Release the power of Typescript"),e("p",null,'The above example show another benefit for users: theme users can get Typescript type-check and intelliSense when they are configuring theme. This is because users are calling the theme config function, instead of "exporting some configs".'),e("h2",null,"Share your theme!"),e("p",null,"It is easy to write a theme that is sharable and configurable."),e("p",null,"If you have designed and implemented a theme (.e.g a blog theme, a document site theme), welcome to add a link to your theme package in this document!"))}d.isMDXComponent=!0;var v=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:d});const x={};x.main=v;export{x as default};
