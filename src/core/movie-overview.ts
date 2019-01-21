export class MovieOverview {
    constructor(public readonly id: number, public readonly title: string) {}
}

export interface IMovieOverviewLookup {
    [keyof: number]: MovieOverview;
}
