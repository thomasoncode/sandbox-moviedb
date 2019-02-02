import { ITmdbMovie } from '../tmdb/tmdb-movie';
import { Movie } from './movie';

export class MovieService {
    public async getMovieById(id: number): Promise<Movie> {
        const response = await fetch(`/api/movie/${id}`);
        const tmdbMovie: ITmdbMovie = await response.json();

        return new Movie(
            tmdbMovie.title,
            tmdbMovie.overview,
            tmdbMovie.id,
            tmdbMovie.runtime
        );
    }
}
