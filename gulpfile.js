const gulp = require("gulp"),
    concat = require("gulp-concat"),
    csso = require("gulp-csso"),
    uglify = require("gulp-uglify"),
    min_html = require("gulp-minify-html"),
    rimraf = require("rimraf"),
    watch = require("gulp-watch"),
    spawn = require("child_process").spawn;
var node = undefined;
gulp.task("html", () => {
    gulp.src(`${__dirname}/build/views/*.html`)
        .pipe(min_html())
        .pipe(gulp.dest(`${__dirname}/prod/views`));
    gulp.src(`${__dirname}/build/index.html`)
        .pipe(min_html())
        .pipe(gulp.dest(`${__dirname}/prod`));
});
gulp.task("css", () => {
    gulp.src(`${__dirname}/build/assets/css/*.css`)
        .pipe(concat("combined.css"))
        .pipe(csso())
        .pipe(gulp.dest(`${__dirname}/prod`));
});
gulp.task("javascript", () => {
    gulp.src(`${__dirname}/build/assets/js/*.js`)
        .pipe(concat("combined.js"))
        .pipe(gulp.dest(`${__dirname}/prod`));
    gulp.src(`${__dirname}/build/app.js`)
        .pipe(gulp.dest(`${__dirname}/prod`));
})
gulp.task("lib", () => {
    gulp.src(`${__dirname}/build/assets/lib/*`)
        .pipe(gulp.dest(`${__dirname}/prod/lib`));
})
gulp.task("framework", () => {
    gulp.src(`${__dirname}/build/assets/framework/*.*`)
        .pipe(gulp.dest(`${__dirname}/prod/framework`));
})
gulp.task("compile", ["html", "css", "javascript", "lib", "framework"]);
gulp.task("serve", () => {
    rimraf(`${__dirname}/prod`, () => {
        gulp.start('compile');
        if(node) {
            node.kill();
        }
        node = spawn("node", [`${__dirname}/index.js`]);
        node.on("close", (code) => {
            if(code == 8) {
                gulp.log("Error detected, waiting for changes");
            }
        })
    });
})
gulp.task("listen", () => {
    gulp.start("serve");
    watch([
        `${__dirname}/index.js`, 
        `${__dirname}/build/**/*.js`, 
        `${__dirname}/build/**/*.css`, 
        `${__dirname}/build/**/*.html`
    ], () => {
        gulp.start("serve");
    });
});