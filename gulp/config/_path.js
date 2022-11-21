import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const srcFolder = `./src`
const destFolder = `./dist`
// const destFolder = `rootFolder`

export const path = {
    src: {
        htmlPanini: `${srcFolder}/pages/*.{html,php}`,
    },
    dest: {
        htmlPanini: `${destFolder}/`,
    },
    watch: {
        htmlPanini: [
            `${srcFolder}/{pages,layouts,partials}/**/*.{html,php}`,
            `${srcFolder}/data/**/*.{yml,json}`,
            `${srcFolder}/helpers/**/*.js`
        ],
    },
    rootFolder: rootFolder,
    clean: destFolder,
    srcFolder: srcFolder,
    destFolder: destFolder,
    ftp: ``
}
