import { ITmdbList } from '../tmdb/tmdb-list';
import { Movie } from './movie';
import { MovieCollection } from './movie-collection';

export class MoviesService {
    public async getMovieOverviewByListId(
        listId: number
    ): Promise<MovieCollection> {
        const response = await fetch(`/api/list/${listId}`);
        const list: ITmdbList = await response.json();

        return list.items
            .map(item => new Movie(item.id, item.title, item.poster_path))
            .reduce((lookup: MovieCollection, movieOverview) => {
                lookup[movieOverview.id] = movieOverview;
                return lookup;
            }, {});
    }
}
