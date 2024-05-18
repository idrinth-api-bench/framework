import {
  process as processType,
} from './middleware.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';
import {
  XMLValidator as FastXMLValidator,
} from 'fast-xml-parser';

const xmlCheck = /\/xml/ui;

export const process: processType = (result: Result,): void => {
  if (typeof result.response.headers['content-type'] === 'undefined') {
    throw Error(language('no_content_type',),);
  }
  const contentType = result.response.headers['content-type'];
  if (! xmlCheck.test(contentType,)) {
    throw Error(language('no_xml_content_type', contentType,),);
  }
  if (FastXMLValidator.validate(result.response.body,) !== true) {
    throw Error(language('invalid_xml_body',),);
  }
};
