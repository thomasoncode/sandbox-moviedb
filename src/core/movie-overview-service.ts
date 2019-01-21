import { IMovieOverviewLookup, MovieOverview } from './movie-overview';
import { ITmdbList } from './tmdb-list-item';

export class MovieOverviewService {
    public async getMovieOverviewByListId(
        listId: number
    ): Promise<IMovieOverviewLookup> {
        const response = await fetch(`/api/list/${listId}`);
        const list: ITmdbList = await response.json();

        return list.items
            .map(item => new MovieOverview(item.id, item.title))
            .reduce((lookup: IMovieOverviewLookup, movieOverview) => {
                lookup[movieOverview.id] = movieOverview;
                return lookup;
            }, {});
    }
}
