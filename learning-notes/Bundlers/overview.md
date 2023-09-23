## [Rollup vs. Parcel vs. webpack: Which Is the Best Bundler?](https://betterprogramming.pub/the-battle-of-bundlers-6333a4e3eda9)

Bundler is a tool that recursively follows all imports from the entry point of your app and 
bundles them up into a single file.

### Configuration of the bundler

Parcel doesn’t require a config file at all. Just install Parcel and run Parcel build, and it 
will do everything for you out of the box.

webpack and Rollup both require a config file specifying entry, output, loaders, plugins, 
transformations, etc. However, there’s a slight difference:

- Rollup has node polyfills for import/export, but webpack doesn’t.
- Rollup has support for relative paths in config, but webpack doesn’t — which is why you use 
  `path.resolve` or `path.join`.

webpack config can get complex, but it provides extensive support for third-party imports, 
images, CSS preprocessors, and whatnot.

Since version 4.0.0, webpack does not require a configuration file to bundle your project. 
Nevertheless, it is incredibly configurable to better fit your needs.

### Dead code elimination

> Dead code elimination, or Tree shaking, as it’s often called, is very important to achieve 
> the optimum bundle size and hence app performance.

Parcel emerged as the winner here. Parcel supports tree shaking for both ES6 and CommonJS 
modules. This is revolutionary since most of the code in libraries on npm still uses CommonJS.

Rollup comes second in the race. Right out of the box, it statically analyzes the code you are 
importing and will exclude anything that isn’t actually used.

webpack requires some manual effort to enable tree-shaking:

- Use ES6 syntax (i.e. import and export).
- Set the SideEffects flag in your package.json.
- Include a minifier that supports dead code removal (eg: UglifyJSPlugin).

### Code splitting

Code splitting helps the browser lazy-load just the things that are needed to get the app 
running, dramatically improving the performance and UX.

webpack emerges the winner in this aspect, with minimal work and faster load time. It provides 
three approaches to enable code splitting available in webpack:

- Define entry points — Manually split code using entry configuration.
- Use the CommonsChunkPlugin to de-dupe and split chunks.
- Dynamic imports — use inline function calls within modules.

### Live reload

During development, it’s great if your app gets updated with fresh code that you write, instead 
of manually refreshing it to see the changes. A bundler with live reload capability does that 
refreshing for you.

Bundlers provide you with a run-time environment in addition to other utilities essential for 
debugging and development, in the form of a development server.

Parcel has been very thoughtful by having a development server built in, which will 
automatically rebuild your app as you change files. But there are issues associated with it 
when using HTTP logging, Hooks, and middleware.

When using Rollup, we need to install and `configurerollup-plugin-serve`, which will provide us 
with live reload functionality. However, it needs another plugin, `rollup-plugin-livereload`, to 
work. That means it’s not an independent plugin and comes with an extra dependency to run.

With webpack, you just need to add one plugin, called `webpack-dev-server`, which provides a 
simple development server with live reload functionality turned on by default. What’s better? 
You can use Hooks to do something after the dev server is up and running, add middleware, and 
also specify the file to serve when we run the dev server. This customisability of webpack 
trumps Rollup and Parcel.

### Hot module replacement

Hot module replacement (HMR) improves the development experience by automatically updating 
modules in the browser at run time without needing a whole page refresh. You can retain the 
application state as you make small changes in your code.

You might ask how HMR is different from live reload.

Well, live reloading reloads the entire app when a file changes. For example, if you were five 
levels deep into your app navigation and saved a change, live reloading would restart the app 
altogether and load it back to the landing/initial route.

Hot reloading, on the other hand, only refreshes the files that were changed while still 
maintaining the state of the app.

webpack has its own web server, called the `webpack-dev-server`, through which it supports HMR. 
It can be used in development as a live reload replacement.

While Parcel already had built-in support for hot module replacement, Rollup released a plugin 
`rollup-plugin-hotreload` last month to support hot reload.

### Module transformers

Bundlers generally know only how to read JS files. Transformers are essentially teachers who 
teach the bundler how to process files other than JS and add them to your app’s dependency 
graph and bundle.

```javascript
module.exports = (env) => {
  return {
    entry: './src/main.js',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: 'css-loader'
        },
      ]
    },
  }
}
```

For example, in the example above, you can see a webpack config having an instruction on how to 
read CSS between. It basically says, “Hey webpack, whenever you encounter a file 
that is resolved as `.css`, use `css-loader `imported above to read it and export it as a string.” 
Similarly, an HTML loader will tell webpack how to read the `.html` files it encounters in your 
app and export them as strings in your bundle.

Parcel handles the transformation process very smartly. Unlike Rollup and webpack, which need 
you to specify file types to transform, install and configure, plugins to transform them, 
Parcel provides built-in support for many common transforms and transpilers.

### In a Nutshell

Building a basic app and want to get it up and running quickly? Use Parcel.

Building a library with minimal third-party imports? Use Rollup.

Building a complex app with lots of third-party integrations? Need good code splitting, use of 
static assets, and CommonJs dependencies? Use webpack.

At the end of the day, it’s a personal call that every developer needs to make based on their 
requirements. It’s sort of like the difference between driving a car with an automatic 
transmission versus a stick shift. Sometimes you need the additional control and sometimes you 
don’t.
