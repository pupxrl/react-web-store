import { createStore } from 'redux';
import rootReducer from './rootReducer';

// Create a Redux store with the rootReducer to manage the app state
const store = createStore(rootReducer);

export default store;
