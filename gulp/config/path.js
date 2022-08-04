import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    fonts: `${buildFolder}/fonts/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    svgSprive: `${buildFolder}/svgsprite/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/img/**/*.+(jpg|jpeg|png|webp)`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgSprive: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.+(jpg|jpeg|png|webp|svg)`,
    svgSprive: `${srcFolder}/svgicons/*.svg`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `3d-modules/public_html/`
}
