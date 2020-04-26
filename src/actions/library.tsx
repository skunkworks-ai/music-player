export const SETLIBRARY = 'library/SETLIBRARY';
export const SETCURRENTLYPLAYING = 'library/SETCURRENTLYPLAYING';
export const SETVOLUME = 'library/SETVOLUME';

export const setLibrary = (library: any) => {
  return (dispatch : any, getState : any) => {
    dispatch({type: SETLIBRARY, library});
  }
}

export const setCurrentlyPlaying = (libraryItem: any) => {
  return (dispatch : any, getState : any) => {
    dispatch({type: SETCURRENTLYPLAYING, libraryItem});
  }
}

export const getPrevious = () =>{
  return (dispatch : any, getState : any) => {
    const { library, currentlyPlaying } = getState().library;

    if(library.length > 0 && currentlyPlaying) {
      const nowPlayingIndex = library.findIndex((libraryItem : any) => currentlyPlaying.id === libraryItem.id);
      const nowPlayingPrevIndex = nowPlayingIndex - 1;
      if(nowPlayingPrevIndex === -1) {
        return library[library.length - 1];
      } else {
        return library[nowPlayingPrevIndex];
      }
    }

    return null;
  }
}

export const getNext = () =>{
  return (dispatch : any, getState : any) => {
    const { library, currentlyPlaying } = getState().library;

    if(library.length > 0 && currentlyPlaying) {
      const nowPlayingIndex = library.findIndex((libraryItem : any) => currentlyPlaying.id === libraryItem.id);
      const nowPlayingNextIndex = nowPlayingIndex + 1;
      if(nowPlayingNextIndex === library.length) {
        return library[0];
      } else {
        return library[nowPlayingNextIndex];
      }
    }

    return null;
  }
}

export const setVolume = (volume: any) => {
  return (dispatch : any, getState : any) => {
    dispatch({type: SETVOLUME, volume});
  }
}