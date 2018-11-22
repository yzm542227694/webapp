const gulp = require('gulp')
const Config = require('./gulpfile.config')

const imagemin = require('gulp-imagemin') //图片压缩
const rename = require('gulp-rename') // 重命名
const gif = require('gulp-if') // gulp条件判断
const uglify = require('gulp-uglify') // js代码压缩
const babel = require('gulp-babel') // es6转es5
const browserify = require('gulp-browserify') // js模块化
const stylus = require('gulp-stylus') // stylus
const autoprefixer = require('gulp-autoprefixer') // css 补全
const cssnano = require('gulp-cssnano') // css压缩
const htmlmin = require('gulp-htmlmin') // html压缩
const rev = require('gulp-rev') // 对文件名加md5后缀
const revCollector = require('gulp-rev-collector') // 路径替换
const gulpRemoveHtml = require('gulp-remove-html') //标 签清除，参考：https://www.npmjs.com/package/gulp-remove-html
const removeEmptyLines = require('gulp-remove-empty-lines') //清除空白行，参考：https://www.npmjs.com/package/gulp-remove-empty-lines

module.exports = function (reloadFn) {
    gulp.task('image', function () {
        return gulp.src(Config.image.src)
            .pipe(imagemin({
                optimizationLevel: 3
                , progressive: true
                , interlaced: true
            }))
            .pipe(gulp.dest(Config.image.dist))
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // js处理
    gulp.task('js', function () {
        return gulp.src(Config.js.src)
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gif(Config.is_prod, uglify()))
            .pipe(browserify())
            // .pipe(gif(Config.is_prod, rename({
            //     suffix: '.min'
            // })))
            .pipe(gif(Config.is_prod, rev())) // 添加md5后缀
            .pipe(gulp.dest(Config.js.dist))
            .pipe(gif(Config.is_prod, rev.manifest({
                path: './rev/rev-manifest.json',
                merge: true
            }))) // 生成一个rev-manifest.json
            .pipe(gif(Config.is_prod, gulp.dest('./'))) // 将 rev-manifest.json 保存到 rev 目录内
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // lib库处理
    gulp.task('lib', function () {
        return gulp.src(Config.lib.src)
            .pipe(gulp.dest(Config.lib.dist))
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // css处理
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe(gif(Config.is_prod, cssnano()))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // font处理
    gulp.task('font', function () {
        return gulp.src(Config.font.src)
            .pipe(gulp.dest(Config.font.dist))
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // stylus处理
    gulp.task('stylus', function () {
        return gulp.src(Config.stylus.src)
            .pipe(stylus())
            .pipe(autoprefixer('last 2 version'))
            .pipe(gif(Config.is_prod, cssnano()))
            .pipe(gif(Config.is_prod, rev())) // 添加md5后缀
            .pipe(gulp.dest(Config.stylus.dist))
            .pipe(gif(Config.is_prod, rev.manifest({
                path: './rev/rev-manifest.json',
                merge: true
            }))) // 生成一个rev-manifest.json
            .pipe(gif(Config.is_prod, gulp.dest('./'))) // 将 rev-manifest.json 保存到 rev 目录内
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // untils处理
    gulp.task('untils', function () {
        return gulp.src(Config.untils.src)
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(browserify())
            .pipe(gif(Config.is_prod, rename({
                suffix: '.min'
            })))
            .pipe(gif(Config.is_prod, uglify()))
            .pipe(gulp.dest(Config.untils.dist))
            .pipe(gif(!Config.is_prod, reloadFn({
                stream: true
            })))
    })

    // html处理
    gulp.task('html', function () {
        if (Config.is_prod) {
            const htmlminOptions = {
                removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            }
            return gulp.src(['./rev/rev-manifest.json', `${Config.html.src}`])
                .pipe(revCollector({
                    replaceReved: true
                }))
                .pipe(gulpRemoveHtml())
                .pipe(removeEmptyLines())
                .pipe(htmlmin(htmlminOptions))
                .pipe(gulp.dest(Config.html.dist))
        } else {
            return gulp.src(Config.html.src)
                .pipe(gulp.dest(Config.html.dist))
                .pipe(gif(!Config.is_prod, reloadFn({
                    stream: true
                })))
        }
    })
}

