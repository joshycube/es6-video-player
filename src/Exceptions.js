export function NoFeatureNameException (message) {
  this.message = message;
  this.name = 'NoFeatureNameException';
};

export function FeatureNotFoundException (message) {
  this.message = message;
  this.name = 'FeatureNotFoundException';
};

export function InstanceNameTakenException (message) {
  this.message = message;
  this.name = 'InstanceNameTakenException';
};

export function MissingRequiredFuncException (message) {
  this.message = message;
  this.name = 'MissingRequiredFuncException';
};
