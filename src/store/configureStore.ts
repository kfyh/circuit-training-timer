import { createStore, Store } from 'redux';
import { selectorReducer, ISelectorReducerState, ISelectorAction } from '../reducers';
import { loadState, saveState } from './localStorage';


export const configureStore = (): Store<ISelectorReducerState, ISelectorAction> => {
	const savedState = loadState();
	const store: Store<ISelectorReducerState, ISelectorAction> = createStore(
		selectorReducer,
		savedState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	store.subscribe(() => {
		saveState({
		  exercises: store.getState().exercises,
		  circuits: store.getState().circuits,
		});
	  });

	return store;
};
