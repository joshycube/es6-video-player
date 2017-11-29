import Features from '../Features';

export default class ControlPlay {
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
    const element = `<button type="button" id="play-pause">Play</button>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlPlay', ControlPlay);
