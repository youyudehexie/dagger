import markdown from 'markdown-it';

const parser = markdown({
  html: true,
  typographer: true
})

export default parser;

