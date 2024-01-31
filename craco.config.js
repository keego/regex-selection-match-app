const path = require("path")
const tsConfig = require("./tsconfig.json")

function resolveAliases(tsPaths) {
  const unglob = s => s.replace(/\/\*/, '')
  const keys = Object.keys(tsPaths)

  const pathMapping = keys.reduce(
    (pathMapping, tsKey) => {
      const resolutions = tsPaths[tsKey]

      return {
          ...pathMapping,
          [unglob(tsKey)]: resolutions.map(s => path.resolve(__dirname, unglob(s))),
      }

    },{
    }
  )

  return pathMapping
}

const aliases = resolveAliases(tsConfig.compilerOptions.paths)

module.exports = {
  webpack: {
    alias: aliases,
  }
}
