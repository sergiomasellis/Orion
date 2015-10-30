/**
 * Created by Sergio on 2/24/2015.
 */
var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    del = require('del'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    opn = require('opn'),
    plumber = require('gulp-plumber');



gulp.task("default", function (cb) {
    runSequence('copy:html', 'copy:img', 'copy:css', 'copy:vendor','copy:models', 'copy:glsl', 'scripts', 'webserver', 'watch', cb);
});

gulp.task("watch", function(){

    gulp.watch('app/index.html', ["copy:html"]);
    gulp.watch("css/**", ["copy:css"]);
    gulp.watch("img/**", ["copy:img"]);
    gulp.watch("app/js/shaders/*.glsl", ["copy:glsl"]);
    gulp.watch("app/js/**/*.js", ["scripts"]);
    gulp.watch("app/js/models/*.json", ['copy:models']);
});

gulp.task('webserver', function() {
  var _browser_URL = "./dist";
    browserSync({
      server: _browser_URL,
      port: process.env.PORT,
      host: process.env.IP
    });
});

// Copy files and assests
gulp.task("copy:html", function () {
    gulp.src("app/index.html")
        .pipe(plumber())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("copy:vendor", function () {
    gulp.src("vendor/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("dist/vendor"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("copy:css", function () {
    gulp.src("app/css/**")
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("copy:img", function () {
    gulp.src("app/img/**")
        .pipe(plumber())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("copy:glsl", function() {
  gulp.src("app/js/shaders/*.glsl")
      .pipe(plumber())
      .pipe(gulp.dest("dist/js/shaders"));
});

gulp.task("copy:models", function() {
  gulp.src("app/js/models/*.json")
      .pipe(plumber())
      .pipe(gulp.dest("dist/js/models"));
});

gulp.task("clean", function (cb) {
    del([
        'dist/**'
    ], cb);
});

gulp.task("scripts", function () {
    return gulp.src(["app/js/**/*.js", "!app/js/Utils/*.js"])
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel({modules: "amd"}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js"))
      .pipe(browserSync.reload({stream: true}));
});
