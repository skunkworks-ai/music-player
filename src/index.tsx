import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store/configureStore';
import AudioItem from './views/MusicPlayer/AudioItem';

const store = configureStore();
const MusicPlayer = React.lazy(() => import('./views/MusicPlayer/MusicPlayer'));
const loading = () => {
  return (
    <div className="animated fadeIn pt-3 text-center">
      <i className="fas fa-redo fa-spin"></i>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={loading()}>
          <Route path="/" render={() => <MusicPlayer defaultVolume={20} audioItem={new AudioItem()} />} />
        </Suspense>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
