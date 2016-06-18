/* esLint no-console: off */
/* eslint-plugin-disable angular */

import gulp     from 'gulp';
import eslint   from 'gulp-eslint';
import webpack  from 'webpack';
import path     from 'path';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import yargs    from 'yargs';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

(function gulptask() {
  const root = 'client';

// helper method for resolving paths
// app/{glob}
  const resolveToApp = (glob = '') => path.join(root, 'app', glob);

// app/components/{glob}
  const resolveToComponents = (glob = '') => path.join(root, 'app/components', glob);

// map of all paths
  const paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    styl: resolveToApp('**/*.styl'), // stylesheets
    html: [
      resolveToApp('**/*.html'),
      path.join(root, 'index.html'),
    ],
    entry: path.join(__dirname, root, 'app/app.js'),
    output: root,
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  };

// use webpack.config.js to build modules
  gulp.task('webpack', (cb) => {
    const config = require('./webpack.dist.config'); // eslint-disable-line global-require
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true,
      }));

      cb();
    });
  });

// development task
  gulp.task('serve', () => {
    const config = require('./webpack.dev.config'); // eslint-disable-line global-require
    config.entry.app = [
      // this modules required to make HRM working
      // it responsible for all this webpack magic
      'webpack-hot-middleware/client?reload=true',
      // application entry point
      paths.entry,
    ];

    const compiler = webpack(config);
    serve({
      port: process.env.PORT || 3000,
      open: false,
      server: { baseDir: root },
      middleware: [
        historyApiFallback(),
        webpackDevMiddelware(compiler, {
          stats: {
            colors: colorsSupported,
            chunks: false,
            modules: false,
          },
          publicPath: config.output.publicPath,
        }),
        webpachHotMiddelware(compiler),
      ],
    });
  });

// linting task
  gulp.task('lint', () =>
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );

  gulp.task('component', () => {
    const cap = (val) => val.charAt(0).toUpperCase() + val.slice(1);
    const name = yargs.argv.name;
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToComponents(), parentPath, name);

    return gulp.src(paths.blankTemplates)
      .pipe(template({
        name,
        upCaseName: cap(name),
      }))
      .pipe(rename(() => {
        path.basename = path.basename.replace('temp', name);
      }))
      .pipe(gulp.dest(destPath));
  });

  gulp.task('default', ['serve']);
}());
