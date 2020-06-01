# @metamodern/pug-filter-markdown

*A custom [Pug filter](https://pugjs.org/language/filters.html) to render Markdown (with options)*

## Install

```sh
npm i @metamodern/pug-filter-markdown

```

## Usage

This package is released as an ES module only. Minimum Node.js version is 12 (latest LTS as of release date). CommonJS `require()` is not supported.

```js

// render.js

import pug from 'pug';
import pugFilterMarkdown from '@metamodern/pug-filter-markdown';

const html = pug.renderFile('path/to/file.pug', {
  filters: {
    md: pugFilterMarkdown,
  },
});


// file.pug

div.text-center
  :md(inline tag='h1' class='text-lg text-red')
    This is *Markdown*
  

```

## API

The module's default export is a function with the following parameters:

```ts
function(content: string, {
  linkify = true,
  typographer = true,
  inline = false,
  ...options
} = {}): string

```

#### Required

- __content__: the Markdown string to be rendered to HTML

#### Rendering Options

For details, see the [markdown-it docs](https://github.com/markdown-it/markdown-it#usage-examples) and [live demo](https://markdown-it.github.io/).

- __linkify__: autoconvert URL-like text to links
- __typographer__: enable some language-neutral replacement and quotes beautification
- __inline__: render a single line without paragraph wrap

#### Wrapping Options

When one or more of the following options is passed, rendered paragraphs or inline text will be wrapped in an enclosing element. The tag defaults to `div` when only *class* or *attrs* is defined.

- __tag__: sets the HTML tag of the enclosing element (e.g., 'article')
- __class__: set the class attribute on the enclosing element (using space-separated class names)
- __attrs__: set additional attributes on the enclosing element (using space-separated *key="value"* assignments)

#### Further Customization

See the [markdown-it docs](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) for additional options that may be passed to the rendering function.
