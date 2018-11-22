const gulp = require('gulp')
const Config = require('./build/gulpfile.config')
const gulpTasks = require('./build/gulpfile.tasks')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const runSequence = require('gulp-sequence')

gulpTasks(reload)

gulp.task('start', function (cb) {
    runSequence('image', 'js', 'stylus','css','font', 'untils', 'html', cb)
    if (!Config.is_prod) {
        // 开发环境
        browserSync.init({
            server: {
                baseDir: Config.dist
            }
            , notify: false
        })
        gulp.watch(Config.image.src, ['image'])
        gulp.watch(Config.js.src, ['js'])
        gulp.watch(Config.stylus.src, ['stylus'])
        gulp.watch(Config.untils.src, ['untils'])
        gulp.watch(Config.html.src, ['html'])
    }
})

// gulp.task('dev', ['image', 'js', 'stylus','css','font', 'untils', 'html'], function () {
//     // 开发环境
//     browserSync.init({
//         server: {
//             baseDir: Config.dist
//         }
//         , notify: false
//     })
//     gulp.watch(Config.image.src, ['image'])
//     gulp.watch(Config.js.src, ['js'])
//     gulp.watch(Config.stylus.src, ['stylus'])
//     gulp.watch(Config.untils.src, ['untils'])
//     gulp.watch(Config.html.src, ['html'])
// })
