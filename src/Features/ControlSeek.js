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
    this.seekBar = this.controlParent.querySelector('.es6-player__seekbar');
    this.eventHandlers();
  }

  eventHandlers () {
    this.seekBar.addEventListener('change', () => {
      this.events.publish('seek', {value: this.seekBar.value});
    });

    this.events.on('videoMeta', ({state, duration}) => {
      if (duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration - minutes * 60);
        const durationDisplay = `${minutes}:${seconds}`;
        console.log(durationDisplay);
      }
    });

    console.log('seek handlers called');
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
