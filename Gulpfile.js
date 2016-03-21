var gulp = require('gulp'),
browserSync = require('browser-sync'),
couchapp = require('gulp-couchapp'),
bower = require('gulp-bower');

var couchappOptions = {
  attachments:'app'
  // auth:{username:admin, password:admin}
};

gulp.task('bower', function() {
  return bower();
});

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

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['bower', 'push', 'browser-sync'], function() {
  gulp.watch(['app/**/*.js','app/**/*.css','app/**/*.html'], ['push', 'bs-reload']);
});
