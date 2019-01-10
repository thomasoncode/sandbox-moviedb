import { Movie } from './movie';
import { TmdbMovie } from './tmdb-movie';

export class MovieMapper {
    public async getMovieById(id: number): Promise<Movie> {
        const response = await fetch(`/api/movie/${id}`);
        const tmdbMovie: TmdbMovie = await response.json();
        return new Movie(
            tmdbMovie.title,
            tmdbMovie.overview,
            tmdbMovie.runtime
        );
    }
}
