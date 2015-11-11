/* GULP CHEAT SHEET
   
   *************** HAVE TO CREATE 'gulpfile.js' ***************
   
   CONSOLE COMMANDS:
   gulp: Runs all default and user defined tasks
   gulp 'task name': Runs all user defined tasks

   GULP FUNCTINOS:
   require(): is used to require gulp and all plugins
   .task('task name', callback or array): is used to define tasks that need to be run
   .pipe(some function): is used to connect what's run within each task
   .src('files to work from'): is the source of the files we are working on and minifying
   .dest('output folder'): is used to define the output folder of files
   .watch('files to watch', ['Tasks to run']): is used to watch for changes of files


*/
/*GULP and GULP Plugins are defined here after being installed via npm*/
var gulp = require('gulp'), // GULP
    plumber = require('gulp-plumber'), // SYNTAX ERROR CHECKER
    uglify = require('gulp-uglify'), // MINIFY JAVASCRIPT
    sass = require('gulp-sass'), // SASS GULP PLUGIN
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'), // MINIFY CSS
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'), // AUTO PREFIX CSS
    removeHtmlComments = require('gulp-remove-html-comments'), 
    connect = require('gulp-connect')


    paths = {
      vendor_js: [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js'
      ],
      css: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
      ]
    };

/*GULP tasks are run from here.
  'default' is the default task run by gulp
  We use 'gulp.src' to point to development files i.e. 'main.js'
  and we use the '.pipe()' function to connect our tasks.
  'gulp.dest()' is where we out put our minified files.
*/

/*GULP Tasks are tasks you set up other than the default*/

/* This task minifies scripts using 'gulp-uglify'*/
gulp.task('scripts', function(){
  gulp.src('development/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('production/js'))
  .pipe(connect.reload());
});

gulp.task('vendor-scripts', function(){
  gulp.src(paths.vendor_js)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('production/vendor/js'));
});

/* This task minifies styles*/
gulp.task('styles', function(){
  gulp.src('development/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
/*  .pipe(uncss({
    html: ['index.html']
  }))*/
  .pipe(plumber())
  .pipe(minifyCss())
  .pipe(gulp.dest('production/css'))
  .pipe(connect.reload()); 
});

gulp.task('vendor-css', function(){
  gulp.src(paths.css)
/*  .pipe(uncss({
    html: ['index.html']
  }))*/
  .pipe(plumber())
  .pipe(minifyCss())
  .pipe(gulp.dest('production/vendor/css'))
});

gulp.task('page', function(){
	gulp.src('*.html')
  .pipe(removeHtmlComments())
	.pipe(gulp.dest('production/'))
	.pipe(connect.reload());
});

/* This task watches our files for livereload */
/* 'gulp.watch(path or [array of paths], [array])'*/
gulp.task('watch', function(){
  gulp.watch('development/js/*.js', ['scripts']);
  gulp.watch(['development/sass/*.scss', 'development/sass/**/*.scss'], ['styles']);
  gulp.watch('*.html', ['page']);
});

gulp.task('connect', function(){
	connect.server({
	  root: 'production',
	  livereload: true
	});
});

/*GULP Default Task
  Run using 'gulp' in console
  This task can have a call back function or an array.
*/
gulp.task('default', ['page', 'scripts', 'vendor-css', 'watch', 'vendor-scripts', 'styles', 'connect']);