import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/*
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc; //node.js global object
global.window = win;

//props provided by window can be used without window.prefix
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
*/
chai.use(chaiImmutable);