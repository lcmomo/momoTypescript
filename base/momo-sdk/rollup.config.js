import typescript from 'rollup-plugin-typescript2'

export default [
  //Commonjs
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/momo-sdk.js',
      format: 'cjs'
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true
      })
    ]
  }
  //ES
  //ES for Browsers
  //UMD上线版本
  //UMD开发版本
]