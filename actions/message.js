import { SET_MESSAGE } from '../types/message';

// eslint-disable-next-line import/prefer-default-export
export const setMessage = message => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message,
    },
  });
};
