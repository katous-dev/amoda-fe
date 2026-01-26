self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/news": [
    "static/chunks/pages/news.js"
  ],
  "/news/[slug]": [
    "static/chunks/pages/news/[slug].js"
  ],
  "/price": [
    "static/chunks/pages/price.js"
  ],
  "/products/[slug]": [
    "static/chunks/pages/products/[slug].js"
  ],
  "/register": [
    "static/chunks/pages/register.js"
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
    "/news",
    "/news/[slug]",
    "/price",
    "/products/[slug]",
    "/register",
    "/search/[slug]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()