# Index File Generator

## Description

By default, [Node.js will look for a index.js file](https://nodejs.org/api/modules.html#modules_folders_as_modules) in a folder to try to find exported modules. This can be handy as projects get more complex and your library's exports become more verbose and deeply nested.

For example importing a module from a library with the following directory structure...

```bash
my-cool-project
    src
        module
            module_1
                foo.js
            module_2
                bar.js
```

would look like

```javascript
    import foo from 'my-cool-project/src/module/module_1/foo'
```

However, if we generate an index file in the `module` directory

```bash
my-cool-project
    src
    module
        module_1
            foo.js
        module_2
            bar.js
        index.js
```

and create the following index file

```javascript
    export foo from './module_1/foo.js'
    export bar from './module_2/bar.js'
```

we can now import those modules like so

```javascript
    import {foo, bar} from 'my-cool-project/src/module'
```

Shorter import paths are easier to remember and to type, saving time and effort when a consumer is using your library.

The issue is we are now stuck manually updating all of our project's index.js files whenever we rename, add or remove a component. This quickly gets tedious as your library grows.

`index-file-generator` is a command line utility that seamlessly manages the generation of index files in your Node.js project. Simply add a command to your current build process, and `index-file-generator` will take care of the rest.

## Versioning

`index-file-generator` follows [Semantic Versioning](https://semver.org/). These components strictly adhere to the `[MAJOR].[MINOR].[PATCH]` numbering system (also known as `[BREAKING].[FEATURE].[FIX]`).

Merges to the `master` branch will be published as a prerelease. Prereleases will include an **rc** version (_e.g._ `[MAJOR].[MINOR].[PATCH]-rc.[RC]`).

## Known Issues

Please see [Issues](https://github.com/mobot11/index-file-generator/issues).

## Support

If you encounter an issue or want to request a feature, you can [create an issue](https://github.com/mobot11/index-file-generator/issues/new).

## License

MIT