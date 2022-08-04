import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// "test": "echo \"Error: no test specified\" && exit 1"

import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.svgSprive, svgSprive);
}

// ftp function
// function watcher() {
//   gulp.watch(path.watch.html, gulp.series(html, ftp));
//   gulp.watch(path.watch.scss, gulp.series(scss, ftp));
//   gulp.watch(path.watch.js, gulp.series(js, ftp));
//   gulp.watch(path.watch.images, gulp.series(images, ftp));
//   gulp.watch(path.watch.svgSprive, gulp.series(svgSprive, ftp));
// }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(gulp.series(html, scss), js, images, svgSprive));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// const build = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export { dev };
export { build };
export { deployZIP };
export { deployFTP };

gulp.task('default', dev);
