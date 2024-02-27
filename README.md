# stylelint-selector-bem-pattern

[![NPM version](http://img.shields.io/npm/v/stylelint-selector-bem-pattern.svg)](https://www.npmjs.com/package/stylelint-selector-bem-pattern) [![Build Status](https://github.com/simonsmith/stylelint-selector-bem-pattern/actions/workflows/ci.yml/badge.svg)](https://github.com/simonsmith/stylelint-selector-bem-pattern/actions/workflows/ci.yml)

A [stylelint](https://github.com/stylelint/stylelint) plugin that incorporates [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter).

To learn more about postcss-bem-linter, please read [that module's documentation](https://github.com/postcss/postcss-bem-linter).

## Installation

```
npm install stylelint-selector-bem-pattern
```

## Usage

Add it to your stylelint config `plugins` array, then add `"plugin/selector-bem-pattern"` to your rules,
specifying your postcss-bem-linter settings as the primary option.

Even though postcss-bem-linter has the default setting of `{ preset: 'suit' }`, this plugin has
no default setting: if you want to use the SUIT preset, you must pass `{ preset: 'suit' }`,
and the rule will not work if you do not pass a primary option object.

Like so:

```js
// .stylelintrc
{
  "plugins": [
    "stylelint-selector-bem-pattern"
  ],
  "rules": {
    // ...
    "plugin/selector-bem-pattern": {
      "componentName": "[A-Z]+",
      "componentSelectors": {
        "initial": "^\\.{componentName}(?:-[a-z]+)?$",
        "combined": "^\\.combined-{componentName}-[a-z]+$"
      },
      "utilitySelectors": "^\\.util-[a-z]+$"
    },
    // ...
  }
}
```

For more examples of postcss-bem-linter configuration possibilities,
please read [that module's documentation](https://github.com/postcss/postcss-bem-linter).
Keep in mind that if your stylelint config is JSON you will have to use strings to
specify your selector patterns (as above).
