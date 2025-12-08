const sitemap = require("react-router-sitemap");
const router = require("./src/Router").default;

new sitemap(router)
  .build("https://asnanihr.in")
  .save("./public/sitemap.xml");
