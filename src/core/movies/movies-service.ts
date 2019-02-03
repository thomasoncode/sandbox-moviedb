import { ITmdbList } from '../tmdb/tmdb-list';
import { Movie } from './movie';

interface IMovieCollection {
    [key: string]: Movie;
}

export class MoviesService {
    public async getMoviesByListId(listId: number): Promise<IMovieCollection> {
        const response = await fetch(`/api/list/${listId}`);
        const list: ITmdbList = await response.json();

        return list.items
            .map(item => new Movie(item.id, item.title))
            .reduce((lookup: IMovieCollection, movieOverview) => {
                lookup[movieOverview.id] = movieOverview;
                return lookup;
            }, {});
    }
}
