const SRC_DIR = './src/'
const DIST_DIR = './dist/'
const DIST_FILES = `${DIST_DIR}/**`
const IS_PROD = require('minimist')(process.argv.slice(2)).prod

const CONFIG = {
    is_prod: IS_PROD,
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    image: {
        src: `${SRC_DIR}imgs/**/*`,
        dist: `${DIST_DIR}imgs`
    },
    js: {
        src: `${SRC_DIR}js/**/*`,
        dist: `${DIST_DIR}js`
    },
    lib: {
        src: `${SRC_DIR}lib/**/*`,
        dist: `${DIST_DIR}lib`
    },
    stylus: {
        src: `${SRC_DIR}stylus/**/*`,
        dist: `${DIST_DIR}css`
    },
    css: {
        src: `${SRC_DIR}css/**/*`,
        dist: `${DIST_DIR}css`
    },
    font: {
        src: `${SRC_DIR}font/**/*`,
        dist: `${DIST_DIR}font`
    },
    untils: {
        src: `${SRC_DIR}untils/**/*`,
        dist: `${DIST_DIR}untils`
    },
    html: {
        src: `${SRC_DIR}*.html`,
        dist: DIST_DIR
    }
}

module.exports = CONFIG
