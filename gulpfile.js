var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
	"pug": {
		"src": "./app/pug/*.pug",
		"dest": "./"
	},
	"sass": {
		"src": "./app/sass/*.scss",
		"dest": "./css/"
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

gulp.task('watch', () => {
	gulp.watch(config.sass.src, ['sass']);
});

gulp.task('default', ['watch']);