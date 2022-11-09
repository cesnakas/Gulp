// Root folder
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const srcFolder = `./app`
const destFolder = `./dist` // or './rootFolder'

export const path = {
    src: {
        panini: `${srcFolder}/pages/*.{html,php}`,
        styles: `${srcFolder}/styles/main.scss`,
        scripts: `${srcFolder}/scripts/main.js`,
        images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        files: `${srcFolder}/files/**/*.*`,
    },
    dest: {
        panini: `${destFolder}/`,
        styles: `${destFolder}/css/`,
        scripts: `${destFolder}/js/`,
        images: `${destFolder}/images/`,
        svg: `${destFolder}/images/svg/`,
        files: `${destFolder}/files/`,
    },
    watch: {
        panini: [
            `${srcFolder}/{pages,layouts,partials}/**/*.{html,php}`,
            `${srcFolder}/data/**/*.{yml,json}`,
            `${srcFolder}/helpers/**/*.js`,
        ],
        styles: `${srcFolder}/styles/**/*.scss`,
        scripts: `${srcFolder}/scripts/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp,ico}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    rootFolder: rootFolder,
    srcFolder: srcFolder,
    destFolder: destFolder,
    clean: destFolder,
    ftp: ``
}
