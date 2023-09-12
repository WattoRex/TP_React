module.exports = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: env(
        "CORS_ORIGIN",
        "http://localhost:3000,http://localhost:1337/"
      ).split(","),
    },
  },
});
