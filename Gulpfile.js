var gulp = require('gulp'),
browserSync = require('browser-sync'),
couchapp = require('gulp-couchapp');

var couchappOptions = {
  attachments:'app'
  // auth:{username:admin, password:admin}
};

gulp.task('push', function () {
  return gulp.src('couchapp.js')
    .pipe(couchapp.push('test', couchappOptions));
});

gulp.task('browser-sync', function() {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://127.0.0.1:5984/test/_design/vscope/_rewrite',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('js', function() {
  return gulp.src('client/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function() {
  return gulp.src('client/**/*.css')
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['push', 'browser-sync'], function() {
  gulp.watch('app/**/*.js', ['push', 'js', browserSync.reload]);
  gulp.watch('app/**/*.css', ['css', browserSync.reload]);
  gulp.watch('app/**/*.html', ['push', 'bs-reload']);
});
