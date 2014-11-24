Alchemist-Common
================

This is a collection of commonly used color-spaces and color-modifiers curated
for the `alchemist.js` color library. If you have an issue with any of the included
color-spaces or modifiers, please reference that individual plugin's repository.

Included Plugins
----------------

### Color Spaces

1. [xyz](https://github.com/webdesserts/alchemist-xyz)
2. [rgb](https://github.com/webdesserts/alchemist-rgb)
3. [hsl](https://github.com/webdesserts/alchemist-hsl)
4. [lab](https://github.com/webdesserts/alchemist-lab)

### Modifiers

[coming soon]

Usage
-----

### Node

By default `alchemist-common` is included in `alchemist-js` via the `alchemist.common()` function.

```js
  var alchemist = require('alchemist-js').create()
  alchemist.use(alchemist.common())
  var color = alchemize.rgb(255,255,255)
```

### Web

[coming soon]
