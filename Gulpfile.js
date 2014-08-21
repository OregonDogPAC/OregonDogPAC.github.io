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
    gulp.src(['./css/dev/*.scss','./css/dev/*.sass'])
        .pipe(plugins.sass())
        .pipe(plugins.concat('styles.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src(['./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap-sass/**/*.js',
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

gulp.task('watch',function(){
	var server = plugins.livereload();

    var reload = function(file) {
        server.changed(file.path);
    };
    gulp.watch(['./js/dev/*.js'],['scripts']);
    gulp.watch(['./css/dev/*.scss','./css/dev/*.sass'],['css']);
	gulp.watch(
		[
			'./css/*.css',
			'!./js/dev/*.js',
			'./js/*.js',
			'_layouts/**',
			'_includes/**',
			'./**/*.markdown',
			'./**/*.html',
			'index.html'
		],
		['jekyll']);
	gulp.watch(['_site/**']).on('change', reload);
});

gulp.task('connect', function() {
  plugins.connect.server({
    root: '_site',
	port: '5000',
    livereload: false
  });
});

gulp.task('default',['watch','connect']);
