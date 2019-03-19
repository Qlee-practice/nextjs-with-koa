const withSass = require('@zeit/next-sass');

module.exports = withSass({
  dev: true,
  sassLoaderOptions: {
    includePaths: ["index.scss"]
  }
});