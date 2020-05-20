import { handleActions } from 'redux-actions';
import actions from '../actions';

const initialState = {
  username: {
    value: 'admin',
  },
  password: {
    value: 'admin',
  },
  message: {
    error: false,
    text: '',
  },
  loading: false,
  logined: false,
};
export default handleActions(
  {
    [actions.fieldChange]: (state, { payload: { fields } }) => ({
      ...state,
      ...fields,
    }),
    [actions.rejected]: (state, { payload: { message } }) => ({
      ...state,
      password: {
        value: '',
      },
      message: {
        error: true,
        text: message,
      },
      loading: false,
    }),
    [actions.loading]: state => ({
      ...state,
      loading: true,
    }),
    [actions.logined]: state => ({
      ...state,
      message: {
        error: false,
        text: '登录成功',
      },
      loading: false,
      logined: true,
    }),
  },
  initialState
);
