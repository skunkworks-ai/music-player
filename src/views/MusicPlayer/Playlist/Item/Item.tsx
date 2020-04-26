import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Item.css';

// Item class
function Item(props: any) {

  const { item, currentlyPlaying, onPlayAudio } = props;

  return (
    <div className="list-group-item border-white p-0" key={`item-${item.id}`}>
      <button className="btn btn-block btn-outline-light text-left border-0 rounded-0" onPointerUp={() => { onPlayAudio(item) }}>
        <div className="row no-gutters">
          <div className="col mr-3" style={{flex: '0 0 50px'}}>
            <img src={item.albumArt} alt={item.title}/>
          </div>
          <div className="list-library-item d-inline-block col">
            <h6 className="list-item-title font-weight-bold mb-1">{item.title}</h6>
            <h6 className="list-item-artist mb-1">{item.artist}</h6>
            <h6 className="list-item-album mb-0">{item.album}</h6>
          </div>
          <div className="col d-flex justify-content-between align-items-center text-center" style={{flex: '0 0 30px'}}>
            {/* Add Render Condition Here if currently playing is equals to this item */}
            { (item.id === currentlyPlaying.id) &&
              <i className="fa fa-play"></i>
            }
          </div>
        </div>
      </button>
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    currentlyPlaying: state.library.currentlyPlaying
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);