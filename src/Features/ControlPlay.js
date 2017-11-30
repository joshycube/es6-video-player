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
          this.playBtn.classList.remove('fa-play');
          this.playBtn.classList.add('fa-pause');
          break;
        case 'pause':
          this.state.playBtn = 'pause';
          this.playBtn.classList.remove('fa-pause');
          this.playBtn.classList.add('fa-play');
          break;
        default:
          this.state.playBtn = 'pause';
          this.playBtn.classList.remove('fa-pause');
          this.playBtn.classList.add('fa-play');
      }
    });
  }

  destroy () {
    this.playBtn.removeEventListener('click');
    this.state = {...this.originalState};
  }

  render () {
    const element = `<button class="fa fa-play es6-player__play" type="button" id="play-pause"></button>`;
    this.controlParent.innerHTML = this.controlParent.innerHTML + element;
  }
};

Features.create('ControlPlay', ControlPlay);
