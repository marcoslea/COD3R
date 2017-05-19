const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

gulp.task('app', ['app.html', 'app.css', "app.js", "app.assets"])

gulp.task('app.html', function(){
  gulp.src('app/**/*.html')//pega arquivos .html da aplicação, esses arquivos podem estar emqualquer parte
    .pipe(htmlmin( { collaspseWhitespace: true}))//elimina os espaços em branco do arquivo para torná-lo mais compactado, isso ajuda no tráfego da aplicação
    .pipe(gulp.dest('public'))//joga os arquivos compactados na pasta publica
})

gulp.task('app.css', function() {
  gulp.src('app/**/*.css')//todos os arquivos css que estão na pasta app
    .pipe(uglifycss({ "uglyComments": true}))//tira o comentarios dos arquivos css
    .pipe(concat('app.min.css'))//faz um concat dos arquivos css e joga no arquivo app.min.css
    .pipe(gulp.dest('public/assets/css'))//joga os arquivos na pasta public/assets/css
})

gulp.task('app.js', function() {
  gulp.src('app/**/*.js')//todos os arquivos .js que estão na pasta app serão usados
   .pipe(babel( { presets: ['es2015'] }))//o babel faz o transpile do código ECMA2015 para javaScript versão anteriores, caso os browser não suportem a versão mais nova do javaScript
   .pipe(uglify())//torna o arquivo menor possivel
   .pipe(concat('app.min.js'))//concatena todos os arquivos .js para um único arquivo app.min.js
   .pipe(gulp.dest('public/assets/js'))//finalmente joga na pasta destino
})

gulp.task('app.assets', function() {
  gulp.src('assets/**/*.*')//copia todos os arquivos, inclusive fotos
   .pipe(gulp.dest('public/assets'))
})
