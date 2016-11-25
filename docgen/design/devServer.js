// this file will start a browsersync server that will serve /docs
// it will automatically inject any css
// it will also use webpack and watch/build/hot reload

import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compression from 'compression';
import {rootPath} from '../path.js';
import {join} from 'path';
import {watch} from 'chokidar';
import {render} from 'node-sass';
import postcss from 'postcss';
import syntax from 'postcss-scss';
import autoprefixer from 'autoprefixer';
import {writeFile} from 'fs';

const source = rootPath('docgen/design/');

const generateStylesheet = () => {
  const sourceStylesheet = join(source, 'stylesheets/index.scss');
  const builtStylesheet = join(source, 'index.css');
  const processor = postcss([autoprefixer]);
  render({
    file: sourceStylesheet,
  }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    processor.process(result.css, {syntax})
      .then(({css: prefixedCss}) => writeFile(builtStylesheet, prefixedCss))
      .catch(err => console.error(err));
  });
};

watch([
  join(source, 'stylesheets/**/*'),
], {
  ignoreInitial: true,
})
  .on('all', generateStylesheet)
  .on('error', err => {
    throw err;
  });

generateStylesheet();

const {
  optimize: {OccurenceOrderPlugin},
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
} = webpack;

const webpackConfig = {
  devtool: 'source-map', // a lot faster than 'source-map', not ok for production though
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      join(source, 'index.js'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style?insertAt=top',
      },
      {
        test: /\.css$/,
        loader: 'css',
        query: {
          modules: true,
          importLoaders: 1,
          localIdentName: 'ais-[name]__[local]',
        },
      }],
  },
  resolve: {
    alias: {
      'react-instantsearch': rootPath('packages/react-instantsearch/'),
    },
  },
  output: {
    path: source,
    publicPath: '/',
    filename: '[name]-build.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new OccurenceOrderPlugin(), // spelling mistake fixed in webpack 2.0
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ],
};

const compiler = webpack(webpackConfig);
const bs = browserSync.create();
bs.init({
  server: source,
  open: false,
  files: [
    `${source}**/index.css`,
    `${source}**/index.html`,
  ],
  watchOptions: {
    awaitWriteFinish: {
      stabilityThreshold: 150, // wait 150ms for the filesize to be stable (= write finished)
    },
  },
  notify: {
    styles: {
      bottom: 0,
      top: 'auto',
    },
  },
  middleware: [
    compression(),
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
    webpackHotMiddleware(compiler),
  ],
});
