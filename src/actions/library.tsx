export const SETLIBRARY = 'library/SETLIBRARY';
export const SETCURRENTLYPLAYING = 'library/SETCURRENTLYPLAYING';
export const SETVOLUME = 'library/SETVOLUME';

export const setLibrary = (library: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SETLIBRARY, library });
  };
};

export const setCurrentlyplaying = (libraryItem: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SETCURRENTLYPLAYING, libraryItem });
  };
};

export const getPrevious = () => {
  return (dispatch: any, getState: any) => {
    const { library, currentlyplaying } = getState().library;

    if (library.length > 0 && currentlyplaying) {
      const nowplayingIndex = library.findIndex((libraryItem: any) => currentlyplaying.id === libraryItem.id);
      const nowplayingprevIndex = nowplayingIndex - 1;
      if (nowplayingprevIndex === -1) {
        return library[library.length - 1];
      } else {
        return library[nowplayingprevIndex];
      }
    }

    return null;
  };
};

export const getNext = () => {
  return (dispatch: any, getState: any) => {
    const { library, currentlyplaying } = getState().library;

    if (library.length > 0 && currentlyplaying) {
      const nowplayingIndex = library.findIndex((libraryItem: any) => currentlyplaying.id === libraryItem.id);
      const nowplayingnextIndex = nowplayingIndex + 1;
      if (nowplayingnextIndex === library.length) {
        return library[0];
      } else {
        return library[nowplayingnextIndex];
      }
    }

    return null;
  };
};

export const setVolume = (volume: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SETVOLUME, volume });
  };
};
