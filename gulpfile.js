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
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber');

gulp.task("default", function (cb) {
    runSequence('clean', 'copy:html', 'copy:img', 'copy:css', 'copy:vendor','scripts' , 'watch', cb);
});

gulp.task("watch", function(){
    livereload.listen();
    gulp.watch('app/index.html', ["copy:html"]);
    //gulp.watch("css/**", ["copy:css"]);
    //gulp.watch("img/**", ["copy:img"]);
    gulp.watch("app/js/**/*.js", ["scripts"]);
});

gulp.task("copy:html", function () {
    gulp.src("app/index.html")
        .pipe(plumber())
        .pipe(gulp.dest("dist"))
        .pipe(livereload());
});

gulp.task("copy:vendor", function () {
    gulp.src("vendor/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("dist/vendor"));
});

gulp.task("copy:css", function () {
    gulp.src("app/css/**")
        .pipe(gulp.dest("dist/css"));
});

gulp.task("copy:img", function () {
    gulp.src("app/img/**")
        .pipe(plumber())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("clean", function (cb) {
    del([
        'dist/**'
    ], cb);
});

gulp.task("scripts", function () {
    gulp.src("app/js/**/*.js")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({modules: "amd"}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"))
        .pipe(livereload());
});
