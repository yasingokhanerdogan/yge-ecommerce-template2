export default {
  STORE: {
    BASE: "/",

    AUTH: {
      LOGIN: "/login",
      REGISTER: "/register",
      FORGOT_PASSWORD: "/forgot-password",
    },

    ACCOUNT: {
      BASE: "/account",
      FAVORITES: "/account/favorites",
      ORDERS: "/account/orders",
      SETTINGS: "/account/settings",
    },

    PRODUCT: "/product",
    CART: "/cart",
    CHECKOUT: "/checkout",

    ABOUT: "/about",
    CONTACT: "/contact",
  },
  ERRORS: {
    FORBIDDEN: "/403",
    NOT_FOUND: "/404",
    SERVER_ERROR: "/500",
  },
};
