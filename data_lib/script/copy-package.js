const lib = require('./../../../scripts/src_js/copy_package')

const repoFolder = 'notes_app'
const projFolder = 'data_lib'

const sourceFile = `../../${repoFolder}/${projFolder}/package.json`
const targetDir = `../../${repoFolder}/${projFolder}/build`
const debug = false

const paths = lib.getPaths(sourceFile, targetDir, debug)
if (debug) return
lib.copyFileToBuild(paths)
