const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');

function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./scss/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function mincss() {

  return src("./css/*.css")
  .pipe(rename({suffix: ".min"}))
  .pipe(cleanCSS())
  .pipe(dest("css"));
}

function serveSass() {
  return src("./scss/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
        }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;