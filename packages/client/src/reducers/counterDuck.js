/**
 * Created by zac on 07/01/2018.
 */
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const defaultState = 0;

const counter = (state = defaultState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default counter;

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
