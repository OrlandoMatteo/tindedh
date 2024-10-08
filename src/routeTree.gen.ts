/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as LikedImport } from './routes/liked'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const LikedRoute = LikedImport.update({
  path: '/liked',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/liked': {
      id: '/liked'
      path: '/liked'
      fullPath: '/liked'
      preLoaderRoute: typeof LikedImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LikedRoute,
  SettingsRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.ts",
      "children": [
        "/",
        "/liked",
        "/settings"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/liked": {
      "filePath": "liked.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
