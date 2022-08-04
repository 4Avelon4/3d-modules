import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';

export const svgSprive = _ => {
  return app.gulp.src(`${app.path.src.svgSprive}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(svgmin({
      multipass: true,
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons.svg`,
        }
      }
    }))
    .pipe(app.gulp.dest(`${app.path.build.svgSprive}`))
}
