import ConsoleLogger from '../../src/logger/console-logger';
import {
  expect,
} from 'chai';
import 'mocha';

describe('logger/console-logger', () => {
  it('should be a class', () => {
    expect(ConsoleLogger,).to.be.a('function',);
  },);
  const logger = new ConsoleLogger();
  describe('.trace()', () => {
    it('should have a method trace', () => {
      expect(logger.trace,).to.be.a('function',);
    },);
    it('trace should not throw an error if called', () => {
      expect(() => logger.trace('example',),).to.not.throw();
    },);
  },);
  describe('.debug()', () => {
    it('should have a method debug', () => {
      expect(logger.debug,).to.be.a('function',);
    },);
    it('debug should not throw an error if called', () => {
      expect(() => logger.debug('example',),).to.not.throw();
    },);
  },);
  describe('.info()', () => {
    it('should have a method info', () => {
      expect(logger.info,).to.be.a('function',);
    },);
    it('info should not throw an error if called', () => {
      expect(() => logger.info('example',),).to.not.throw();
    },);
  },);
  describe('.warn()', () => {
    it('should have a method warn', () => {
      expect(logger.warn,).to.be.a('function',);
    },);
    it('warn should not throw an error if called', () => {
      expect(() => logger.warn('example',),).to.not.throw();
    },);
  },);
  describe('.error()', () => {
    it('should have a method error', () => {
      expect(logger.error,).to.be.a('function',);
    },);
    it('error should not throw an error if called', () => {
      expect(() => logger.error('example',),).to.not.throw();
    },);
  },);
  describe('.fatal()', () => {
    it('should have a method fatal', () => {
      expect(logger.fatal,).to.be.a('function',);
    },);
    it('fatal should not throw an error if called', () => {
      expect(() => logger.fatal('example',),).to.not.throw();
    },);
  },);
},);
