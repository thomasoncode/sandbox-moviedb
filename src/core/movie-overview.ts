export class MovieOverview {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly posterUrl: string
    ) {}
}

export interface IMovieOverviewLookup {
    [keyof: number]: MovieOverview;
}
