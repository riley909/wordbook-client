import {
  CREATE_FOLDER,
  GET_FOLDER_WORDS,
  GET_FOLDER_LIST,
  CREATE_WORD,
  UPDATE_WORD_STATUS,
  DELETE_WORD,
  DELETE_FOLDER,
  UPDATE_FOLDER_NAME,
} from '../_actions/types';

export const wordbookState = {
  folder: {
    loading: false,
    error: null,
    data: null,
  },
  word: {
    loading: false,
    error: null,
    data: null,
  },
};
export default function (state = wordbookState, action) {
  switch (action.type) {
    case `${CREATE_FOLDER}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: [[action.payload, ...state.folder.data[0]], state.folder.data[1] + 1],
        },
      };
    case `${CREATE_FOLDER}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${GET_FOLDER_LIST}_LOADING`:
      return {
        ...state,
        folder: {
          ...state.folder,
          loading: action.payload,
        },
      };
    case `${GET_FOLDER_LIST}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${GET_FOLDER_LIST}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${DELETE_FOLDER}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: [
            state.folder.data[0].filter((val) => val.id !== action.payload),
            state.folder.data[1] - 1,
          ],
        },
      };
    case `${DELETE_FOLDER}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${UPDATE_FOLDER_NAME}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: [
            state.folder.data[0].map((val) =>
              val.id === action.payload.id ? action.payload : val
            ),
            state.folder.data[1],
          ],
        },
      };
    case `${UPDATE_FOLDER_NAME}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${GET_FOLDER_WORDS}_LOADING`:
      return {
        ...state,
        word: {
          ...state.word,
          loading: action.payload,
        },
      };
    case `${GET_FOLDER_WORDS}_SUCCESS`:
      return {
        ...state,
        word: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${GET_FOLDER_WORDS}_FAILURE`:
      return {
        ...state,
        word: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${CREATE_WORD}_SUCCESS`:
      return {
        ...state,
        word: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${CREATE_WORD}_FAILURE`:
      return {
        ...state,
        word: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${UPDATE_WORD_STATUS}_SUCCESS`:
      return {
        ...state,
        word: {
          loading: false,
          error: null,
          data: Object.assign(state.word.data, {
            words: state.word.data.words.map((val) => {
              return val.wordData.id === action.payload.id ? action.payload : val;
            }),
          }),
        },
      };
    case `${UPDATE_WORD_STATUS}_FAILURE`:
      return {
        ...state,
        word: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${DELETE_WORD}_SUCCESS`:
      return {
        ...state,
        word: {
          loading: false,
          error: null,
          data: Object.assign(
            state.word.data,
            {
              words: state.word.data.words.filter((val) => {
                return val.wordData.id !== action.payload;
              }),
            },
            { total: state.word.data.total - 1 }
          ),
        },
      };
    case `${DELETE_WORD}_FAILURE`:
      return {
        ...state,
        word: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };

    default:
      return state;
  }
}
