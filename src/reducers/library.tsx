import { SETCURRENTLYPLAYING, SETLIBRARY, SETVOLUME } from '../actions/library';

const initialState = {
  library: [],
  currentlyplaying: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SETLIBRARY:
      return {
        ...state,
        library: action.library,
      };
    case SETCURRENTLYPLAYING:
      return {
        ...state,
        currentlyplaying: action.libraryItem,
      };
    case SETVOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    default:
      return state;
  }
};
