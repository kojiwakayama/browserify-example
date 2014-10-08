gulp = require("gulp")
plugins = require("gulp-load-plugins")()
browserify = require("browserify")
source = require("vinyl-source-stream")

paths =
  lint: [
    "./index.js"
    "./gulpfile.js"
    "./lib/**/*.js"
  ]
  watch: [
    "./index.js"
    "./gulpfile.js"
    "./lib/**"
    "./test/**/*.js"
    "!test/{temp,temp/**}"
  ]
  tests: [
    "./test/**/*.js"
    "!test/{temp,temp/**}"
  ]

gulp.task "lint", ->
  "use strict"
  gulp.src(paths.lint)
    .pipe(plugins.jshint(".jshintrc"))
    .pipe(plugins.jshint.reporter("jshint-stylish"))

gulp.task "unitTest", ->
  "use strict"
  gulp.src(paths.tests,
      cwd: __dirname
    ).pipe(plugins.plumber())
    .pipe plugins.mocha(reporter: "list")

gulp.task "browserify", ->
  "use strict"
  browserify("./index.coffee",
    extensions: [".coffee"]
    debug: true
  ).transform("coffeeify")
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("./"))

gulp.task "watch", ["test"], ->
  "use strict"
  gulp.watch paths.watch, ["test"]

gulp.task "test", ["lint", "unitTest"]

gulp.task "default", ["test"]
