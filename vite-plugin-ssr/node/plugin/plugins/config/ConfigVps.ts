export type { ConfigVpsUserProvided }
export type { ConfigVpsResolved }
export type { ExtensionResolved }

type AssetsManifest = { // TODO: remove
  format: 'esbuild@15'
  manifestFilePath: string
}
type ExtensionUserProvided = {
  npmPackageName: string
  pageFilesDist?: string[]
  pageFilesSrc?: string,
  assetsManifest?: AssetsManifest
  assetsDir?: string
}
type ExtensionResolved = {
  npmPackageName: string
  npmPackageRootDir: string
  pageFilesDist: null | {
    importPath: string
    filePath: string
  }[]
  pageFilesSrc: null | string,
  assetsDir: null | string
  assetsManifest: null | AssetsManifest
}

type ConfigVpsResolved = {
  prerender:
    | false
    | {
        noExtraDir: boolean
        parallel: boolean | number
        partial: boolean
        disableAutoRun: boolean
      }
  extensions: ExtensionResolved[]
  disableAutoFullBuild: boolean
  includeAssetsImportedByServer: boolean
}

type ConfigVpsUserProvided = {
  /**
   * Whether your pages are pre-rendered to HTML.
   *
   * @default false
   */
  prerender?:
    | boolean
    | {
        /**
         * Don't create a new directory for each HTML file.
         *
         * For example, generate `dist/client/about.html` instead of `dist/client/about/index.html`.
         *
         * @default false
         */
        noExtraDir?: boolean
        /**
         * Number of concurrent pre-render jobs.
         *
         * Set to `false` to disable concurrency.
         *
         * @default os.cpus().length
         */
        parallel?: boolean | number
        /**
         * Allow only some of your pages to be pre-rendered.
         *
         * This setting doesn't affect the pre-rendering process: it merely suppresses the warnings when some of your pages cannot be pre-rendered.

         * @default false
         */
        partial?: boolean
        /**
         * Disable the automatic initiation of the pre-rendering process when running `$ vite build`.
         *
         * Use this if you want to programmatically initiate the pre-rendering process instead.
         *
         * See https://vite-plugin-ssr.com/prerender-programmatic
         *
         * @default false
         */
        disableAutoRun?: boolean
      }
  /**
   * @beta
   * Don't use without having talked to a vite-plugin-ssr maintainer.
   */
  extensions?: ExtensionUserProvided[]
  /**
   * Set to `true` to disable the automatic chaining of all the build steps.
   *
   * See https://vite-plugin-ssr.com/disableAutoFullBuild
   *
   * @default false
   */
  disableAutoFullBuild?: boolean
  /**
   * Support importing assets (CSS, images, etc.) from server code.
   *
   * See https://vite-plugin-ssr.com/includeAssetsImportedByServer
   *
   * @experimental
   */
  includeAssetsImportedByServer?: boolean
}
