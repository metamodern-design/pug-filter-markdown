import markdownIt from 'markdown-it';


const pugFilterMarkdown = (content, {
  linkify = true,
  typographer = true,
  inline = false,
  ...options
}) => {
  const md = markdownIt({ linkify, typographer, ...options });
  const html = inline ? md.renderInline(content) : md.render(content);
  
  if (options.tag || options.class || options.attrs) {
    const tag = options.tag || 'div';
    const classAttr = options.class ? ` class="${options.class}"` : '';
    const otherAttrs = options.attrs ? ` ${options.attrs}` : '';
    return `<${tag}${classAttr}${otherAttrs}>${html}</${tag}>`
  }
  
  return html;
};


export default pugFilterMarkdown;
