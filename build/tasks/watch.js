import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from '../paths';

gulp.task('watch', ['lint-js'], () => {
	gulp.watch(paths.glob.js, ['lint-js', browserSync.reload]);
	gulp.watch(paths.glob.html, browserSync.reload);
});