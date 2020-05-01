import moment from 'moment';
import 'moment-duration-format';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LibraryActions from '../../actions/library';
import { library } from '../../library';
import './MusicPlayer.css';
import Playlist from './Playlist/Playlist';

interface Duration extends moment.Duration {
  format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
  forceLength: boolean;
  precision: number;
  template: string;
  trim: boolean | 'left' | 'right';
}

// MusicPlayer class
function MusicPlayer(props: any) {
  const {
    setLibrary,
    setCurrentlyplaying,
    currentlyplaying,
    getNext,
    getPrevious,
    setVolume,
    volume,
    defaultVolume,
    audioItem,
  } = props;

  const [currenttime, setCurrenttime] = useState(0);

  const playingAudio = (event: Event) => {
    setCurrenttime(audioItem.getCurrentTime());
  };

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Hydrate Library to Store
    setLibrary(library);
    setCurrentlyplaying(library[0]);
    setVolume(defaultVolume);
    audioItem.setVolume(defaultVolume * 0.01);
    audioItem.loadAudio(library[0].src, playing);
    audioItem.audio.addEventListener('timeupdate', playingAudio);
    audioItem.audio.addEventListener('ended', nextAudio);

    return () => {
      audioItem.audio.removeEventListener('timeupdate', playingAudio);
      audioItem.audio.removeEventListener('ended', nextAudio);
    };
  }, []);

  useEffect(() => {
    audioItem?.pausePlayAudio(playing);
  }, [playing]);

  // Set Previous Audio by setCurrentlyplaying()
  const prevAudio = () => {
    const prev: { [key: string]: string } = getPrevious();
    setCurrentlyplaying(prev);
    audioItem.loadAudio(prev.src, true);
  };

  // Set Next Audio by setCurrentlyplaying()
  const nextAudio = () => {
    const next: { [key: string]: string } = getNext();
    setCurrentlyplaying(next);
    audioItem.loadAudio(next.src, true);
  };

  // Set Play Audio by setCurrentlyplaying()
  const playAudio = (libraryItem: any) => {};

  // Set Volume by audio.volume [min: 0, max: 1]
  const changeVolume = (e: any) => {
    const volume: number = e.currentTarget.value;
    setVolume(volume);
    audioItem.setVolume(volume * 0.01);
  };

  const duration = moment.duration(audioItem?.getCurrentTime(), 'seconds') as Duration;
  const audioduration = moment.duration(audioItem?.getDuration(), 'seconds') as Duration;

  const [showplaylist, setShowplaylist] = useState(false);

  return (
    <div id="music-player" className="d-flex justify-content-center align-items-center">
      <div className="card bg-transparent">
        <img src={`${currentlyplaying?.albumArt}`} className="card-img-top" alt={currentlyplaying?.title} />
        <img
          src={`${currentlyplaying?.albumArt}`}
          className="card-img-background position-absolute"
          alt={currentlyplaying?.title}
        />
        <div className="card-body text-center">
          <input
            type="range"
            min={0}
            max={audioItem?.getDuration() ? audioItem.getDuration() : 0}
            value={currenttime}
            className="slider position-relative mb-2"
            readOnly
          ></input>
          <div className="row mb-2">
            <div className="col text-left text-white">{duration.format('mm:ss')}</div>
            <div className="col text-right text-white">{audioduration.format('mm:ss')}</div>
          </div>
          <h5 className="card-title text-white font-weight-bold mb-1">{currentlyplaying?.title}</h5>
          <p className="card-text text-white">{currentlyplaying?.artist}</p>
          <div className="row mb-4">
            <div className="col">
              <a
                href="#"
                onPointerUp={() => prevAudio()}
                className="btn btn-prev text-white btn-sm ml-2 mr-2 rounded-pill"
              >
                <i className="fas fa-backward"></i>
              </a>
              <a
                href="#"
                onPointerUp={() => setPlaying(!playing)}
                className="btn btn-play-pause text-white btn-outline-secondary p-0 ml-2 mr-2 rounded-pill"
              >
                {playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
              </a>
              <a
                href="#"
                onPointerUp={() => nextAudio()}
                className="btn btn-next text-white btn-sm ml-2 mr-2 rounded-pill"
              >
                <i className="fas fa-forward"></i>
              </a>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume ?? defaultVolume}
            className="slider position-relative mb-2"
            onChange={changeVolume}
            data-testid="volume-slider"
          ></input>
          <div className="row mb-5">
            <div className="col text-left text-white">
              <i className="fas fa-volume-off"></i>
            </div>
            <div className="col text-center text-white">{`${volume}%`}</div>
            <div className="col text-right text-white">
              <i className="fas fa-volume-up"></i>
            </div>
          </div>
        </div>
        <Playlist
          show={showplaylist}
          toggle={() => {
            setShowplaylist(!showplaylist);
          }}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    currentlyplaying: state.library.currentlyplaying,
    volume: state.library.volume,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setLibrary: LibraryActions.setLibrary,
      setCurrentlyplaying: LibraryActions.setCurrentlyplaying,
      getNext: LibraryActions.getNext,
      getPrevious: LibraryActions.getPrevious,
      setVolume: LibraryActions.setVolume,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
