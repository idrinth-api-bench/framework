import {
  snakeCase,
} from 'change-case';
import {
  FIRST,
  STRING_LIMITER_REMOVAL_START,
  STRING_LIMITER_REMOVAL_LENGTH,
} from '../constants.js';
import language from '../helper/language.js';

export interface Param {
    name: string;
    type: string;
    default: string;
    value: string|number|boolean;
    envName: string;
}

const getEnv = (name: string, defaultValue: string,): string => {
  for (const key of Object.keys(process.env,)) {
    if (key.toUpperCase() === name) {
      return process.env[key];
    }
  }
  return defaultValue;
};
const commentAndAssignmentRegExp=/\/\*.+\*\/.+=.+/u;
const commentRegExp=/\/\*.+\*\/.+/u;
const assignmentRegExp=/.+=.+/u;
const commentOrAssignmentAtEndRegExp =/(\/\*.+\*\/)|(=.+$)/gu;
const whitespaceRegExp =/\s*/gu;
const beginningAssignmentRegExp=/^.+=/u;
const leadingOrTrailingWhitespaceRegExp=/(^\s*)|(\s*$)/gu;
const commentBlockOrWhitespaceRegExp=/(^.*\/\*)|(\*\/.+$)/gu;
const functionWhitespaceRegExp=/\s*function\s*/u;
const functionDetectionRegExp = /(^function\s*\()|(\)\s*\{.*\}\s*$)/gu;
const arrowFunctionDetectionRegExp = /(^\s*\()|(\)\s*=>\s*.*$)/gu;
const buildParameter = (parameter: string,): Param => {
  const value: Param = {
    name: '',
    type: 'string',
    default: '',
    value: '',
    envName: '',
  };
  const processCommentAndAssignment = () => {
    value.name = parameter
      .replace(commentOrAssignmentAtEndRegExp, '',)
      .replace(whitespaceRegExp, '',);
    value.default = parameter
      .replace(beginningAssignmentRegExp, '',)
      .replace(leadingOrTrailingWhitespaceRegExp, '',);
    value.type = parameter
      .replace(commentBlockOrWhitespaceRegExp, '',)
      .replace(whitespaceRegExp, '',)
      .toLowerCase();
  };
  const processComment = () => {
    value.name = parameter
      .replace(commentOrAssignmentAtEndRegExp, '',)
      .replace(whitespaceRegExp, '',);
    value.default = '';
    value.type = parameter
      .replace(commentBlockOrWhitespaceRegExp, '',)
      .replace(whitespaceRegExp, '',)
      .toLowerCase();
    if (value.type === 'boolean') {
      value.default = 'false';
    } else if (value.type === 'number') {
      value.default = '0';
    }
  };
  const processAssignment = () => {
    value.name = parameter
      .replace(commentOrAssignmentAtEndRegExp, '',)
      .replace(whitespaceRegExp, '',);
    value.default = parameter
      .replace(beginningAssignmentRegExp, '',)
      .replace(leadingOrTrailingWhitespaceRegExp, '',);
    if (! Number.isNaN(Number.parseFloat(value.default,),)) {
      value.type = 'number';
    } else if (value.default === 'true' || value.default === 'false') {
      value.type = 'boolean';
    }
  };
  if (commentAndAssignmentRegExp.exec(parameter,)) {
    processCommentAndAssignment();
  } else if (commentRegExp.exec(parameter,)) {
    processComment();
  } else if (assignmentRegExp.exec(parameter,)) {
    processAssignment();
  } else {
    value.name = parameter.replace(whitespaceRegExp, '',);
  }
  return value;
};
// eslint-disable-next-line complexity
const parseParameterString = (parameter: string,): Param => {
  const value = buildParameter(parameter,);
  value.envName = snakeCase(value.name,).toUpperCase();
  switch (value.type) {
    case 'number':
      value.value = Number.parseFloat(getEnv(value.envName, value.default,),);
      break;
    case 'bool':
    case 'boolean':
      value.value = getEnv(value.envName, value.default,).toLowerCase();
      value.value = value.value === 'true' || value.value === '1';
      break;
    case 'string':
    default:
      if (value.default !== '') {
        if (value.default[FIRST] !== '"' && value.default[FIRST] !== '\'') {
          throw new Error(language('variable_default_value', value.name,),);
        }
        value.default = value.default
          .substring(
            STRING_LIMITER_REMOVAL_START,
            value.default.length-STRING_LIMITER_REMOVAL_LENGTH,
          );
      }
      value.value = getEnv(value.envName, value.default,);
      break;
  }
  return value;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export const analyze = (func: Function,): Param[] => {
  const parameters: string[] = ((): string[] => {
    const fun: string = func.toString().replace(/[\r\n]/gu, ' ',);
    if (functionWhitespaceRegExp.exec(fun,)) {
      return fun
        .replace(functionDetectionRegExp, '',)
        .split(',',);
    }
    return fun
      .replace(arrowFunctionDetectionRegExp, '',)
      .split(',',);
  })();
  const ret: Param[] = [];
  for (const parameter of parameters) {
    const value = parseParameterString(parameter,);
    if (value.name !== '') {
      ret.push(value,);
    }
  }
  return ret;
};

export default analyze;
