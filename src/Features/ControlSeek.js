import Features from '../Features';

export default class ControlSeek {
  constructor (events, className, config) {
    this.events = events;
    this.className = className;
    this.video = document.getElementById(config.videoSelector);
    this.controlParent = document.querySelector(`${config.parentSelector} ${config.controlSelector}`);
  }

  init () {
    this.seekBar = this.controlParent.querySelector('.es6-player__seekbar');
    this.eventHandlers();
  }

  calculateTime (value, padZero = false) {
    let minutes = Math.floor(value / 60);
    let seconds = Math.floor(value - minutes * 60);

    if (padZero) {
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
    }

    return `${minutes}:${seconds}`;
  }

  eventHandlers () {
    this.seekBar.addEventListener('change', () => {
      this.events.publish('seek', {value: this.seekBar.value});
    });

    this.events.on('stateChange_duration', ({key, value}) => {
      const durationDisplay = this.calculateTime(value);
      this.controlParent.querySelector('.es6-player__duration').innerHTML = durationDisplay;
    });

    this.events.on('stateChange_time', ({key, value}) => {
      const durationDisplay = this.calculateTime(value, true);
      this.controlParent.querySelector('.es6-player__time').innerHTML = durationDisplay;
    });

    this.events.on('stateChange_seekposition', ({key, value}) => {
      this.seekBar.value = value;
    });
  }

  destroy () {
    this.seekBar.removeEventListener('change');
  }

  render () {
    const element = `<span class="es6-player__time">00:00</span><input autocomplete="off" class="es6-player__seekbar" type="range" id="seek-bar" value="0"><span class="es6-player__duration"></span>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlSeek', ControlSeek);
