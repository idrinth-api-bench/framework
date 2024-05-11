/* eslint no-console: 0 */
import language from '../helper/language.js';
import logSymbols from 'log-symbols';
import languageKey from "../locales/language-key.js";

const error = (key: languageKey, ...argList: string[]) => {
    console.error(logSymbols.error + ' ' + language(key, ...argList,),);
};

export default error;