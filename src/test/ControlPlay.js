import {describe, it} from 'mocha';
import expect from 'expect';
import Event from 'event-pubsub';
import { JSDOM } from 'jsdom';
import ControlPlay from './../Features/ControlPlay';

describe('Player play functionality', () => {
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
  const PlayCtrl = new ControlPlay(events, 'video1-play', config);
  PlayCtrl.render();
  PlayCtrl.init();
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true);

  describe('When clicking on play', () => {
    it('should fire an event to start the video', () => {
      /* PlayCtrl.playBtn.dispatchEvent(evt); */
      events.publish('stateChange_status', {key: 'status', value: 'play'});
      expect(PlayCtrl.state).toEqual({
        playBtn: 'play'
      });
    });
  });

  describe('When clicking on pause whilst playing', () => {
    it('should fire an event to pause the player', () => {
      /* PlayCtrl.playBtn.dispatchEvent(evt); */
      events.publish('stateChange_status', {key: 'status', value: 'pause'});
      expect(PlayCtrl.state).toEqual({
        playBtn: 'pause'
      });
    });
  });
});
