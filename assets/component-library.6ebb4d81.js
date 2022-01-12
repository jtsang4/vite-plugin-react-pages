var d=Object.defineProperty,g=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var n=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var p=(t,a,u)=>a in t?d(t,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[a]=u,s=(t,a)=>{for(var u in a||(a={}))i.call(a,u)&&p(t,u,a[u]);if(n)for(var u of n(a))l.call(a,u)&&p(t,u,a[u]);return t},m=(t,a)=>g(t,h(a));var r=(t,a)=>{var u={};for(var o in t)i.call(t,o)&&a.indexOf(o)<0&&(u[o]=t[o]);if(t!=null&&n)for(var o of n(t))a.indexOf(o)<0&&l.call(t,o)&&(u[o]=t[o]);return u};import{c as e,L as f}from"./clientRender.7d513ba0.js";const x={},b="wrapper";function c(u){var o=u,{components:t}=o,a=r(o,["components"]);return e(b,m(s(s({},x),a),{components:t,mdxType:"MDXLayout"}),e("h1",null,"Example: develop a component library"),e("p",null,'This is an example of using "Advanced Filesystem Routing" inside a component library project.'),e("p",null,"Suppose you are developing a React component library. Your project have file structure like this:"),e("pre",null,e("code",{parentName:"pre",className:"language-text"},`src
\u251C\u2500\u2500 Button
\u2502   \u251C\u2500\u2500 demos
\u2502   \u2502   \u251C\u2500\u2500 demo1.tsx
\u2502   \u2502   \u2514\u2500\u2500 demo2.tsx
\u2502   \u251C\u2500\u2500 index.tsx
\u2502   \u251C\u2500\u2500 style.module.css
\u2502   \u2514\u2500\u2500 README.md
\u251C\u2500\u2500 Card
\u2502   \u251C\u2500\u2500 demos
\u2502   \u2502   \u251C\u2500\u2500 demo1.tsx
\u2502   \u2502   \u2514\u2500\u2500 demo2.tsx
\u2502   \u251C\u2500\u2500 index.tsx
\u2502   \u251C\u2500\u2500 style.module.css
\u2502   \u2514\u2500\u2500 README.md
\u2514\u2500\u2500 index.ts
`)),e("p",null,"You want to use vite as your local demo development environment (because it is blazingly fast). ",e("strong",{parentName:"p"},"How to collect all components and all demos from this project?")," The file structure doesn't follow the ",e(f,{to:"/fs-routing",mdxType:"Link"},"Basic Filesystem Routing Convention"),"."),e("p",null,"The answer: implement your own filesystem routing convention!"),e("pre",null,e("code",{parentName:"pre",className:"language-ts"},`// vite.config.ts
import type { UserConfig } from 'vite'
import * as path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx from 'vite-plugin-mdx'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'

module.exports = {
  jsx: 'react',
  plugins: [
    reactRefresh(),
    mdx(),
    pages({
      pagesDir: path.join(__dirname, 'pages'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, '../src')
          if (String(({}).SHOW_ALL_COMPONENT_DEMOS) === 'true') {
            // show all component demos during dev
            // put them in page \`/components/demos/\${componentName}\`
            helpers.watchFiles(
              srcPath,
              '*/demos/**/*.{[tj]sx,md?(x)}',
              async function fileHandler(file, api) {
                const { relative, path: absolute } = file
                const match = relative.match(
                  /(.*)\\/demos\\/(.*)\\.([tj]sx|mdx?)$/
                )
                if (!match) throw new Error('unexpected file: ' + absolute)
                const [_, componentName, demoName] = match
                const pageId = \`/components/demos/\${componentName}\`
                // set page data
                const runtimeDataPaths = api.getRuntimeData(pageId)
                // the ?demo query will wrap the module with useful demoInfo
                runtimeDataPaths[demoName] = \`\${absolute}?demo\`
              }
            )
          }

          // find all component README
          helpers.watchFiles(
            srcPath,
            '*/README.md?(x)',
            async function fileHandler(file, api) {
              const { relative, path: absolute } = file
              const match = relative.match(/(.*)\\/README\\.mdx?$/)
              if (!match) throw new Error('unexpected file: ' + absolute)
              const [_, componentName] = match
              const pageId = \`/components/\${componentName}\`
              // set page data
              const runtimeDataPaths = api.getRuntimeData(pageId)
              runtimeDataPaths.main = absolute
              // set page staticData
              const staticData = api.getStaticData(pageId)
              staticData.main = await helpers.extractStaticData(file)
            }
          )
        },
      }),
    }),
  ],
  resolve: {
    alias: {
      'my-lib': path.join(__dirname, '../src'),
    },
  },
} as UserConfig
`)),e("p",null,"We use ",e("inlineCode",{parentName:"p"},"api.getRuntimeData(pageId)")," and ",e("inlineCode",{parentName:"p"},"api.getStaticData(pageId)")," inside fileHandlers to get the pageData object. We can mutate the data object, and vite-pages will update its pages accordingly."),e("p",null,"Checkout the complete example in ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/create-project/template-lib/vite.config.ts"},"the library project scaffold"),`.
You can initialize this project with command: `,e("inlineCode",{parentName:"p"},"npm init vite-pages library-demo --template lib"),"."),e("h2",null,"Monorepo"),e("p",null,"In some cases, we want to publish each component in their own packages."),e("blockquote",null,e("p",{parentName:"blockquote"},"Monorepo has more advantages when components are complex and tend to evolve independently. If we use a single package to publish all these components like the above example, all components share a version number. If we need to introduce a breaking change in a component, we have to bump the major version of the whole package. But with the monorepo we only need to bump the major version of that sub-package. Users will be more confident to upgrade.")),e("p",null,"In that case, we create a seperate package to run vite-pages, collecting all components and their demos. The project setup will look like this:"),e("pre",null,e("code",{parentName:"pre",className:"language-text"},`packages
\u251C\u2500\u2500 Button
\u2502   \u251C\u2500\u2500 demos
\u2502   \u2502   \u251C\u2500\u2500 demo1.tsx
\u2502   \u2502   \u2514\u2500\u2500 demo2.tsx
\u2502   \u251C\u2500\u2500 src
\u2502   \u2502   \u251C\u2500\u2500 index.tsx
\u2502   \u2502   \u2514\u2500\u2500 style.module.css
\u2502   \u251C\u2500\u2500 package.json
\u2502   \u2514\u2500\u2500 README.md
\u251C\u2500\u2500 Card
\u2502   \u251C\u2500\u2500 demos
\u2502   \u2502   \u251C\u2500\u2500 demo1.tsx
\u2502   \u2502   \u2514\u2500\u2500 demo2.tsx
\u2502   \u251C\u2500\u2500 src
\u2502   \u2502   \u251C\u2500\u2500 index.tsx
\u2502   \u2502   \u2514\u2500\u2500 style.module.css
\u2502   \u251C\u2500\u2500 package.json
\u2502   \u2514\u2500\u2500 README.md
\u251C\u2500\u2500 demos
\u2502   \u251C\u2500\u2500 pages
\u2502   \u2502   \u251C\u2500\u2500 index$.tsx
\u2502   \u2502   \u2514\u2500\u2500 _theme.tsx
\u2502   \u251C\u2500\u2500 index.html
\u2502   \u251C\u2500\u2500 package.json
\u2502   \u2514\u2500\u2500 vite.config.ts
\u2514\u2500\u2500 package.json
`)),e("p",null,"Checkout the complete example in ",e("a",{parentName:"p",href:"https://github.com/vitejs/vite-plugin-react-pages/blob/master/packages/create-project/template-lib-monorepo/packages/demos/vite.config.ts"},"the lib-monorepo scaffold"),`.
You can initialize this project with command: `,e("inlineCode",{parentName:"p"},"npm init vite-pages library-monorepo-demo --template lib-monorepo"),"."))}c.isMDXComponent=!0;var C=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:c});const v={};v.main=C;export{v as default};
