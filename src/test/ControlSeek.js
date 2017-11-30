import {describe, it} from 'mocha';
import expect from 'expect';
import Event from 'event-pubsub';
import { JSDOM } from 'jsdom';
import ControlSeek from './../Features/ControlSeek';

describe('Seek and time functionality', () => {
  const jsdom = new JSDOM('<!doctype html><html><body><div id="app"> <main> <div id="video-one__wrapper" class="es6-player__wrapper"> <video class="es6-player__video" id="video__one"> Your browser does not support the video tag. </video> <div class="es6-player__controls"></div> </div> </main> </div></body></html>');
  const { window } = jsdom;
  global.document = window.document;
  const config = {
    features: [
      {
        name: 'ControlPlay',
        instanceName: 'video1-play',
      },
      {
        name: 'ControlSeek',
        instanceName: 'video1-seek',
      },
    ],
    parentSelector: '#video-one__wrapper',
    videoSelector: '#video__one',
    controlSelector: '.es6-player__controls',
  };
  const events = new Event();
  const SeekCtrl = new ControlSeek(events, 'video1-play', config);
  SeekCtrl.render();
  SeekCtrl.init();
  describe('When duration is received', () => {
    events.publish('stateChange_duration', {key: 'duration', value: 600});
    const duration = document.querySelector('.es6-player__duration');
    const expected = '<span class="es6-player__duration">10:00</span>';
    it('should set the duration', () => {
      expect(duration.outerHTML).toEqual(expected);
    });
  });
  describe('When position is changed', () => {
    events.publish('stateChange_time', {key: 'time', value: 300});
    const duration = document.querySelector('.es6-player__time');
    const expected = '<span class="es6-player__time">05:00</span>';
    it('should set the time', () => {
      expect(duration.outerHTML).toEqual(expected);
    });
  });
});
