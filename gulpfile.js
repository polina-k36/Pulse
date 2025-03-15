import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import tinypng from 'gulp-tinypng';

const sassCompiler = gulpSass(sass);

// Задача для минификации HTML
gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

// Задача для сервера
gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

// Задача для обработки стилей
gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Задача для отслеживания изменений
gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

// Задача для обработки скриптов
gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

// Задача для обработки шрифтов
gulp.task('fonts', function () {
    return gulp.src("src/font/**/*")
        .pipe(gulp.dest("dist/font"));
});

// Задача для обработки иконок
gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

// Задача для обработки логотипов
gulp.task('logo', function () {
    return gulp.src("src/logo/**/*")
        .pipe(gulp.dest("dist/logo"));
});

// Задача для обработки почтовых файлов
gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

// Задача для обработки изображений

gulp.task('img', function () {
    return gulp.src("src/img/**/*")
        .pipe(tinypng('11fY2PqLWVjDCMyfYtHWyYgxv33H292r'))
        .pipe(gulp.dest("dist/img"))

});


// Задача по умолчанию
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'fonts', 'scripts', 'mailer', 'icons', 'img', 'html', 'logo'));