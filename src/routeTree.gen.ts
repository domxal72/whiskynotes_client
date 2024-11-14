/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as MapIndexImport } from './routes/map/index'
import { Route as DistilleriesIndexImport } from './routes/distilleries/index'
import { Route as ProductsProductIdImport } from './routes/products/$productId'
import { Route as PostsPostImport } from './routes/posts/post'
import { Route as DistilleriesSearchImport } from './routes/distilleries/search'
import { Route as DistilleriesIdImport } from './routes/distilleries/$id'
import { Route as AuthSignInImport } from './routes/auth/sign-in'
import { Route as AuthLoginImport } from './routes/auth/login'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const MapIndexRoute = MapIndexImport.update({
  path: '/map/',
  getParentRoute: () => rootRoute,
} as any)

const DistilleriesIndexRoute = DistilleriesIndexImport.update({
  path: '/distilleries/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdRoute = ProductsProductIdImport.update({
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
} as any)

const PostsPostRoute = PostsPostImport.update({
  path: '/posts/post',
  getParentRoute: () => rootRoute,
} as any)

const DistilleriesSearchRoute = DistilleriesSearchImport.update({
  path: '/distilleries/search',
  getParentRoute: () => rootRoute,
} as any)

const DistilleriesIdRoute = DistilleriesIdImport.update({
  path: '/distilleries/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
    '/distilleries/$id': {
      id: '/distilleries/$id'
      path: '/distilleries/$id'
      fullPath: '/distilleries/$id'
      preLoaderRoute: typeof DistilleriesIdImport
      parentRoute: typeof rootRoute
    }
    '/distilleries/search': {
      id: '/distilleries/search'
      path: '/distilleries/search'
      fullPath: '/distilleries/search'
      preLoaderRoute: typeof DistilleriesSearchImport
      parentRoute: typeof rootRoute
    }
    '/posts/post': {
      id: '/posts/post'
      path: '/posts/post'
      fullPath: '/posts/post'
      preLoaderRoute: typeof PostsPostImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId': {
      id: '/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/distilleries/': {
      id: '/distilleries/'
      path: '/distilleries'
      fullPath: '/distilleries'
      preLoaderRoute: typeof DistilleriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/map/': {
      id: '/map/'
      path: '/map'
      fullPath: '/map'
      preLoaderRoute: typeof MapIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/distilleries/$id': typeof DistilleriesIdRoute
  '/distilleries/search': typeof DistilleriesSearchRoute
  '/posts/post': typeof PostsPostRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/distilleries': typeof DistilleriesIndexRoute
  '/map': typeof MapIndexRoute
  '/products': typeof ProductsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/distilleries/$id': typeof DistilleriesIdRoute
  '/distilleries/search': typeof DistilleriesSearchRoute
  '/posts/post': typeof PostsPostRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/distilleries': typeof DistilleriesIndexRoute
  '/map': typeof MapIndexRoute
  '/products': typeof ProductsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/sign-in': typeof AuthSignInRoute
  '/distilleries/$id': typeof DistilleriesIdRoute
  '/distilleries/search': typeof DistilleriesSearchRoute
  '/posts/post': typeof PostsPostRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/distilleries/': typeof DistilleriesIndexRoute
  '/map/': typeof MapIndexRoute
  '/products/': typeof ProductsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/sign-in'
    | '/distilleries/$id'
    | '/distilleries/search'
    | '/posts/post'
    | '/products/$productId'
    | '/distilleries'
    | '/map'
    | '/products'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/sign-in'
    | '/distilleries/$id'
    | '/distilleries/search'
    | '/posts/post'
    | '/products/$productId'
    | '/distilleries'
    | '/map'
    | '/products'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/auth/login'
    | '/auth/sign-in'
    | '/distilleries/$id'
    | '/distilleries/search'
    | '/posts/post'
    | '/products/$productId'
    | '/distilleries/'
    | '/map/'
    | '/products/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSignInRoute: typeof AuthSignInRoute
  DistilleriesIdRoute: typeof DistilleriesIdRoute
  DistilleriesSearchRoute: typeof DistilleriesSearchRoute
  PostsPostRoute: typeof PostsPostRoute
  ProductsProductIdRoute: typeof ProductsProductIdRoute
  DistilleriesIndexRoute: typeof DistilleriesIndexRoute
  MapIndexRoute: typeof MapIndexRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthSignInRoute: AuthSignInRoute,
  DistilleriesIdRoute: DistilleriesIdRoute,
  DistilleriesSearchRoute: DistilleriesSearchRoute,
  PostsPostRoute: PostsPostRoute,
  ProductsProductIdRoute: ProductsProductIdRoute,
  DistilleriesIndexRoute: DistilleriesIndexRoute,
  MapIndexRoute: MapIndexRoute,
  ProductsIndexRoute: ProductsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/auth/login",
        "/auth/sign-in",
        "/distilleries/$id",
        "/distilleries/search",
        "/posts/post",
        "/products/$productId",
        "/distilleries/",
        "/map/",
        "/products/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx"
    },
    "/distilleries/$id": {
      "filePath": "distilleries/$id.tsx"
    },
    "/distilleries/search": {
      "filePath": "distilleries/search.tsx"
    },
    "/posts/post": {
      "filePath": "posts/post.tsx"
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    },
    "/distilleries/": {
      "filePath": "distilleries/index.tsx"
    },
    "/map/": {
      "filePath": "map/index.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
