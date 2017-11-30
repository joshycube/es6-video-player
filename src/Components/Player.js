import Feature from './../Features';
import './../Features/ControlPlay';
import './../Features/ControlSeek';
import './../Features/ControlVolume';

export default class Player {
  init (configObject) {
    this.events = Feature.initiate(configObject);
    this.player = document.querySelector(configObject.videoSelector);
    this.stateObj = {
      status: 'pause',
      time: 0,
      duration: 0,
      progress: 0,
      seekposition: 0,
    };
    /* TODO: Move me to higher level */
    const handler = function (context) {
      return {
        set (target, key, value) {
          target[key] = value;
          context.events.publish(`stateChange_${key}`, {key, value});
          return true;
        }
      };
    };
    this.state = new Proxy(this.stateObj, handler(this));
    this.eventHandlers();
  }

  eventHandlers () {
    this.events.on('play', () => {
      this.player.play();
      this.state.status = 'play';
    });

    this.events.on('pause', () => {
      this.player.pause();
      this.state.status = 'pause';
    });

    this.events.on('seek', ({value}) => {
      this.state.time = this.player.duration * (value / 100);
      this.player.currentTime = this.state.time;
    });

    this.player.ontimeupdate = () => this.state.time = this.player.currentTime;

    this.player.onended = () => {
      this.state.status = 'pause';
      this.state.time = 0;
      this.seekposition = 0;
      this.player.currentTime = 0;
    };

    setTimeout(() => {
      this.state.duration = this.player.duration;
    }, 1000);
  }
};
