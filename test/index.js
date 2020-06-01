import test from 'ava';
import pug from 'pug';
import md from '../lib/index.js';


const render = (str) => pug.render(str, {
  filters: { md },
}).trim();


const pugString = `
div.text-center
  :md(inline tag='h1' class='text-lg text-red')
    This is *Markdown*
`;


const expected = `<div class="text-center"><h1 class="text-lg text-red">This is <em>Markdown</em></h1></div>`;


test('Renders single paragraph', async (t) => {
  t.is(
    render('div\n  :md\n    This is *Markdown*'),
    '<div><p>This is <em>Markdown</em></p></div>',
  );
});


test('Renders multiple paragraphs', async (t) => {
  t.is(
    render('div\n  :md\n    Hello, World!\n    This is *Markdown*'),
    '<div><p>Hello, World!</p><p>This is <em>Markdown</em></p></div>',
  );
});


test('Renders inline Markdown', async (t) => {
  t.is(
    render('h1\n  :md\n    This is *Markdown*'),
    '<h1>This is <em>Markdown</em></h1>',
  );
});
