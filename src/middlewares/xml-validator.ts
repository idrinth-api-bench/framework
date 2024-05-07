import staticImplements from '../helper/static-implements';
import Middleware from '../middleware';
import Request from '../request';
import Result from '../result';
import language from '../helper/language';
import {
  XMLValidator as FastXMLValidator,
} from 'fast-xml-parser';

const xmlCheck = /\/xml/ui;

@staticImplements<Middleware>()
export default class XMLValidator {
  public static prepare(request: Request,): Request {
    return request;
  }

  public static process(result: Result,): void {
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
