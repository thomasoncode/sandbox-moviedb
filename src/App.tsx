import {
    AppBar,
    createStyles,
    Grid,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Movies } from './components/movies/Movies';
import { rootReducer } from './ducks';
import { Movie } from './Movie';

const composeEnhancers = composeWithDevTools({
    name: 'sandbox-moviedb'
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            padding: spacing.unit * 2
        }
    });

class AppBase extends React.Component<WithStyles<typeof styles>> {
    public render() {
        return (
            <Provider store={store}>
                <CssBaseline />
                <AppBar position='static'>
                    <Toolbar>
                        <Typography color='inherit' variant='h6'>
                            The Marvel Universe
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={this.props.classes.root}>
                    <Grid container spacing={16}>
                        <Grid item xs={3}>
                            <Movies />
                        </Grid>
                        <Grid item xs>
                            <Movie />
                        </Grid>
                    </Grid>
                </div>
            </Provider>
        );
    }
}

export const App = withStyles(styles)(AppBase);
