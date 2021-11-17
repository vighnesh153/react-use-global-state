import fs from "fs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const pkg = JSON.parse(
  fs.readFileSync("./package.json", { encoding: "utf-8" })
);
const extensions = [".ts", ".tsx"];

export default {
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
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "default",
      sourcemap: false,
    },
    {
      file: "dist/use-global-state.es.js",
      format: "es",
      sourcemap: false,
    },
    {
      name: "use-global-state",
      file: "dist/use-global-state.umd.js",
      format: "umd",
      sourcemap: false,
      globals: {
        react: "react",
      },
    },
  ],
};
