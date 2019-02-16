import { ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../ducks';
import { getMovieByMovieId } from '../../ducks/movie';

interface IMovieProps {
    id: number;
    title: string;
}

interface IDispatchProps {
    getMovieByMovieId: (movieId: number) => void;
}

type Props = IDispatchProps & IMovieProps;

export class MovieBase extends React.Component<Props> {
    public handleClick = async () => {
        await this.props.getMovieByMovieId(this.props.id);
    };

    public render() {
        return (
            <ListItem
                key={this.props.id}
                divider
                disableGutters
                button
                onClick={this.handleClick}
            >
                <ListItemText primary={this.props.title} />
            </ListItem>
        );
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, null, Action<string>>,
    ownProps: IMovieProps
): IDispatchProps => ({
    getMovieByMovieId: () => dispatch(getMovieByMovieId(ownProps.id))
});

export const Movie = connect(
    null,
    mapDispatchToProps
)(MovieBase);
