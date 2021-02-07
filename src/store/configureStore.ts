import { createStore, Store } from 'redux';
import { selectorReducer, ISelectorReducerState, ISelectorAction } from '../reducers';

export const configureStore = (): Store<ISelectorReducerState, ISelectorAction> => {
	const store: Store<ISelectorReducerState, ISelectorAction> = createStore(
		selectorReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
};
