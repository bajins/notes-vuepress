module.exports = (options = {}, ctx) => ({ // https://vuepress.vuejs.org/zh/plugin/life-cycle.html
    async ready() { // 钩子在应用初始化之后，并在某些特定的函数式 API 执行之前执行
        console.log("ready");
    },
    updated() {
        console.log("updated");
    },
    async generated(pagePaths) {// 在生产环境的构建结束后被调用，生成的页面的路径数组将作为该函数的第一个参数
        console.log("generated");
        // console.log(pagePaths);
    },
    // https://v1.vuepress.vuejs.org/zh/plugin/option-api.html
    enhanceAppFiles: [path.resolve(__dirname, 'enhanceAppFile.js')],
    extendPageData($page) {
        const { frontmatter } = $page;
        console.log(frontmatter);
    }
});
