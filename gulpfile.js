var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

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

gulp.task('js', (cb) => {
	pump([
        gulp.src(config.js.src),
        uglify(),
        gulp.dest(config.js.dest)
    ],
    cb
  );
});

gulp.task('watch', () => {
	gulp.watch(config.sass.src, ['sass']);
	gulp.watch(config.js.src, ['js']);
});

gulp.task('default', ['watch']);