import multiReporter from './multi-reporter.js';
import csvReporter from './csv-reporter.js';
import consoleReporter from './console-reporter.js';
import jsonReporter from './json-reporter.js';
import htmlReporter from './html-reporter.js';
import xrayCloudReporter from './xray-cloud-reporter.js';
import xrayOnpremiseReporter from './xray-onpremise-reporter.js';

multiReporter.addReporter(csvReporter,);
multiReporter.addReporter(consoleReporter,);
multiReporter.addReporter(jsonReporter,);
multiReporter.addReporter(htmlReporter,);
multiReporter.addReporter(xrayCloudReporter,);
multiReporter.addReporter(xrayOnpremiseReporter,);

export default multiReporter;
