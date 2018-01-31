const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const webpack = require('webpack-stream');

const globs = [
    'src/**/*.ts?(x)'//,
    //'src/**/**/*.ts?(x)',
    //'src/**/**/**/*.ts?(x)'
];

//typescript compilation
gulp.task('typescript', function () {
    return gulp.src(globs)
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist/"));
});

gulp.task('statics', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest("dist/"));
});

gulp.task('webpack', function () {
    return gulp.src('./src/web/react/index.tsx')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/web/'));
});

gulp.task("default", ['typescript','statics','webpack']);

//watch for changes
gulp.task("watch",["default"], function () {
    return gulp.watch(globs,["default"]);
});