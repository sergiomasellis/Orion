/**
 * Created by Sergio on 2/24/2015.
 */
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task("default", function (cb) {
    runSequence('clean', 'copy:html', 'copy:img', 'copy:css', 'copy:vendor','scripts' , 'watch', cb);
});

gulp.task("watch", function(){
    gulp.watch('app/index.html', ["copy:html"]);
    //gulp.watch("css/**", ["copy:css"]);
    //gulp.watch("img/**", ["copy:img"]);
    gulp.watch("app/js/**/*.js", ["scripts"]);
});

gulp.task("copy:html", function () {
    gulp.src("app/index.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("copy:vendor", function () {
    gulp.src("vendor/**/*.js")
        .pipe(gulp.dest("dist/vendor"));
});

gulp.task("copy:css", function () {
    gulp.src("app/css/**")
        .pipe(gulp.dest("dist/css"));
});

gulp.task("copy:img", function () {
    gulp.src("app/img/**")
        .pipe(gulp.dest("dist/img"));
});

gulp.task("clean", function (cb) {
    del([
        'dist/**'
    ], cb);
});

gulp.task("scripts", function () {
    gulp.src("app/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({modules: "amd"}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"));
});