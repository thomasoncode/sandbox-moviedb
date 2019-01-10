import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import { Movie } from './Movie';

export class App extends Component {
    public render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Movie />
            </React.Fragment>
        );
    }
}
