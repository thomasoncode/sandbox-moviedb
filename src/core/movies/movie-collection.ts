import { Movie } from './movie';

export class MovieCollection {
    [keyof: number]: Movie;
}
