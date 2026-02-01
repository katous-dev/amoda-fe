self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/products/[slug]": [
    "static/chunks/pages/products/[slug].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin/banner",
    "/admin/dashboard",
    "/admin/layout",
    "/admin/news",
    "/admin/products",
    "/login",
    "/news",
    "/news/[slug]",
    "/price",
    "/products/[slug]",
    "/register",
    "/search/[slug]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()