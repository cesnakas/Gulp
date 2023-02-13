// Root folder
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const srcFolder = `./app`
const destFolder = `./dist` // or 'rootFolder'

export const path = {
  src: {
    htmlPanini: `${srcFolder}/pages/*.{html,php}`,
    styles: `${srcFolder}/styles/app.scss`,
    scripts: [
      // `${srcFolder}/scripts/example.js`,
      `${srcFolder}/scripts/app.js`
    ],
    images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
  },
  dest: {
    htmlPanini: `${destFolder}/`,
    styles: `${destFolder}/css/`,
    scripts: `${destFolder}/js/`,
    fonts: `${destFolder}/fonts/`,
    images: `${destFolder}/img/`,
    svg: `${destFolder}/img/svg/`,
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
    images: `${srcFolder}/images/**/*.{jpeg,jpg,png,gif,svg,webp,ico}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  rootFolder: `${rootFolder}`,
  srcFolder: `${srcFolder}`,
  destFolder: `${destFolder}`,
  clean: destFolder,
  ftp: ``
}
