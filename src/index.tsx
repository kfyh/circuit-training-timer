import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import WebFont from 'webfontloader';
import './index.css';
import { configureStore } from './store/configureStore';

WebFont.load({ google: { families: ['Roboto:300,400,500'] } });

const store = configureStore();

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, rootElement);
