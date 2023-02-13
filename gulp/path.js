import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const srcFolder = `./src`
const destFolder = `./dist`
// const destFolder = `rootFolder`

export const path = {
  src: {
    htmlPanini: `${srcFolder}/pages/*.{html,php}`,
    styles: `${srcFolder}/styles/main.scss`,
    scripts: `${srcFolder}/scripts/main.js`,
    // Old path
    images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
  },
  dest: {
    htmlPanini: `${destFolder}/`,
    styles: `${destFolder}/css/`,
    scripts: `${destFolder}/js/`,
    // Old path
    images: `${destFolder}/images/`,
    svg: `${destFolder}/images/svg/`,
    fonts: `${destFolder}/fonts/`,
    files: `${destFolder}/files/`,
  },
  watch: {
    htmlPanini: [
      `${srcFolder}/{pages,layouts,partials}/**/*.{html,php}`,
      `${srcFolder}/data/**/*.{yml,json}`,
      `${srcFolder}/helpers/**/*.js`
    ],
    styles: `${srcFolder}/styles/**/*.scss`,
    scripts: `${srcFolder}/scripts/**/*.js`,
    // Old path
    images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp,ico}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  rootFolder: `${rootFolder}`,
  srcFolder: `${srcFolder}`,
  destFolder: `${destFolder}`,
  clean: destFolder,
  ftp: ``
}
