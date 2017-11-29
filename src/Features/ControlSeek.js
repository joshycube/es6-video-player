import Features from '../Features';

export default class ControlSeek {
  constructor (events, className, config) {
    this.events = events;
    this.className = className;
    this.video = document.getElementById(config.videoSelector);
    this.controlParent = document.querySelector(`${config.parentSelector} ${config.controlSelector}`);
    this.state = {};
  }

  init () {

  }

  destroy () {

  }

  render () {
    const element = `<span class="es6-player__timeleft"></span><input class="es6-player__seekbar" type="range" id="seek-bar" value="0"><span class="es6-player__currenttime"></span>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlSeek', ControlSeek);
