import Feature from './../Features';
import './../Features/ControlPlay';
import './../Features/ControlSeek';
import './../Features/ControlVolume';

export default class Player {
  init (configObject) {
    this.events = Feature.initiate(configObject);
    this.player = document.querySelector(configObject.videoSelector);
    this.eventHandlers();
  }

  eventHandlers () {
    this.events.on('play', () => {
      this.player.play();
    });

    this.events.on('pause', () => {
      this.player.pause();
    });
  }
};
