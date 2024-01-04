const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

// compilação do sass
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false }, gulp.series(comprimeImagens));
}

// funcao de exportacao automatica do npm run gulp sass, para exports automaticos da pasta de main e variaveis

// tarefaz privadas nos nao exportamos mas podemos utilizalas dentro de outras tarefaz
// para usar uma função em paralelo ou em serie usamos o (parallel) ou (series) dps do gulp.
// ganho de performace executando em parallel porem nem sempre podemos fazer em paralelo
// para executar a compilacao do sass, npm run gulp sass

