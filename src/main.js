import Player from './Components/Player';
import './main.scss';

const player1 = new Player();
player1.init({
  features: [
    {
      name: 'ControlPlay',
      instanceName: 'video1-play',
    },
    {
      name: 'ControlSeek',
      instanceName: 'video1-seek',
    },
  ],
  parentSelector: '#video-one__wrapper',
  videoSelector: '#video__one',
  controlSelector: '.es6-player__controls',
});
