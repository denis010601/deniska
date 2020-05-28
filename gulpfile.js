const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify') 

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

  return src(['css/**.css', '!css/**.min.css'])
  
  .pipe(cleanCSS())
  .pipe(dest("dist/css/"));
}

function minjs() {

    return src(['js/**.js', '!js/**.min.js'])
    .pipe(minify())
    .pipe(dest("dist/js/"));

    
}

function html() {

return  src('**.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest("dist/"));
  
}

function php() {
src(['**.php'])
  .pipe(dest("dist/"));

  return  src ('phpmailer/**/**')
  .pipe(dest('dist/PHPMailer/'));

}

function fonts() {

return  src(['fonts/**/**'])
  .pipe(dest("dist/fonts/"));

}


function serveSass() {
  return src("./scss/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
        }))
      .pipe(dest("./js"))
      .pipe(browserSync.stream());
};

exports.serve = bs;
exports.min = series (mincss , minjs, php, html, fonts)