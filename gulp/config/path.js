// Root folder
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const srcFolder = `./src`
const buildFolder = `./dist` // or 'rootFolder'

export const path = {
    src: {
        html: `${srcFolder}/pages/*.{html,php}`,
        styles: `${srcFolder}/styles/main.scss`,
        scripts: `${srcFolder}/scripts/main.js`,
        images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        files: `${srcFolder}/files/**/*.*`,
    },
    build: {
        html: `${buildFolder}/`,
        styles: `${buildFolder}/css/`,
        scripts: `${buildFolder}/js/`,
        images: `${buildFolder}/images/`,
        svg: `${buildFolder}/images/svg/`,
        files: `${buildFolder}/files/`,
    },
    watch: {
        html: [
            `${srcFolder}/{pages,layouts,partials}/**/*.{html,php}`,
            `${srcFolder}/data/**/*.{yml,json}`,
            `${srcFolder}/helpers/**/*.js`
        ],
        styles: `${srcFolder}/styles/**/*.scss`,
        scripts: `${srcFolder}/scripts/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp,ico}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    rootFolder: rootFolder,
    clean: buildFolder,
    srcFolder: srcFolder,
    buildFolder: buildFolder,
    ftp: ``
}
