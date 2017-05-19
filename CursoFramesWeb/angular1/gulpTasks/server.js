const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

// antes de chamar o server, ele faz um watch e fica monitorando se os arquivos foram alterados
gulp.task('server', ['watch'], function() {
  gulp.src('public').pipe(webserver( {//o server fica olhando para a pasta public e provendo serviços de arquivos estáticos
    livereload: true,//sempre que mudar um arquivo o browser dará um reload
    port: 3000,// porta que o srvido está rodando
    open: true// sempre que eu rodar o processo de build, o browser será aberto automáticamente
  }))
})

/*Essa funcão trecho de código é responsável por chamar apenas os arquivos que sofrerem a
alteração, nele foi feito um callback usando a função arrow, o watch monitora os arquivos, se sofrerem um buils a aplicação sofre um restart*/
gulp.task('watch', function() {
  watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
      watch('app/**/*.js', () => gulp.start('app.js'))
        watch('assets/**/*.*', () => gulp.start('app.assets'))
})//se os arquivos foram alterados
