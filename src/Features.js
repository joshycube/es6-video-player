import {
  NoFeatureNameException,
  FeatureNotFoundException,
  InstanceNameTakenException,
  MissingRequiredFuncException,
} from './Exceptions';
import Event from 'event-pubsub';

export default class Features {
  static create (name, feature) {
    if (!name) {
      throw new NoFeatureNameException('Feature name is required!');
    }
    if (!Features.features) {
      Features.features = [];
    }
    Features.features[name] = feature;
  }

  static initiate (config) {
    if (!Features.instances) {
      Features.instances = [];
    }

    const events = new Event();

    config.features.map(feature => {
      if (!Features.features &&
        Features.features[feature.name]) {
        throw new FeatureNotFoundException(`Feature can not be found: ${feature.name}`);
      }
      if (Features.instances[feature.instanceName]) {
        throw new InstanceNameTakenException(`An instance of: ${feature.instanceName} exists already!`);
      }
      let instance = new Features.features[feature.name](events, feature.instanceName, config);
      if (!Features.features[feature.name].prototype.hasOwnProperty('init') ||
      !Features.features[feature.name].prototype.hasOwnProperty('destroy')) {
        throw new MissingRequiredFuncException(`Missing init() or destroy() of ${feature.name}`);
      }
      Features.instances[feature.instanceName] = instance;
      if (Features.features[feature.name].prototype.hasOwnProperty('render')) {
        instance.render();
      }
      setTimeout(() => {
        instance.init();
      }, 1000);
    });
    return events;
  }
  /* TODO: Implement start()  */
  /* TODO: Implement stop()  */
  /* TODO: Implement restart()  */
  /* TODO: Implement restartAll()  */
};
