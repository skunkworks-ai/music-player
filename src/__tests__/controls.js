import React from 'react';
import { Provider } from 'react-redux';
import { render, waitForElement } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import shallowequal from 'shallowequal';
import MusicPlayer from '../views/MusicPlayer/MusicPlayer';
import AudioItem from '../views/MusicPlayer/AudioItem';
import * as actions from '../actions/library';
import configureStore, { history } from '../store/configureStore';
import '@testing-library/jest-dom/extend-expect';

const store = configureStore();
const audio = {
  id: '5c7ded41-b875-4381-8e24-0dabb00b4f5d',
  src: "./music/Chelsea Cutler - You're Not Missing Me.mp3",
  title: "You're Not Missing Me",
  artist: 'Chelsea Cutler',
  album: "You're Not Missing Me",
  albumArt: "./music/Chelsea Cutler - You're Not Missing Me.jpg",
};
const defaultVolume = 20;
let renderObj = undefined;
let audioItem = undefined;

describe('user loads music player', () => {
  beforeEach(() => {
    // Suppress warning
    window.HTMLMediaElement.prototype.pause = () => {};

    audioItem = new AudioItem();
    renderObj = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MusicPlayer defaultVolume={defaultVolume} audioItem={audioItem} />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('user sets volume, volume changes', async () => {
    const { getByTestId } = renderObj;

    await waitForElement(() => getByTestId('volume-slider'));
    const volumeSlider = getByTestId('volume-slider');
    expect(volumeSlider.value).toEqual(defaultVolume.toString());
    store.dispatch(actions.setVolume(20));
    expect(volumeSlider.value).toEqual('20');
  });

  it('user goes to next track, plays the next track', async () => {
    store.dispatch(actions.setCurrentlyplaying(audio));
    const next = store.dispatch(actions.getNext());
    const { currentlyplaying } = store.getState().library;
    expect(shallowequal(currentlyplaying, audio)).toBeTruthy();
    expect(shallowequal(next, audio)).toBeFalsy();
  });

  it('user goes to prev track, plays the prev track', async () => {
    store.dispatch(actions.setCurrentlyplaying(audio));
    const prev = store.dispatch(actions.getPrevious());
    const { currentlyplaying } = store.getState().library;
    expect(shallowequal(currentlyplaying, audio)).toBeTruthy();
    expect(shallowequal(prev, currentlyplaying)).toBeFalsy();
  });
});
