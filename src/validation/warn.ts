/* eslint no-console: 0 */
import language from '../helper/language.js';
import logSymbols from 'log-symbols';
import languageKey from '../locales/language-key.js';

const warn = (key: languageKey, ...argList: string[]) => {
  console.warn(logSymbols.warning + ' ' + language(key, ...argList,),);
};

export default warn;
