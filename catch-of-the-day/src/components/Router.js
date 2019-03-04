import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={StorePicker} />
			<Route exact path="/store/:storeID" component={App} />
			<Route exact component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
