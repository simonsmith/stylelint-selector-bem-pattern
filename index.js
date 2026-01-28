import Result from 'postcss/lib/result';
import stylelint from 'stylelint';
import bemLinter from 'postcss-bem-linter';

const ruleName = 'plugin/selector-bem-pattern';

const isStringOrRegExp = (x) => typeof x === 'string' || x instanceof RegExp;
const isStringOrFunction = (x) => typeof x === 'string' || typeof x === 'function';

const optionsSchema = {
  preset: ['suit', 'bem'],
  presetOptions: () => true, // Can't currently validate `presetOptions`
  componentName: [isStringOrRegExp],
  componentSelectors: [(pattern) => {
    if (isStringOrFunction(pattern)) return true;
    if (!pattern.initial || !isStringOrFunction(pattern.initial)) return false;
    return !pattern.combined || isStringOrFunction(pattern.combined);
  }],
  implicitComponents: [
    (x) => typeof x === 'boolean',
    (x) => typeof x === 'string',
    (pattern) => Array.isArray(pattern) && pattern.every((x) => typeof x === 'string'),
  ],
  implicitUtilities: [
    (x) => typeof x === 'boolean',
    (x) => typeof x === 'string',
    (pattern) => Array.isArray(pattern) && pattern.every((x) => typeof x === 'string'),
  ],
  utilitySelectors: [isStringOrRegExp],
  ignoreSelectors: [
    isStringOrRegExp,
    (pattern) => {
      if (!Array.isArray(pattern)) {
        return isStringOrRegExp(pattern);
      }
      return pattern.every(isStringOrRegExp);
    },
  ],
  ignoreCustomProperties: [
    isStringOrRegExp,
    (pattern) => {
      if (!Array.isArray(pattern)) {
        return isStringOrRegExp(pattern);
      }
      return pattern.every(isStringOrRegExp);
    },
  ],
};

export default stylelint.createPlugin(ruleName, (options) => {
  return (root, result) => {
    if (!options) return;
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: options,
      possible: optionsSchema,
    });
    if (!validOptions) return;

    const bemLinterResult = new Result();
    bemLinter(options).Once(root, { result: bemLinterResult });
    const bemLinterWarnings = bemLinterResult.warnings();

    bemLinterWarnings.forEach((warning) => {
      const node = warning.node || root;
      stylelint.utils.report({
        ruleName,
        result,
        node,
        index: 0,
        endIndex: node.selector !== undefined ? node.selector.length : 0,
        message: warning.text + ' (' + ruleName + ')',
      });
    });
  };
});
