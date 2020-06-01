import test from 'ava';
import render from '../lib/index.js';


const pugString = `
div.text-center
  :md(inline tag='h1' class='text-lg text-red')
    This is *Markdown*
`;


const expected = `<div class="text-center"><h1 class="text-lg text-red">This is <em>Markdown</em></h1></div>`;


test('Renders Markdown inside Pug', async (t) => {
  const result = render(pugString).trim();

  t.is(result, expected);
});
