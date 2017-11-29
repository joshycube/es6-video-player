import Features from '../Features';

export default class ControlPlay {
  constructor (events, className, config) {
    this.events = events;
    this.className = className;
    this.video = document.getElementById(config.videoSelector);
    this.controlParent = document.querySelector(`${config.parentSelector} ${config.controlSelector}`);
    this.state = {
      playBtn: 'pause'
    };
    this.originalState = {...this.state};
  }

  init () {
    this.playBtn = this.controlParent.querySelector('#play-pause');
    this.eventHandlers();
  }

  eventHandlers () {
    this.playBtn.addEventListener('click', (e) => {
      if (this.state.playBtn === 'pause') {
        this.events.publish('play');
      } else {
        this.events.publish('pause');
      }
    });

    this.events.on('stateChange_status', ({key, value}) => {
      switch (value) {
        case 'play':
          this.state.playBtn = 'play';
          break;
        case 'pause':
          this.state.playBtn = 'pause';
          break;
        default:
          this.state.playBtn = 'pause';
      }
    });
  }

  destroy () {
    this.playBtn.removeEventListener('click');
    this.state = {...this.originalState};
  }

  render () {
    const element = `<button type="button" id="play-pause">Play</button>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlPlay', ControlPlay);
