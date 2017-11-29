import Feature from './../Features';
import './../Features/ControlPlay';
import './../Features/ControlSeek';
import './../Features/ControlVolume';

export default class Player {
  init (configObject) {
    Feature.initiate(configObject);
  }
};
