import fs from "fs";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

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
