import test from 'ava';
import pug from 'pug';
import md from '../lib/index.js';


const render = (str) => {
  const html = pug.render(str, {
    filters: { md },
  });
  
  return html.trim().replace('\n', '');
};


test('Renders single paragraph', async (t) => {
  t.is(
    render('div\n  :md\n    This is *Markdown*'),
    '<div><p>This is <em>Markdown</em></p></div>',
  );
});


test('Renders multiple paragraphs', async (t) => {
  t.is(
    render('div\n  :md\n    Hello, World!\n\n    This is *Markdown*'),
    '<div><p>Hello, World!</p><p>This is <em>Markdown</em></p></div>',
  );
});


test('Renders inline Markdown', async (t) => {
  t.is(
    render('h1\n  :md(inline)\n    This is *Markdown*'),
    '<h1>This is <em>Markdown</em></h1>',
  );
});


test('Wraps when tag option is passed', async (t) => {
  t.is(
    render('div\n  :md(tag=`section`)\n    This is *Markdown*'),
    '<div><section><p>This is <em>Markdown</em></p></section></div>',
  );
  t.is(
    render('div\n  :md(inline tag=`h1`)\n    This is *Markdown*'),
    '<div><h1>This is <em>Markdown</em></h1></div>',
  );
});


test('Wraps when class option is passed', async (t) => {
  t.is(
    render('div\n  :md(class=`text-lg text-blue`)\n    This is *Markdown*'),
    '<div><div class="text-lg text-blue"><p>This is <em>Markdown</em></p></div></div>',
  );
});


test('Wraps when attrs option is passed', async (t) => {
  t.is(
    render('div\n  :md(attrs=`id="abc" title="hello"`)\n    This is *Markdown*'),
    '<div><div id="abc" title="hello"><p>This is <em>Markdown</em></p></div></div>',
  );
});


test('Linkify is on unless disabled', async (t) => {
  t.is(
    render('div\n  :md\n    Check out: https://metamodern.design'),
    '<div><p>Check out: <a href="https://metamodern.design">https://metamodern.design</a></p></div>',
  );
  t.is(
    render('div\n  :md(linkify=false)\n    Check out: https://metamodern.design'),
    '<div><p>Check out: https://metamodern.design</p></div>',
  );
});


test('Typographer is on unless disabled', async (t) => {
  t.is(
    render('div\n  :md\n    "Cogito, ergo sum." ---Descartes'),
    '<div><p>“Cogito, ergo sum.” —Descartes</p></div>',
  );
  t.is(
    render('div\n  :md(typographer=false)\n    "Cogito, ergo sum." ---Descartes'),
    '<div><p>"Cogito, ergo sum." ---Descartes</p></div>',
  );
});
