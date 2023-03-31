export { PageContextBuiltIn }
export { PageContextBuiltInClientWithClientRouting }
export { PageContextBuiltInClientWithServerRouting }

import type { PageContextUrls } from '../addComputedUrlProps'
import type { ConfigEntries, ExportsAll } from '../getPageFiles/getExports'

type PageContextBuiltIn<Page = any> = {
  /** The `export { Page }` of your `.page.js` file, see https://vite-plugin-ssr.com/Page */
  Page: Page
  /** Route Parameters, e.g. `pageContext.routeParams.productId` for a Route String `/product/@productId`, see https://vite-plugin-ssr.com/route-string */
  routeParams: Record<string, string>
  /** The page's config values */
  config: Record<string, unknown>
  /** All configs relevant to the page */
  configEntries: ConfigEntries
  /** Custom Exports/Hooks, see https://vite-plugin-ssr.com/exports */
  exports: Record<string, unknown>
  /** Same as `pageContext.exports` but cumulative */
  exportsAll: ExportsAll
  /** @deprecated */
  url: string
  /** The URL of the current page */
  urlOriginal: string
  /** If an error occurs, whether the error is a `404 Page Not Found` or a `500 Internal Server Error`, see https://vite-plugin-ssr.com/error-page */
  is404?: boolean
  /**
   * Whether the page was navigated by the client-side router, see https://vite-plugin-ssr.com/pageContext
   */
  isClientSideNavigation: boolean
  /** @deprecated */
  pageExports: Record<string, unknown>
} & PageContextUrls

type PageContextBuiltInClientWithClientRouting<Page = any> = Partial<PageContextBuiltIn<Page>> &
  Pick<
    PageContextBuiltIn<Page>,
    | 'Page'
    | 'pageExports'
    | 'config'
    | 'configEntries'
    | 'exports'
    | 'exportsAll'
    | 'url'
    | 'urlOriginal'
    | 'urlPathname'
    | 'urlParsed'
  > & {
    /** Whether the current page is already rendered to HTML */
    isHydration: boolean
    /**
     * Whether the user is navigating back in history.
     *
     * The value is `true` when the user clicks on his browser's backward navigation button, or when invoking `history.back()`.
     */
    isBackwardNavigation: boolean | null
  }

type PageContextBuiltInClientWithServerRouting<Page = any> = Partial<PageContextBuiltIn<Page>> &
  Pick<PageContextBuiltIn<Page>, 'Page' | 'pageExports' | 'exports'> & {
    /**
     * Whether the current page is already rendered to HTML.
     *
     * The `isHydration` value is always `true` when using Server Routing.
     */
    isHydration: true
    /**
     * Whether the user is navigating back in history.
     *
     * The `isBackwardNavigation` property only works with Client Routing. (The value is always `null` when using Server Routing.)
     */
    isBackwardNavigation: null
  }