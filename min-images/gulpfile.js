const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

const outPut = 'dist'

gulp.task('move', () => 
	gulp.src('./images/**/*.!(jpeg|jpg|png|svg|ico)')
		.pipe(gulp.dest(outPut))
)

gulp.task('default', () => 
	gulp.src(['./images/**/*.+(jpeg|jpg|png|svg|ico)'])
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: false},
					{cleanupIDs: false}
				]
		    }),
		    pngquant({
		        floyd: 0.7,
		        quality: 60
		    })
		]))
		.pipe(gulp.dest(outPut))
)
