var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var paths = {
  lint: ['./example/index.js', './gulpfile.js', './lib/**/*.js'],
  watch: ['./example/index.js', './gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}']
};

gulp.task('lint', function () {
  'use strict';

  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('unitTest', function () {
  'use strict';

  gulp.src(paths.tests, {cwd: __dirname})
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({ reporter: 'list' }));
});

gulp.task('browserify', function() {
  'use strict';

  return browserify('./example/index.js', { debug: true })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./example/'));
});

gulp.task('watch', ['test'], function () {
  'use strict';

  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', 'unitTest']);

gulp.task('default', ['test']);
