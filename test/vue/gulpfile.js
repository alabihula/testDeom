var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
px2rem = require('postcss-px2rem'),
sass = require('gulp-sass'),
csso = require('gulp-csso'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
clean = require('gulp-clean'),
rjs = require('gulp-requirejs'),
rjs_ = require('gulp-rjs'),
rjs__ = require('requirejs'),
optimize = require('amd-optimize'),
module = require('./module.js'),
moduleTem = cloneOriginal(module),
watch =  require('gulp-watch'),
babel = require('gulp-babel');
plumber = require('gulp-plumber');
changed = require('gulp-changed');

function cloneOriginal(obj) {
	if(typeof obj != "object" && obj != null || obj == null) return obj;
	var temObj = obj.constructor === Array?[]:{};
	for(var key in obj) {
		temObj[key] = cloneOriginal(obj[key]);
	}
	return temObj;
}

var baseUrl = './app';
var distUrl = './dist';

gulp.task('px2rem', function() {
	var processors = [px2rem({
		remUnit: 75
	})];
	return gulp.src('./css/*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest(distUrl));
});


function doModuleJs(config) {
    return rjs(config.rjs)
    .pipe(gulp.dest(distUrl));
}
function doModuleOtherPath(config) {
    //html其他js
    return gulp.src(config.otherPath.src.html)
    .pipe(gulp.dest(config.dist));
}

gulp.task('module-rjs', function() {
	for(var key in module) {
		doModuleJs(module[key]);
	}
	module = cloneOriginal(moduleTem);
})

gulp.task('module-html', function() {
	for(var key in module) {
		doModuleOtherPath(module[key]);
	}
});

//合并模块输出到dist
gulp.task('rjs-module1', function() {
    return rjs({
        baseUrl: './app/js/',
        paths: {
	        jquery: 'jquery-3.1.1.min',
	        commons:'commons',
	        vue:'vue.min',
	        uploadImg:'uploadImg',
	        fastjs:'fastclick',
	        action_appeal:'action-appeal'
	    },
        name:'main-appeal',
        out: 'js/main-appeal.js',
    })
    .pipe(gulp.dest(distUrl));
});

//合并模块输出到dist
gulp.task('rjs-module2', function() {
    return rjs({
        baseUrl: './app/js/',
        paths: {
	        vue:'vue.min',
        	action_appeal2:'action-appeal2'
	    },
        name:'main-appeal2',
        out: 'js/main-appeal2.js',
    })
    .pipe(gulp.dest(distUrl));
});

//合并模块输出到dist
gulp.task('rjs', function() {
    return rjs({
        baseUrl: './app/js',
        paths: {
	        jquery: 'jquery-3.1.1.min',
	        weixin: 'jweixin',
	        commons:'commons',
	        video:'video.min',
	        vue:'vue.min',
	        share:'share',
	        qrcode:'qrcode',
	        fastjs:'fastclick',
	        action:'action'
	    },
        name:'main',
        out: 'js/main.js',
    })
    .pipe(gulp.dest(distUrl));
});

gulp.task('es5',function() {
	return gulp.src('app/js/action.js')
	.pipe(plumber())
    .pipe(babel({
      presets: [
		  ["env", {
			"targets": {
			  "browsers": ["Chrome <=25","ie <= 8"]
			}
		  }]
		]
	}))
    .pipe(gulp.dest('dist/js'))
})

//js
gulp.task('scripts',['es5'],function() {
    return gulp.src([
		'app/js/*.js',
		'!app/js/action.js'
    ])
    .pipe(gulp.dest(distUrl+"/js"));
});

//html
gulp.task('html', function() {
    return gulp.src([
        'app/*.html'
    ])
    .pipe(gulp.dest(distUrl));
});

//img
gulp.task('img', function() {
    return gulp.src([
        'app/img/**',
    ])
    .pipe(gulp.dest(distUrl+"/img"));
});

//json
gulp.task('json', function() {
    return gulp.src([
        'app/js/testUrl/**',
    ])
    .pipe(gulp.dest(distUrl+"/js/testUrl"));
});

// 拷贝所有文件
gulp.task('copy', function () {
  return gulp.src([
    'app/css/icon/**',
    '!app/css/_*.*',
    '!app/js/_*.*',
    '!app/img/**/*bak*.*'
  ], {
    base: 'app'
  })
  .pipe(gulp.dest('dist'));
});


// 压缩 css
gulp.task('csso', ['sass'],function () {
  return gulp.src(distUrl+'/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest(distUrl+'/css'));
});

// Sass 编译成 css
gulp.task('sass', function() {
  var processors = [px2rem({remUnit: 75})];
  return gulp.src(baseUrl+'/css/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(distUrl+'/css'));
});

gulp.task('serve', function() {
    var port = Math.floor(Math.random()*10000) 
	  port = (port>1024? port: Math.floor(Math.random()*10000));
	  port = 3333;
	  browserSync.init({
	    server: {
	      baseDir: distUrl,
	      directory: true
	    },
	    port: port,
	    ui: {
	      port: port + 1
		},
		browser: "chrome"
	  });
	gulp.watch(baseUrl+'/css/*.scss', ['csso']);
	gulp.watch(baseUrl+'/*.html', ['html']);
	gulp.watch(baseUrl+'/img/**', ['img']);
	gulp.watch(baseUrl+'/js/*.js', ['scripts']);
	gulp.watch(baseUrl+'/js//testUrl/*.json', ['json']);
	gulp.watch([
	  distUrl+'/*.html',
	  distUrl+'/css/*.css',
	  distUrl+'/js/*.js',
	  distUrl+'/testUrl/*.json',
	  distUrl+'/img/**'
	]).on('change', browserSync.reload);
});
gulp.task('serve-module', function() {
    var port = Math.floor(Math.random()*10000) 
	  port = (port>1024? port: Math.floor(Math.random()*10000));
	  port = 5555;
	  browserSync.init({
	    server: {
	      baseDir: distUrl,
	      directory: true
	    },
	    port: port,
	    ui: {
	      port: port + 1
		},
		browser: "chrome"
	  });
	gulp.watch(baseUrl+'/css/*.scss', ['csso']);
	gulp.watch(baseUrl+'/module*/*.js',['module-rjs']);
	gulp.watch(baseUrl+'/module*/*.html', ['module-html']);
	gulp.watch(baseUrl+'/img/**', ['img']);
	gulp.watch([
	  distUrl+'/module*/*.html',
	  distUrl+'/css/*.css',
	  distUrl+'/module*/*.js',
	  distUrl+'/module*/testUrl/*.json',
	  distUrl+'/img/**'
	]).on('change', browserSync.reload);
});

// 监听分享
gulp.task('app',['copy','json','scripts','html','img','csso'], function() {
	gulp.start('serve');
});

