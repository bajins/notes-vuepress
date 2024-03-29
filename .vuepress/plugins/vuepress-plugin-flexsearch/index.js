const { path } = require("@vuepress/shared-utils");
const { getPageText } = require("./src/utils");

let defaultSearchOptions = {
  encode: "icase",
  tokenize: "forward",
  resolution: 9,
  doc: {
    id: "key",
    field: ["title", "content", "headers"],
  },
};

const DEFAULT_SEARCH_RESULT_LENGTH = 60;

module.exports = (options) => ({
  extendPageData($page) {
    $page.content = getPageText($page);
  },
  alias: {
    "@SearchBox": path.resolve(__dirname, "src", "SearchBox.vue"),
  },
  define: {
    SEARCH_OPTIONS: options.search_options || defaultSearchOptions,
    SEARCH_MAX_SUGGESTIONS: options.maxSuggestions || 10,
    SEARCH_PATHS: options.searchPaths || null,
    SEARCH_HOTKEYS: options.searchHotkeys || "s",
    SEARCH_RESULT_LENGTH:
      Number(options.searchResultLength) || DEFAULT_SEARCH_RESULT_LENGTH,
  },
});
