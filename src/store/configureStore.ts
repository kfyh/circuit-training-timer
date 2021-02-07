import { createStore, Store } from 'redux';
import { selectorReducer } from '../reducers';

export const configureStore = (): Store<any, any> => {
	const store: Store<any, any> = createStore(selectorReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
	return store;
};
