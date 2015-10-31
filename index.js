var _ = require('lodash');
var utils = require('stylelint').utils;
var bemLinter = require('postcss-bem-linter');

var ruleName = 'stylelint-selector-bem-pattern';

var optionsSchema = {
  preset: ['suit', 'bem'],
  presetOptions: {
    namespace: [_.isString],
  },
  componentName: [isStringOrRegExp],
  componentSelectors: [function(pattern) {
    if (isStringOrFunction(pattern)) return true;
    if (!pattern.initial) return false;
    if (!isStringOrFunction(pattern.initial)) return false;
    if (pattern.combined && !isStringOrFunction(pattern.combined)) return false;
    return true;
  }],
  utilitySelectors: [isStringOrRegExp],
  ignoreSelectors: [
    isStringOrRegExp,
    function(pattern) {
      if (!_.isArray(pattern)) {
        return isStringOrRegExp(pattern);
      }
      return _.every(pattern, isStringOrRegExp);
    },
  ],
};

module.exports = function(options) {
  options = options || { preset: 'suit' };

  return function(root, result) {
    var validOptions = utils.validateOptions(result, ruleName, {
      actual: options,
      possible: optionsSchema,
    });
    if (!validOptions) return;

    var bemLinterWarnings = bemLinter.process(root.toString(), _.assign({}, options, {
      from: root.source.input.file || root.source.input.id,
    })).warnings();

    bemLinterWarnings.forEach(function(warning) {
      utils.report({
        ruleName: ruleName,
        result: result,
        node: warning.node,
        line: warning.line,
        column: warning.column,
        message: warning.text + ' (selector-bem-pattern)',
      });
    });
  };
};

function isStringOrRegExp(x) {
  return _.isString(x) || _.isRegExp(x);
}

function isStringOrFunction(x) {
  return _.isString(x) || _.isFunction(x);
}
