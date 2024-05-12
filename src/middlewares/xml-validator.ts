import Middleware from './middleware.js';
import Request from '../routes/request.js';
import Result from '../messaging/result.js';
import language from '../helper/language.js';
import {
  XMLValidator as FastXMLValidator,
} from 'fast-xml-parser';

const xmlCheck = /\/xml/ui;

export default class XMLValidator implements Middleware {
  public prepare(request: Request,): Request {
    return request;
  }

  public process(result: Result,): void {
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
  }
}
