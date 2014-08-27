var gulp = require('gulp'),
	spawn = require('child_process').spawn,
	path = require('path');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('scripts', function(){
    //combine all js files of the app
    gulp.src(['./js/dev/*.js'])
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('css', function(){
    gulp.src(['./css/dev/*.scss','./css/dev/*.sass','!./css/dev/_*.scss'])
        .pipe(plugins.sass())
        .pipe(plugins.concat('styles.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src(['./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap-sass/dist/js/*.min.js',
		'!./bower_components/bootstrap-sass/js/tests/*.js',
		'!./**/Gruntfile.js'])
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    // gulp.src(['!./bower_components/**/*.min.css',
    //     '!./bower_components/**/*.css',
    //     './bower_components/**/*.css'])
    //     .pipe(plugins.concat('lib.css'))
    //     .pipe(gulp.dest('./css'));
});

gulp.task('vendorFonts', function(){
    gulp.src(['./bower_components/**/*.{ttf,woff,eof,svg}'])
    .pipe(plugins.flatten())
    .pipe(gulp.dest('./fonts'));
});

gulp.task('jekyll', function() {
    jekyll = spawn('jekyll', ['build', '--drafts', '--future']);

    jekyll.stdout.on('data', function (data) {
        console.log('jekyll:\t' + data); // works fine
    });
});

gulp.task('reload', function() {
	var server = plugins.livereload();

	server.changed();
});

gulp.task('watch',function(){
    gulp.watch(['./js/dev/*.js'],['scripts']);
    gulp.watch(['./css/dev/*.scss','./css/dev/*.sass'],['css']);
	gulp.watch(
		[
			'!Gulpfile.js',
			'./css/*.css',
			'!./js/dev/*.js',
			'./js/*.js',
			'./_layouts/**',
			'./_includes/**',
			'./**/*.markdown',
			'./**/*.html',
			'!./_site/**/*'
		],
		['jekyll']);
	gulp.watch(['_site/**'],['reload']);
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: '_site',
	port: '5000',
    livereload: false
  });
});

gulp.task('build',['scripts','css','vendorJS','vendorCSS']);
gulp.task('default',['build','watch','connect']);
