import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './ducks';
import { Movie } from './Movie';

const composeEnhancers = composeWithDevTools({
    name: 'sandbox-moviedb'
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <CssBaseline />
                <Movie />
            </Provider>
        );
    }
}
