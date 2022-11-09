const fs = require("fs");
const babel = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const typescript = require('@rollup/plugin-typescript');

const pkg = JSON.parse(
  fs.readFileSync("./package.json", { encoding: "utf-8" })
);
const extensions = [".ts", ".tsx"];

module.exports = {
  input: "src/index.ts",
  external: ["react"],
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    terser(),
    typescript(),
  ],
  output: [
    // {
    //   file: "dist/use-global-state.cjs.js",
    //   format: "cjs",
    //   sourcemap: false,
    // },
    {
      file: pkg.main,
      format: "es",
      sourcemap: false,
    },
  ],
};
