import Feature from './../Features';
import './../Features/ControlPlay';
import './../Features/ControlSeek';
import './../Features/ControlVolume';

export default class Player {
  init (configObject) {
    this.events = Feature.initiate(configObject);
    this.player = document.querySelector(configObject.videoSelector);
    setTimeout(() => this.eventHandlers(), 2000);
    this.state = {
      time: 0,
    };
  }

  eventHandlers () {
    this.events.on('play', () => {
      this.player.play();
    });

    this.events.on('pause', () => {
      this.player.pause();
    });

    this.events.on('seek', ({value}) => {
      this.state.time = this.player.duration * (value / 100);
      this.player.currentTime = this.state.time;
    });
    console.log('player events called');
    this.events.publish('videoMeta',
      {
        readyState: this.player.readyState,
        duration: this.player.duration,
      }
    );
  }
};
