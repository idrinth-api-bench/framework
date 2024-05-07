import multiReporter from '../reporter/multi-reporter';
import csvReporter from '../reporter/csv-reporter';
import consoleReporter from '../reporter/console-reporter';
import jsonReporter from '../reporter/json-reporter';
import htmlReporter from '../reporter/html-reporter';
import internalReporter from '../reporter/internal-reporter';
import xrayCloudReporter from '../reporter/xray-cloud-reporter';
import xrayOnpremiseReporter from '../reporter/xray-onpremise-reporter';

multiReporter.addReporter(csvReporter,);
multiReporter.addReporter(consoleReporter,);
multiReporter.addReporter(jsonReporter,);
multiReporter.addReporter(htmlReporter,);
multiReporter.addReporter(internalReporter,);
multiReporter.addReporter(xrayCloudReporter,);
multiReporter.addReporter(xrayOnpremiseReporter,);

export default multiReporter;
