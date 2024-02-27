import selectorBemPattern from '../index.js'
const ruleName = selectorBemPattern.ruleName;

// Just a couple of quick tests to ensure postcss-bem-linter
// is getting the hard work done

testRule({
  plugins: ['.'],
  ruleName,
  config: {preset: 'suit' },

  accept: [
    { code: '/** @define Foo */ .Foo {}' },
    { code: '/** @define Foo */ .Foo-bar {}' },
  ],

  reject: [
    {
      code: '/** @define Foo */ .false {}',
      message: 'Invalid component selector ".false" (' + selectorBemPattern.ruleName + ')',
      line: 1,
      column: 20,
    },
    {
      code: '/** @define Foo */ .Foo_bar {}',
      message: 'Invalid component selector ".Foo_bar" (' + selectorBemPattern.ruleName + ')',
      line: 1,
      column: 20,
    },
  ],
});

testRule({
  plugins: ['.'],
  ruleName,
  config: {
    componentName: '^[a-zA-Z]+$',
    componentSelectors: '^\\.{componentName}---thing$',
  },

  accept: [
    { code: '/** @define Foo */\n  .Foo---thing {}' },
  ],

  reject: [
    {
      code: '/** @define Foo2 */',
      message: 'Invalid component name in definition /*/** @define Foo2 */*/ (' + selectorBemPattern.ruleName + ')',
      line: 1,
      column: 1,
    },
    {
      code: '/** @define Foo */\n  .Foo-thing {}',
      message: 'Invalid component selector ".Foo-thing" (' + selectorBemPattern.ruleName + ')',
      line: 2,
      column: 3,
    },
  ],
});

testRule({
  plugins: ['.'],
  ruleName,
  config: {
    preset: 'suit',
    presetOptions: {
      namespace: 'qz',
    },
  },

  accept: [
    { code: '/** @define Foo */\n  .qz-Foo--thing {}' },
  ],

  reject: [
    {
      code: '/** @define Foo */\n  .Foo-thing {}',
      message: 'Invalid component selector ".Foo-thing" (' + selectorBemPattern.ruleName + ')',
      line: 2,
      column: 3,
    },
    {
      code: '/** @define Foo */\n  .qz-Boooo-thing {}',
      message: 'Invalid component selector ".qz-Boooo-thing" (' + selectorBemPattern.ruleName + ')',
      line: 2,
      column: 3,
    },
  ],
});

testRule({
  plugins: ['.'],
  ruleName,
  config: null,

  accept: [
    {
      code: '/** @define Foo */\na {}',
    },
  ],
});
