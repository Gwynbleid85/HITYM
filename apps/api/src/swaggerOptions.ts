export const options = {
  info: {
    version: "1.0.0",
    title: "HIMYM API",
    license: {
      name: "MIT",
    },
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.ts",
  // Expose json on url
  exposeApiDocs: true,
  apiDocsPath: "/v3/api-docs",
};
