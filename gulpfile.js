var gulp = require('gulp')
var del = require('del')
var series = require('run-sequence')
var rename = require('gulp-rename')
var jscs = require('gulp-jscs')
var uglify = require('gulp-uglify')
var webpack = require('gulp-webpack')

gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

gulp.task('build:min', ['build:web'], function () {
  return gulp.src('dist/alchemist-common.js')
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist'))
})

gulp.task('build:web', function () {
  return gulp.src('index.js')
  .pipe(webpack({
    output: {
      filename: 'alchemist-common.js',
      libraryTarget: 'umd',
      library: 'alchemist_common',
      sourcePrefix: ''
    }
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('build', ['build:web', 'build:min'])

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', 'test/*.js', 'index.js'])
  .pipe(jscs())
  .on('error', warn)
})

gulp.task('watch:lint', ['build', 'lint'], function () {
  gulp.watch(['gulpfile.js', '.jscsrc', 'test/*.js', 'index.js'], ['lint'])
})

gulp.task('default', ['lint'], function () {
  gulp.watch(['gulpfile.js', '.jscsrc', 'test/*.js', 'index.js'], ['lint'])
})

function warn (err) {
  console.warn(err.message)
  this.emit('end')
}
