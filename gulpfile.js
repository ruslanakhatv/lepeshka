var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		gcmq          = require('gulp-group-css-media-queries'),
    	smartgrid     = require('smart-grid');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))

	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gcmq())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/fancybox/dist/jquery.fancybox.js',
		'app/libs/wow/dist/wow.js',
		'app/libs/flickity/flickity.pkgd.min.js',
		'app/js/common.js' // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'p252776@p252776.ftp.ihc.ru',
		destination: 'www/privolye.rusart-media.ru',
		 // include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});



gulp.task('smartgrid', function() {
    var settings = {
        outputStyle: 'sass', /* less || scss || sass || styl */
        columns: 12, /* number of grid columns */
        offset: '30px', /* gutter width px || % || rem */
        mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
        container: {
            maxWidth: '1200px', /* max-width оn very large screen */
            fields: '30px' /* side fields */
        },
        breakPoints: {
            xl: {
                width: '1600px'
            },
            lg: {
                width: '1440px' /* -> @media (max-width: 1100px) */
            },
            md: {
                width: '1280px'
            },
            sm: {
                width: '780px',
                fields: '15px' /* set fields only if you want to change container.fields */
            },
            xs: {
                width: '560px'
            }
            /*
            We can create any quantity of break points.

            some_name: {
                width: 'Npx',
                fields: 'N(px|%|rem)',
                offset: 'N(px|%|rem)'
            }
            */
        }
    };
    smartgrid('app/sass', settings);
});


gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
