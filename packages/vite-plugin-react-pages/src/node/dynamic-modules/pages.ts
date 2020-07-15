import * as fs from 'fs-extra'
import { extract, parse } from 'jest-docblock'
import grayMatter from 'gray-matter'
import globby from 'globby'
import * as path from 'path'

export type IPageFiles = {
  publicPath: string
  filePath: string
  staticData?: any
}[]

export type IPagesData = {
  publicPath: string
  loadPath: string
  staticData: any
}[]

export async function collectPagesData(
  pagesDir: string,
  fileToRequest: (file: string) => string,
  findPageFiles?: () => Promise<IPageFiles>
): Promise<IPagesData> {
  let pageFiles: IPageFiles
  if (typeof findPageFiles === 'function') {
    pageFiles = await findPageFiles()
  } else {
    pageFiles = await defaultFindPageFiles(pagesDir)
  }
  return Promise.all(
    pageFiles.map(async ({ publicPath, filePath, staticData }) => {
      const finalStaticData = {
        // findPageFiles can give staticData to the pages it found
        ...staticData,
        ...(await extractStaticData(filePath)),
        _path: publicPath,
      }
      let loadPath = fileToRequest(filePath)
      return {
        publicPath,
        staticData: finalStaticData,
        loadPath,
      }
    })
  )
}

export async function renderPagesDataDynamic(pagesData: IPagesData) {
  const addPagesData = pagesData.map(
    ({ publicPath: pagePath, staticData, loadPath }) => {
      return `
pages["${pagePath}"] = {
    _importFn: () => wrap(import("${loadPath}?isPageEntry=${pagePath}")),
    staticData: ${JSON.stringify(staticData)}
};`
    }
  )

  return `
function wrap(promise) {
  return promise.then((pageData) => ({pageData}));
}

const pages = {};
${addPagesData.join('\n')}
export default pages;
`
}

export async function renderSSRPagesData(pagesData: IPagesData) {
  const codeLines = pagesData.map(
    ({ publicPath: pagePath, loadPath }, index) => {
      // import page data and theme data statically
      return `
import * as page${index} from "${loadPath}?isPageEntry=${pagePath}";
ssrData["${pagePath}"] = page${index};`
    }
  )
  return `
export const ssrData = {};
${codeLines.join('\n')}
`
}

export async function defaultFindPageFiles(
  pagesDirPath: string
): Promise<IPageFiles> {
  const pageFiles: string[] = await globby('**/*$.{md,mdx,js,jsx,ts,tsx}', {
    cwd: pagesDirPath,
    ignore: ['**/node_modules/**/*'],
    onlyFiles: true,
  })
  return Promise.all(
    pageFiles.map(async (relativePageFilePath) => {
      const pageFilePath = path.join(pagesDirPath, relativePageFilePath)
      const publicPath = getPagePublicPath(relativePageFilePath)
      return {
        publicPath,
        filePath: pageFilePath,
      }
    })
  )
}

function getPagePublicPath(relativePageFilePath: string) {
  let pagePublicPath = relativePageFilePath.replace(
    /\$\.(md|mdx|js|jsx|ts|tsx)$/,
    ''
  )
  pagePublicPath = pagePublicPath.replace(/index$/, '')
  // ensure starting slash
  pagePublicPath = pagePublicPath.replace(/\/$/, '')
  pagePublicPath = `/${pagePublicPath}`
  return pagePublicPath
}

async function extractStaticData(pageFilePath: string) {
  const pageCode = await fs.readFile(pageFilePath, 'utf-8')
  if (/\.mdx?/.test(pageFilePath)) {
    const { data: frontmatter } = grayMatter(pageCode)
    return { ...frontmatter, sourceType: 'md' }
  } else {
    return { ...parse(extract(pageCode)), sourceType: 'js' }
  }
}
