import React from 'react';
import { 
  render,
  cleanup, 
  fireEvent, 
  waitFor, 
  screen,
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '../../store/configureStore';
import MusicPlayer from './MusicPlayer';

beforeEach(() => {
  const store = configureStore();

  return render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Route path="/" render={() => <MusicPlayer/> } />
      </ConnectedRouter>
    </Provider>
  )
});

afterEach(cleanup);

it('can render default state', () => {
  const { getByTestId } = screen;
  const title = getByTestId('song-title');
  expect(title).toHaveTextContent('Sunset Lover');
});

it('can go to next song', async () => {
  const nextButton = screen.getByTestId('next-audio-button');
  fireEvent.pointerUp(nextButton);
  await waitFor(() => expect(screen.getByTestId('song-title')).toHaveTextContent('You\'re Not Missing Me'));
});

it('can go to previous song', async () => {
  const prevButton = screen.getByTestId('prev-audio-button');
  fireEvent.pointerUp(prevButton);
  await waitFor(() => expect(screen.getByTestId('song-title')).toHaveTextContent('Boy Oh Boy'));
});

it('can adjust volume', async () => {
  const volumeSlider = screen.getByTestId('volume-slider');
  fireEvent.change(volumeSlider, { target: { value:50 }});
  await waitFor(() => expect(screen.getByTestId('volume-display')).toHaveTextContent('50%'));
});

it('can show playlist', async () => {
  const playlistButton = screen.getByTestId('playlist-toggle-button');
  fireEvent.pointerUp(playlistButton);
  await waitFor(() => expect(screen.queryByText('Playlist')).toBeInTheDocument());
});