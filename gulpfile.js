const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');

var config = {
	"pug": {
		"src": "./app/pug/*.pug",
		"dest": "./"
	},
	"sass": {
		"src": "./app/sass/*.scss",
		"dest": "./css/"
	},
	"js": {
		"src": "./app/js/*.js",
		"dest": "./js/"
	}
};

gulp.task('pug', () => {
	return gulp.src(config.pug.src)
	.pipe(pug())
	.pipe(gulp.dest(config.pug.dest))
});

gulp.task('sass', () => {
	return gulp.src(config.sass.src)
	.pipe(sass())
	.pipe(gulp.dest(config.sass.dest))
});

gulp.task('js', function() {
	return gulp.src(config.js.src)
	.pipe(webpack({
		watch: true,
		module: {
      loaders: [
        { test: /\.jsx?/, loader: 'babel' },
      ],
    },
	}))
	.pipe(rename(function(path) {
		path.basename = 'app'
	}))
	.pipe(gulp.dest('./js/'));
});

gulp.task('watch', () => {
	gulp.watch(config.sass.src, ['sass']);
	gulp.watch(config.js.src, ['js']);
});

gulp.task('default', ['watch']);