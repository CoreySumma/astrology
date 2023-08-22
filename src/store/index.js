import { configureStore } from 'redux';
import rootReducer from '../reducers';

const store = configureStore(rootReducer);

export default store;