const clean = require('gulp-clean-css');
const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const wp = require('webpack');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');

const config = {
  'pug': {
    'src': './app/pug/*.pug',
    'dest': './'
  },
  'sass': {
    'src': './app/sass/*.scss',
    'dest': './css/'
  },
  'js': {
    'src': './app/js/*.js',
    'dest': './js/'
  }
};

gulp.task('pug', () => {
  return gulp.src(config.pug.src)
  .pipe(pug())
  .pipe(gulp.dest(config.pug.dest))
});

gulp.task('sass', () => {
  return gulp.src(config.sass.src)
  .pipe(sassLint({
    options: {
      configFile: '.sass-lint.yml'
    }
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
  .pipe(sass())
  .pipe(sourcemaps.init())
  .pipe(clean({ compatibility: 'ie11' }, (details) => {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.sass.dest))
});

gulp.task('js', () => {
  return gulp.src(config.js.src)
  .pipe(webpack({
    devtool: 'cheap-module-source-map',
    watch: true,
    module: {
      loaders: [
        { test: /\.jsx?/, loader: 'babel' },
      ],
    },
    plugins: [
      new wp.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
  }))
  .pipe(rename((path) => {
    path.basename = 'app'
  }))
  .pipe(gulp.dest('./js/'));
});

gulp.task('watch', () => {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.js.src, ['js']);
});

gulp.task('default', ['watch']);