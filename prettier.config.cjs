module.exports = {
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 120,
  quoteProps: 'consistent',
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
