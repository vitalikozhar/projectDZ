import gulp from 'gulp'
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from  'browser-sync'
import rename from 'gulp-rename'


const sass = gulpSass(dartSass);  


const sassToCSS = async () => {
    return gulp.src('app/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error' , sasslogError))
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
} 

const server = async () => {
    const browser = browserSync.create()
    browser.init({
        server: 'public'
    })
    browser.watch('public/**/*').on('change' , browser.reload)
}

const watchFiles = async () => {
    gulp.watch('app/**/*' , gulp.series(sassToCSS))
}

const build = gulp.parallel(watchFiles , server)

export{
    watchFiles,
    sassToCSS,
    server,
    build as default
}