import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Item from './Item/Item';
import './Playlist.css';

// Playlist class
function Playlist(props: any) {
  const { library, show, toggle } = props;

  return (
    <div id="playlist" className={`${show ? `show` : ``}`}>
      <div className="row">
        <div className="col">
          <button
            id="playlist-toggle"
            onPointerUp={() => {
              toggle();
            }}
            className="btn btn-block p-3 pl-5 pr-5"
          >
            <div className="bg-white rounded-pill"></div>
          </button>
        </div>
      </div>
      <div className="card bg-transparent border-0">
        <div className="card-body pt-0 bg-transparent">
          <div className="row">
            <div className="col">
              <h6 className="text-white font-weight-bold text-center mt-2 mb-4">Playlist</h6>
            </div>
          </div>
          <div className="list-group list-group-flush">{/* Insert Item List Here From Library */}</div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    library: state.library.library,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
