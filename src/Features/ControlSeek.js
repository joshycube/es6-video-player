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

  eventHandlers () {
    this.seekBar.addEventListener('change', () => {
      this.events.publish('seek', {value: this.seekBar.value});
    });

    this.events.on('stateChange_duration', ({key, value}) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value - minutes * 60);
      const durationDisplay = `${minutes}:${seconds}`;
      this.controlParent.querySelector('.es6-player__currenttime').innerHTML = durationDisplay;
    });

    this.events.on('stateChange_time', ({key, value}) => {
    });
  }

  destroy () {
    this.seekBar.removeEventListener('change');
  }

  render () {
    const element = `<span class="es6-player__timeleft"></span><input class="es6-player__seekbar" type="range" id="seek-bar" value="0"><span class="es6-player__currenttime"></span>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlSeek', ControlSeek);
