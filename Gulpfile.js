var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var handlebars = require('gulp-handlebars');
var hbsfy = require('hbsfy');

gulp.task('build', function () {
  // return browserify({entries: 'src/index.js', extensions: ['.js'], debug: true})
  return browserify({
    entries: 'src/main.js',
    extensions: ['.js'],
    debug: true
  })
    .transform('babelify', { presets: ['es2015'] })
    // .transform('browserify-shim')
    .transform('hbsfy')
    .bundle()
    .on('error', (err) => {
      console.log('ERROR: ', err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
