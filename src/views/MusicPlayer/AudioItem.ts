import { EventEmitter } from 'events';

export default class AudioItem extends EventEmitter {
  public audio: HTMLAudioElement;

  // Instantiate Audio
  constructor() {
    super();
    this.audio = new Audio();
  }

  public loadAudio = (src: String, playing: boolean = false) => {
    this.audio.src = `${src}`;
    this.pausePlayAudio(playing);
  };

  public pausePlayAudio = (playing: boolean) => {
    if (playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  };

  public setVolume = (volume: any) => {
    this.audio.volume = volume;
  };

  public getDuration = () => {
    return this.audio.duration;
  };

  public getCurrentTime = () => {
    return this.audio.currentTime;
  };
}
